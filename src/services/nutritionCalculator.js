/**
 * Utilitas & Algoritma Kalkulator Gizi Anak Berdasarkan Standar WHO & Kemenkes RI
 * Folder: src/services/nutritionCalculator.js
 */

// Data median dan SD referensi WHO (Weight-for-age & Height-for-age 0-60 bulan)
// Format [median, SD]
const WHO_BOYS = {
  // bulan: [BB_median, BB_sd, TB_median, TB_sd]
  0: [3.3, 0.4, 49.9, 1.9],
  3: [6.4, 0.7, 61.4, 2.1],
  6: [7.9, 0.8, 67.6, 2.2],
  9: [8.9, 0.9, 72.0, 2.3],
  12: [9.6, 1.0, 75.7, 2.4],
  18: [10.9, 1.1, 82.3, 2.7],
  24: [12.2, 1.3, 87.8, 3.1],
  36: [14.3, 1.6, 96.1, 3.6],
  48: [16.3, 1.9, 103.3, 4.1],
  60: [18.3, 2.3, 110.0, 4.6],
  72: [20.5, 2.7, 115.5, 5.0],
  84: [22.9, 3.2, 121.7, 5.4],
  96: [25.6, 3.8, 127.3, 5.9],
  108: [28.6, 4.5, 132.6, 6.4],
  120: [32.0, 5.3, 137.8, 7.0],
};

const WHO_GIRLS = {
  0: [3.2, 0.4, 49.1, 1.9],
  3: [5.8, 0.6, 59.8, 2.0],
  6: [7.3, 0.8, 65.7, 2.2],
  9: [8.2, 0.9, 70.1, 2.3],
  12: [8.9, 1.0, 74.0, 2.4],
  18: [10.2, 1.1, 80.7, 2.8],
  24: [11.5, 1.3, 86.4, 3.2],
  36: [13.9, 1.6, 95.1, 3.7],
  48: [16.1, 2.0, 102.7, 4.2],
  60: [18.2, 2.4, 109.4, 4.7],
  72: [20.2, 2.8, 115.1, 5.1],
  84: [22.4, 3.4, 120.8, 5.6],
  96: [25.0, 4.1, 126.6, 6.1],
  108: [28.2, 4.9, 132.5, 6.7],
  120: [31.9, 5.8, 138.6, 7.4],
};

// Interpolasi data WHO berdasarkan bulan terdekat
function getReferenceData(gender, ageMonths) {
  const table = gender === 'boy' ? WHO_BOYS : WHO_GIRLS;
  const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
  
  if (table[ageMonths]) {
    return table[ageMonths];
  }
  
  // Cari interval untuk interpolasi linear
  let lower = keys[0];
  let upper = keys[keys.length - 1];
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (ageMonths >= keys[i] && ageMonths <= keys[i + 1]) {
      lower = keys[i];
      upper = keys[i + 1];
      break;
    }
  }
  
  if (ageMonths <= lower) return table[lower];
  if (ageMonths >= upper) return table[upper];
  
  const fraction = (ageMonths - lower) / (upper - lower);
  const lowVal = table[lower];
  const upVal = table[upper];
  
  return [
    lowVal[0] + fraction * (upVal[0] - lowVal[0]), // BB median
    lowVal[1] + fraction * (upVal[1] - lowVal[1]), // BB SD
    lowVal[2] + fraction * (upVal[2] - lowVal[2]), // TB median
    lowVal[3] + fraction * (upVal[3] - lowVal[3]), // TB SD
  ];
}

/**
 * Hitung kalkulasi gizi lengkap anak
 */
export function calculateChildNutrition({ gender, ageMonths, weightKg, heightCm }) {
  const age = parseFloat(ageMonths);
  const weight = parseFloat(weightKg);
  const height = parseFloat(heightCm);

  if (isNaN(age) || isNaN(weight) || isNaN(height) || age <= 0 || weight <= 0 || height <= 0) {
    throw new Error('Masukkan angka usia, berat badan, dan tinggi badan yang valid.');
  }

  const [bbMedian, bbSd, tbMedian, tbSd] = getReferenceData(gender, age);

  // 1. Z-Score Berat Badan menurut Usia (BB/U)
  const zWeightForAge = (weight - bbMedian) / bbSd;

  // 2. Z-Score Tinggi Badan menurut Usia (TB/U) - Deteksi Stunting
  const zHeightForAge = (height - tbMedian) / tbSd;

  // 3. BMI & BMI-for-age
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  // Perkiraan BB ideal berdasarkan tinggi badan (Kemenkes: BB ideal = 0.9 * (TB - 100) atau tabel WHO)
  // Untuk balita, rasio berat ideal berdasar median tinggi
  const idealWeight = parseFloat((bbMedian * (height / tbMedian)).toFixed(1));
  const idealHeight = parseFloat(tbMedian.toFixed(1));

  // Kategori BB/U
  let weightStatus = { text: 'Berat Badan Normal', level: 'normal', color: '#10B981', desc: 'Berat badan anak sesuai dengan kurva pertumbuhan usianya.' };
  if (zWeightForAge < -3) {
    weightStatus = { text: 'Berat Badan Sangat Kurang (Severely Underweight)', level: 'danger', color: '#EF4444', desc: 'Segera periksakan ke dokter/faskes untuk intervensi gizi intensif.' };
  } else if (zWeightForAge < -2) {
    weightStatus = { text: 'Berat Badan Kurang (Underweight)', level: 'warning', color: '#F59E0B', desc: 'Perlu tambahan asupan kalori dan protein hewani berkualitas.' };
  } else if (zWeightForAge > 1) {
    weightStatus = { text: 'Risiko Berat Badan Lebih', level: 'warning', color: '#F59E0B', desc: 'Batasi camilan manis, perbanyak aktivitas fisik aktif.' };
  }

  // Kategori TB/U (Stunting)
  let heightStatus = { text: 'Tinggi Badan Normal', level: 'normal', color: '#10B981', desc: 'Panjang/tinggi badan anak optimal sesuai usianya.' };
  if (zHeightForAge < -3) {
    heightStatus = { text: 'Sangat Pendek (Severely Stunted)', level: 'danger', color: '#EF4444', desc: 'Anak mengalami stunting berat. Butuh stimulasi dan terapi gizi oleh dokter anak.' };
  } else if (zHeightForAge < -2) {
    heightStatus = { text: 'Pendek (Stunted)', level: 'warning', color: '#F59E0B', desc: 'Terindikasi stunting. Optimalkan 1000 HPK dengan konsumsi protein hewani setiap makan.' };
  } else if (zHeightForAge > 3) {
    heightStatus = { text: 'Tinggi', level: 'normal', color: '#3B82F6', desc: 'Pertumbuhan tinggi badan berada di atas rata-rata usianya.' };
  }

  // Kategori Gizi BB/TB (Wasting)
  const weightToHeightRatio = weight / (bbMedian * (height / tbMedian));
  let wastingStatus = { text: 'Gizi Baik (Normal)', level: 'normal', color: '#10B981', desc: 'Proporsi berat terhadap tinggi badan sangat proporsional.' };
  if (weightToHeightRatio < 0.7) {
    wastingStatus = { text: 'Gizi Buruk (Severe Wasting)', level: 'danger', color: '#EF4444', desc: 'Gizi buruk akut. Membutuhkan F-75/F-100 atau rujukan medis segera.' };
  } else if (weightToHeightRatio < 0.85) {
    wastingStatus = { text: 'Gizi Kurang (Wasting)', level: 'warning', color: '#F59E0B', desc: 'Anak tampak kurus, memerlukan makanan padat energi & protein.' };
  } else if (weightToHeightRatio > 1.25) {
    wastingStatus = { text: 'Gizi Lebih / Obesitas', level: 'warning', color: '#8B5CF6', desc: 'Kelebihan berat badan, atur porsi makan dan minimalkan gula buatan.' };
  }

  // Kebutuhan Kalori & Protein Harian (Kemenkes AKG)
  let dailyCalories = 1000;
  let dailyProtein = 20;
  let waterMl = 1100;

  if (age <= 11) {
    dailyCalories = Math.round(weight * 110);
    dailyProtein = Math.round(weight * 1.5);
    waterMl = 800;
  } else if (age <= 36) {
    dailyCalories = Math.round(weight * 100);
    dailyProtein = Math.round(weight * 1.3);
    waterMl = 1200;
  } else if (age <= 72) {
    dailyCalories = Math.round(weight * 90);
    dailyProtein = Math.round(weight * 1.2);
    waterMl = 1500;
  } else {
    dailyCalories = Math.round(weight * 80);
    dailyProtein = Math.round(weight * 1.1);
    waterMl = 1800;
  }

  // Rekomendasi menu spesifik
  let specificAdvice = [];
  if (heightStatus.level === 'warning' || heightStatus.level === 'danger') {
    specificAdvice.push('Prioritaskan Protein Hewani: Berikan minimal 1 butir telur, ikan kembung/lele, atau hati ayam setiap hari untuk merangsang hormon pertumbuhan.');
    specificAdvice.push('Cukupi Kalsium & Seng (Zinc): Berikan susu pertumbuhan, tempe/tahu, dan sayur hijau untuk pemadatan tulang.');
  }
  if (weightStatus.level === 'warning' || weightStatus.level === 'danger') {
    specificAdvice.push('Tingkatkan Kerapatan Energi: Tambahkan lemak sehat seperti santan murni, mentega, atau minyak kelapa sawit ke dalam lauk anak.');
    specificAdvice.push('Jadwal Makan Teratur: Berikan 3x makan utama bergizi dan 2x selingan sehat padat kalori (seperti pisang, puding alpukat, keju).');
  }
  if (specificAdvice.length === 0) {
    specificAdvice.push('Pertahankan Pola "Isi Piringku": 1/3 makanan pokok, 1/3 sayuran, 1/6 lauk pauk protein hewani, dan 1/6 buah segar.');
    specificAdvice.push('Pantau Tumbuh Kembang: Timbang berat dan ukur tinggi badan setiap bulan di Posyandu terdekat.');
  }

  return {
    gender,
    ageMonths: age,
    weightKg: weight,
    heightCm: height,
    bmi: parseFloat(bmi.toFixed(1)),
    zWeightForAge: parseFloat(zWeightForAge.toFixed(2)),
    zHeightForAge: parseFloat(zHeightForAge.toFixed(2)),
    idealWeight,
    idealHeight,
    weightStatus,
    heightStatus,
    wastingStatus,
    dailyCalories,
    dailyProtein,
    waterMl,
    specificAdvice,
    timestamp: new Date().toISOString(),
  };
}

// LocalStorage helpers untuk Riwayat Monitoring
const STORAGE_KEY = 'nutrikids_growth_records_v1';

export function getSavedGrowthRecords() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Gagal mengambil data monitoring:', e);
    return [];
  }
}

export function saveGrowthRecord(record) {
  try {
    const current = getSavedGrowthRecords();
    const newRecord = {
      id: Date.now().toString(),
      ...record,
      dateLabel: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };
    const updated = [newRecord, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Gagal menyimpan data monitoring:', e);
    return [];
  }
}

export function deleteGrowthRecord(id) {
  try {
    const current = getSavedGrowthRecords();
    const filtered = current.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (e) {
    console.error('Gagal menghapus data monitoring:', e);
    return [];
  }
}
