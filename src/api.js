const API_BASE = 'http://localhost:5000/api';

const DEFAULT_DEMO_SCHEMES = [
  {
    id: 'SCHEME-PMKISAN-01',
    titleEn: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    titleHi: 'प्रधानमंत्री किसान सम्मान निधि योजना',
    ministryEn: 'Ministry of Agriculture and Farmers Welfare',
    ministryHi: 'कृषि एवं किसान कल्याण मंत्रालय',
    category: 'farming',
    benefitEn: '₹6,000 per year directly into bank accounts in 3 equal four-monthly installments.',
    benefitHi: 'प्रति वर्ष ₹6,000 तीन समान किस्तों में सीधे बैंक खाते में।',
    benefitAmount: '₹6,000 / Year',
    descriptionEn: 'An initiative by the Government of India in which all farmers will get up to ₹6,000 per year as minimum income support to procure agricultural inputs and equipment.',
    descriptionHi: 'भारत सरकार द्वारा सभी पात्र किसान परिवारों को कृषि आवश्यकताओं की पूर्ति हेतु आय सहायता।',
    criteriaEn: 'Small and marginal farmer families with cultivable landholding up to 2 hectares.',
    criteriaHi: '2 हेक्टेयर तक की कृषि योग्य भूमि वाले सभी भूमिधारक किसान परिवार।',
    requiredDocsEn: ['Aadhaar Card', 'Land Ownership Record (Khatauni)', 'Bank Passbook Details', 'Mobile Number linked to Aadhaar']
  },
  {
    id: 'SCHEME-PMJAY-02',
    titleEn: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    titleHi: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना',
    ministryEn: 'Ministry of Health and Family Welfare',
    ministryHi: 'स्वास्थ्य एवं परिवार कल्याण मंत्रालय',
    category: 'healthcare',
    benefitEn: 'Cashless health insurance coverage up to ₹5 Lakh per family per year for secondary and tertiary hospital care.',
    benefitHi: 'प्रति परिवार प्रति वर्ष ₹5 लाख तक का कैशलेस स्वास्थ्य बीमा उपचार।',
    benefitAmount: '₹5,00,000 / Year',
    descriptionEn: 'The world\'s largest government-funded healthcare scheme targeting poor and vulnerable families based on SECC 2011 criteria.',
    descriptionHi: 'गरीब और कमजोर परिवारों के लिए माध्यमिक और तृतीयक देखभाल हेतु कैशलेस स्वास्थ्य कवर।',
    criteriaEn: 'Families identified based on deprivation and occupational criteria of the Socio-Economic Caste Census (SECC).',
    criteriaHi: 'SECC 2011 सूची में शामिल ग्रामीण व शहरी गरीब परिवार।',
    requiredDocsEn: ['Aadhaar Card', 'Ration Card', 'Ayushman Golden Card', 'Income Certificate']
  },
  {
    id: 'SCHEME-PMAY-03',
    titleEn: 'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
    titleHi: 'प्रधानमंत्री आवास योजना - ग्रामीण',
    ministryEn: 'Ministry of Rural Development',
    ministryHi: 'ग्रामीण विकास मंत्रालय',
    category: 'housing',
    benefitEn: 'Financial assistance of ₹1.20 Lakh in plains and ₹1.30 Lakh in hilly/difficult states for pucca house construction.',
    benefitHi: 'मैदानी क्षेत्रों में ₹1.20 लाख और पहाड़ी क्षेत्रों में ₹1.30 लाख की पक्के मकान निर्माण सहायता।',
    benefitAmount: '₹1,20,000',
    descriptionEn: 'Aims to provide a pucca house with basic amenities to all houseless households and those living in kutcha and dilapidated houses.',
    descriptionHi: 'सभी बेघर परिवारों और कच्चे मकानों में रहने वालों को बुनियादी सुविधाओं युक्त पक्का आवास।',
    criteriaEn: 'Homeless or living in zero, one or two room kutcha houses according to SECC 2011 data.',
    criteriaHi: 'बेघर परिवार या कच्चे व जीर्ण-शीर्ण मकानों में रहने वाले परिवार।',
    requiredDocsEn: ['Aadhaar Card', 'Bank Account Passbook', 'MGNREGA Job Card Number', 'Land Registry Proof']
  },
  {
    id: 'SCHEME-MUDRA-04',
    titleEn: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    titleHi: 'प्रधानमंत्री मुद्रा योजना',
    ministryEn: 'Ministry of Finance',
    ministryHi: 'वित्त मंत्रालय',
    category: 'finance',
    benefitEn: 'Collateral-free micro loans up to ₹10 Lakh for small enterprise establishment under Shishu, Kishor, and Tarun categories.',
    benefitHi: 'शिशु, किशोर और तरुण श्रेणियों के तहत ₹10 लाख तक का बिना गारंटी ऋण।',
    benefitAmount: 'Up to ₹10,00,000',
    descriptionEn: 'Facilitates micro-credit loans to non-corporate, non-farm small/micro enterprises to stimulate local employment.',
    descriptionHi: 'गैर-कॉर्पोरेट, गैर-कृषि लघु एवं सूक्ष्म उद्यमों के लिए ऋण सुविधा।',
    criteriaEn: 'Any Indian citizen who has a business plan for non-farm income-generating activity.',
    criteriaHi: 'गैर-कृषि क्षेत्र में आय-सृजन गतिविधि संचालित करने वाला कोई भी भारतीय नागरिक।',
    requiredDocsEn: ['Identity Proof (Voter ID/PAN/Aadhaar)', 'Proof of Business Address', 'Quotation of Machinery/Items', 'Bank Statement']
  },
  {
    id: 'SCHEME-PMKVY-05',
    titleEn: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)',
    titleHi: 'प्रधानमंत्री कौशल विकास योजना',
    ministryEn: 'Ministry of Skill Development and Entrepreneurship',
    ministryHi: 'कौशल विकास और उद्यमशीलता मंत्रालय',
    category: 'employment',
    benefitEn: 'Free industry-aligned skill development certification training, assessment fee waiver, and placement guidance with stipend.',
    benefitHi: 'निःशुल्क उद्योग-अनुकूल कौशल प्रशिक्षण, प्रमाणन तथा प्लेसमेंट सहायता।',
    benefitAmount: 'Free Training & Stipend',
    descriptionEn: 'Flagship skill certification scheme to enable Indian youth to take up industry-relevant skill training for a better livelihood.',
    descriptionHi: 'भारतीय युवाओं को उद्योग-प्रासंगिक कौशल प्रशिक्षण प्रदान करने की योजना।',
    criteriaEn: 'Indian youth aged 15-45 with Aadhaar and valid school/college leaving certification.',
    criteriaHi: '15 से 45 वर्ष आयु वर्ग के बेरोजगार युवा अथवा स्कूल/कॉलेज ड्रॉपआउट।',
    requiredDocsEn: ['Aadhaar Card', 'Educational Certificate', 'Bank Passbook Copy', 'Passport Size Photograph']
  },
  {
    id: 'SCHEME-BETI-06',
    titleEn: 'Beti Bachao Beti Padhao & Sukanya Samriddhi Yojana',
    titleHi: 'बेटी बचाओ बेटी पढ़ाओ एवं सुकन्या समृद्धि योजना',
    ministryEn: 'Ministry of Women and Child Development',
    ministryHi: 'महिला एवं बाल विकास मंत्रालय',
    category: 'women',
    benefitEn: 'High interest savings deposit (8.2% p.a.) with tax exemption under Sec 80C for girl child higher education & marriage.',
    benefitHi: 'बालिका की उच्च शिक्षा एवं विवाह हेतु 8.2% वार्षिक ब्याज दर तथा धारा 80सी के तहत पूर्ण कर छूट।',
    benefitAmount: '8.2% Interest + Tax Free',
    descriptionEn: 'Special government-backed savings initiative aimed at the welfare of female children in India.',
    descriptionHi: 'बालिकाओं के उज्ज्वल भविष्य व सशक्तिकरण हेतु विशेष सरकारी बचत योजना।',
    criteriaEn: 'Parents/guardians of girl children below 10 years of age.',
    criteriaHi: '10 वर्ष से कम आयु की बालिकाओं के माता-पिता या कानूनी अभिभावक।',
    requiredDocsEn: ['Girl Child Birth Certificate', 'Parents Identity Proof', 'Address Proof', 'Recent Passport Photos']
  }
];

const getStoredSchemes = () => {
  try {
    const raw = localStorage.getItem('curatera_demo_schemes');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading demo schemes:', e);
  }
  localStorage.setItem('curatera_demo_schemes', JSON.stringify(DEFAULT_DEMO_SCHEMES));
  return DEFAULT_DEMO_SCHEMES;
};

const saveStoredSchemes = (schemes) => {
  try {
    localStorage.setItem('curatera_demo_schemes', JSON.stringify(schemes));
  } catch (e) {
    console.error('Error saving demo schemes:', e);
  }
};

export const getStoredAuth = () => {
  try {
    const token = localStorage.getItem('curatera_admin_token');
    const user = localStorage.getItem('curatera_admin_user');
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
  } catch (e) {
    console.error('Error reading auth state:', e);
  }
  return null;
};

export const setStoredAuth = (token, user) => {
  localStorage.setItem('curatera_admin_token', token);
  localStorage.setItem('curatera_admin_user', JSON.stringify(user));
};

export const clearStoredAuth = () => {
  localStorage.removeItem('curatera_admin_token');
  localStorage.removeItem('curatera_admin_user');
};

const authHeaders = () => {
  const auth = getStoredAuth();
  return auth ? { Authorization: `Bearer ${auth.token}` } : {};
};

// Helper for fetch with timeout
const fetchWithTimeout = async (url, options = {}, timeoutMs = 2500) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
};

export const api = {
  async login(email, password) {
    // Check if demo credentials or if backend is offline
    const isDemoCreds = (email === 'admin@gmail.com' && (!password || password === 'yogesh')) || email === 'demo';

    try {
      const res = await fetchWithTimeout(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }, 2500);

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }
      if (data.role !== 'admin') {
        throw new Error('Access denied: You do not have Government Administrator privileges.');
      }
      setStoredAuth(data.token, { email: data.email, role: data.role });
      return data;
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  },

  async getStats() {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/admin/stats`, {
        headers: { ...authHeaders() },
      }, 2000);
      if (!res.ok) throw new Error('Failed to fetch admin stats');
      return await res.json();
    } catch (e) {
      console.error('Failed to get stats:', e);
      throw e;
    }
  },

  async getSchemes() {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/admin/schemes`, {
        headers: { ...authHeaders() },
      }, 2000);
      if (!res.ok) throw new Error('Failed to fetch schemes');
      return await res.json();
    } catch (e) {
      console.error('Failed to get schemes:', e);
      throw e;
    }
  },

  async extractPdf(file, mode = 'new', schemeId = null) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('mode', mode);
      if (schemeId) formData.append('scheme_id', schemeId);

      const res = await fetchWithTimeout(`${API_BASE}/admin/schemes/extract-pdf`, {
        method: 'POST',
        headers: { ...authHeaders() },
        body: formData,
      }, 90000); // 90s — AI extraction needs time
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to extract PDF');
      return data;
    } catch (err) {
      console.error('Extraction failed:', err);
      throw err;
    }
  },

  async saveScheme(mode, schemeData) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/admin/schemes/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders(),
        },
        body: JSON.stringify({
          mode,
          scheme: schemeData,
        }),
      }, 3000);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save scheme');
      return data;
    } catch (err) {
      console.error('Save scheme failed:', err);
      throw err;
    }
  },

  async deleteScheme(schemeId) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/admin/schemes/${schemeId}`, {
        method: 'DELETE',
        headers: { ...authHeaders() },
      }, 2500);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete scheme');
      return data;
    } catch (err) {
      console.error('Delete scheme failed:', err);
      throw err;
    }
  },
};

