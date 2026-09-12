/**
 * NutriKids API Service Client
 * Terhubung ke backend Express di port 5001 (nutrikids-BE)
 * Dilengkapi dengan auto-bearer token dan graceful error handling
 */

const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ||
  'http://localhost:5001/api';

// Helper Token Management
export const getToken = () => {
  try {
    return localStorage.getItem('nutrikids_jwt_token') || null;
  } catch (e) {
    return null;
  }
};

export const setToken = (token) => {
  try {
    if (token) {
      localStorage.setItem('nutrikids_jwt_token', token);
    } else {
      localStorage.removeItem('nutrikids_jwt_token');
    }
  } catch (e) {
    console.error('Error saving token:', e);
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem('nutrikids_jwt_token');
  } catch (e) {
    console.error('Error removing token:', e);
  }
};

// Generic Fetch Wrapper
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (err) {
    // Tangani kemungkinan server offline / network error
    console.warn(`[NutriKids API] Error at ${endpoint}:`, err.message);
    throw err;
  }
}

// 1. Health Check
export const checkApiHealth = async () => {
  try {
    const res = await request('/health');
    return { online: true, ...res };
  } catch (e) {
    return { online: false, message: 'Server backend offline atau belum berjalan' };
  }
};

// 2. Auth & Users API (/api/users)
export const authApi = {
  // POST /api/users/register
  register: async ({ name, email, password, phone, address }) => {
    const data = await request('/users/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, phone, address }),
    });
    if (data.token) {
      setToken(data.token);
    }
    return data;
  },

  // POST /api/users/login
  login: async ({ email, password }) => {
    const data = await request('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      setToken(data.token);
    }
    return data;
  },

  // GET /api/users/me
  getMe: async () => {
    return await request('/users/me');
  },

  // PUT /api/users/me
  updateUser: async (userData) => {
    return await request('/users/me', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
};

// 3. Children & Growth Records API (/api/children)
export const childApi = {
  // POST /api/children (Add child with initial growth record)
  addChild: async ({ name, nickname, gender, birthDate, weight, height }) => {
    // Normalisasi gender ke format model backend ('Laki-laki' / 'Perempuan')
    const normalizedGender =
      gender === 'boy' || gender === 'Laki-laki' || gender === 'Laki Laki'
        ? 'Laki-laki'
        : 'Perempuan';

    return await request('/children', {
      method: 'POST',
      body: JSON.stringify({
        name,
        nickname: nickname || name.split(' ')[0],
        gender: normalizedGender,
        birthDate: birthDate || new Date(),
        weight: parseFloat(weight),
        height: parseFloat(height),
      }),
    });
  },

  // GET /api/children (Get all children for current user)
  getChildren: async () => {
    return await request('/children');
  },

  // GET /api/children/:id
  getChild: async (id) => {
    return await request(`/children/${id}`);
  },

  // POST /api/children/:id/growth (Add new growth record to an existing child)
  addGrowthData: async (id, { weight, height, notes }) => {
    return await request(`/children/${id}/growth`, {
      method: 'POST',
      body: JSON.stringify({
        weight: parseFloat(weight),
        height: parseFloat(height),
        notes: notes || '',
      }),
    });
  },

  // POST /api/children/check-nutrition (Backend nutrition calculator)
  checkNutrition: async ({ weight, height, age, gender }) => {
    return await request('/children/check-nutrition', {
      method: 'POST',
      body: JSON.stringify({
        weight: parseFloat(weight),
        height: parseFloat(height),
        age: parseFloat(age),
        gender,
      }),
    });
  },

  // GET /api/children/:id/chart
  getGrowthChart: async (id) => {
    return await request(`/children/${id}/chart`);
  },
};

// 4. Nutrition Recommendations API (/api/nutrition)
export const nutritionApi = {
  // GET /api/nutrition
  getAll: async () => {
    return await request('/nutrition');
  },

  // GET /api/nutrition/recommendations?age=&budget=
  getRecommendations: async ({ age, budget, goal } = {}) => {
    const params = new URLSearchParams();
    if (age) params.append('age', age);
    if (budget) params.append('budget', budget);
    if (goal) params.append('goal', goal);
    const qs = params.toString() ? `?${params.toString()}` : '';
    return await request(`/nutrition/recommendations${qs}`);
  },

  // GET /api/nutrition/category/:category
  getByCategory: async (category) => {
    return await request(`/nutrition/category/${category}`);
  },
};

// 5. Donations API (/api/donations)
export const donationApi = {
  // GET /api/donations
  getPrograms: async () => {
    return await request('/donations');
  },

  // GET /api/donations/:id
  getProgram: async (id) => {
    return await request(`/donations/${id}`);
  },

  // POST /api/donations/:id/donate
  donate: async (programId, { amount, message, isAnonymous }) => {
    return await request(`/donations/${programId}/donate`, {
      method: 'POST',
      body: JSON.stringify({
        amount: parseFloat(amount),
        message: message || '',
        isAnonymous: Boolean(isAnonymous),
      }),
    });
  },

  // GET /api/donations/my-donations
  getMyDonations: async () => {
    return await request('/donations/my-donations');
  },
};

// 6. Education API (/api/education)
export const educationApi = {
  // GET /api/education
  getAllArticles: async ({ category, age } = {}) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (age) params.append('age', age);
    const qs = params.toString() ? `?${params.toString()}` : '';
    return await request(`/education${qs}`);
  },

  // GET /api/education/:id
  getArticle: async (id) => {
    return await request(`/education/${id}`);
  },

  // GET /api/education/prevention-timeline
  getTimeline: async () => {
    return await request('/education/prevention-timeline');
  },
};
