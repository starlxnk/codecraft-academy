// 1. Конфигурация Supabase
const SUPABASE_URL = 'https://hiuewishszldiuatuxig.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_lLGFX7CFT3XKPqntjihpgQ_at_OA6kN'; 

// 2. Словарь языков (Default: English)
let currentLang = 'en';

const TRANSLATIONS = {
  en: {
    navCourses: "Courses", navCalc: "Installment", navProgram: "Curriculum", navMentors: "Mentors", navFaq: "FAQ",
    enrollBtn: "Enroll Now 🎓", heroBadge: "⚡ 2026 Batch Enrollment Open",
    heroTitle: "Master an <span>IT Profession</span> & Launch Your Global Career",
    heroDesc: "Hands-on online courses in Fullstack Development, Python, AI Engineering, and UI/UX Design with 1-on-1 mentorship.",
    heroCatalog: "Course Catalog", heroCalcBtn: "Calculate Plan", statGrads: "Graduates", statHired: "Employed", statScore: "Average Rating",
    previewBadge: "First Module — Free", coursesHead: "Flagship Programs", coursesSub: "Choose your track and go from zero to landing a job offer",
    tabAll: "All Tracks", tabDev: "Software Engineering", tabDesign: "Design", tabAi: "AI & Data",
    calcTitle: "Installment Calculator", calcSub: "Calculate your custom payment schedule with zero hidden fees",
    labelCourse: "Training Course:", labelPeriod: "Installment Period:", monthlyPay: "Monthly Payment:", firstPayNote: "First payment due in 30 days",
    applyInstallment: "Apply for Installment", modalHead: "Enrollment & Checkout", modalSub: "Select your course and participation plan",
    payBtnText: "Pay & Start Learning", namePlace: "Full Name", emailPlace: "Email Address", cardPlace: "Card Number (0000 0000 0000 0000)",
    btnAction: "Enroll", durationText: "months"
  },
  ru: {
    navCourses: "Курсы", navCalc: "Рассрочка", navProgram: "Программа", navMentors: "Менторы", navFaq: "FAQ",
    enrollBtn: "Записаться 🎓", heroBadge: "⚡ Набор на поток 2026 открыт",
    heroTitle: "Освой <span>IT-профессию</span> и выйди на международный рынок",
    heroDesc: "Практические онлайн-курсы по Fullstack-разработке, Python, AI Engineering и UI/UX дизайну с менторством.",
    heroCatalog: "Каталог курсов", heroCalcBtn: "Рассчитать стоимость", statGrads: "выпускников", statHired: "трудоустроено", statScore: "средний балл",
    previewBadge: "Первый модуль — Бесплатно", coursesHead: "Флагманские программы", coursesSub: "Выбери направление и пройди путь от нуля до оффера",
    tabAll: "Все направления", tabDev: "Программирование", tabDesign: "Дизайн", tabAi: "ИИ & Data",
    calcTitle: "Калькулятор рассрочки", calcSub: "Рассчитай индивидуальный график оплаты без переплат",
    labelCourse: "Курс обучения:", labelPeriod: "Срок рассрочки:", monthlyPay: "Ежемесячный платёж:", firstPayNote: "Первый платёж только через 30 дней",
    applyInstallment: "Оформить рассрочку", modalHead: "Запись на курс & Оплата", modalSub: "Выберите курс и вариант участия",
    payBtnText: "Оплатить и начать обучение", namePlace: "Ваше Имя и Фамилия", emailPlace: "Email для доступа к платформе", cardPlace: "Номер карты (0000 0000 0000 0000)",
    btnAction: "Записаться", durationText: "месяцев"
  }
};

const COURSES = [
  { id: 1, category: 'dev', title: 'Fullstack Web Developer', desc: 'HTML, CSS, JavaScript, React, Node.js, PostgreSQL.', price: 1200, duration: '12' },
  { id: 2, category: 'dev', title: 'Python Developer & Django', desc: 'Backend engineering, Web Scraping, REST API, Databases.', price: 950, duration: '9' },
  { id: 3, category: 'design', title: 'UI/UX & Product Design', desc: 'Figma, Web Design, Mobile Interfaces, User Research.', price: 800, duration: '6' },
  { id: 4, category: 'ai', title: 'AI & Prompt Engineer', desc: 'LLMs, OpenAI API, AI Agents building and Workflow Automation.', price: 1100, duration: '8' },
  { id: 5, category: 'ai', title: 'Data Science & Machine Learning', desc: 'Python, Pandas, NumPy, Model training, Data Analytics.', price: 1300, duration: '10' },
  { id: 6, category: 'dev', title: 'Telegram Mini Apps & Web3', desc: 'Developing in-app Telegram WebApps with React & Node.', price: 650, duration: '4' }
];

let selectedCourse = COURSES[0];

// Функция рендера карточек
function renderCourses(filter = 'all') {
  const coursesGrid = document.getElementById('coursesGrid');
  if (!coursesGrid) return;
  const filtered = filter === 'all' ? COURSES : COURSES.filter(c => c.category === filter);
  const t = TRANSLATIONS[currentLang];

  coursesGrid.innerHTML = filtered.map(c => `
    <div class="course-card">
      <span class="course-badge">${c.duration} ${t.durationText}</span>
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <div class="course-footer">
        <span class="course-price">${c.price} $</span>
        <button class="btn-accent" onclick="selectAndEnroll(${c.id})">${t.btnAction}</button>
      </div>
    </div>
  `).join('');
}

function applyLanguage(lang) {
  currentLang = lang;
  const t = TRANSLATIONS[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.innerHTML = t[key];
  });

  const nameInput = document.getElementById('studentName');
  const emailInput = document.getElementById('studentEmail');
  const cardInput = document.getElementById('cardNumber');

  if (nameInput) nameInput.placeholder = t.namePlace;
  if (emailInput) emailInput.placeholder = t.emailPlace;
  if (cardInput) cardInput.placeholder = t.cardPlace;

  renderCourses();
}

renderCourses();

document.addEventListener('DOMContentLoaded', () => {
  applyLanguage('en');

  // Переключение языка
  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const nextLang = currentLang === 'en' ? 'ru' : 'en';
      applyLanguage(nextLang);
    });
  }

  // --- МАСКИ ВВОДА ДЛЯ КАРТЫ ---
  const cardNum = document.getElementById('cardNumber');
  if (cardNum) {
    cardNum.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      e.target.value = val.replace(/(.{4})/g, '$1 ').trim();
    });
  }

  const cardExp = document.getElementById('cardExp');
  if (cardExp) {
    cardExp.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 2) {
        val = val.substring(0, 2) + '/' + val.substring(2, 4);
      }
      e.target.value = val;
    });
  }

  const cardCvc = document.getElementById('cardCvc');
  if (cardCvc) {
    cardCvc.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
    });
  }

  // Табы фильтров
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderCourses(e.target.dataset.filter);
    });
  });

  // Калькулятор
  const calcSelect = document.getElementById('calcCourseSelect');
  const rangeInput = document.getElementById('monthsRange');
  if (calcSelect && rangeInput) {
    calcSelect.addEventListener('change', updateCalculator);
    rangeInput.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  const calcEnrollBtn = document.getElementById('calcEnrollBtn');
  if (calcEnrollBtn) {
    calcEnrollBtn.addEventListener('click', () => {
      const total = Number(calcSelect.value);
      const course = COURSES.find(c => c.price === total) || COURSES[0];
      selectAndEnroll(course.id);
    });
  }

  // Отправка формы в Supabase
  const enrollForm = document.getElementById('enrollForm');
  if (enrollForm) {
    enrollForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payBtn = document.getElementById('paySubmitBtn');
      const studentName = document.getElementById('studentName').value;
      const studentEmail = document.getElementById('studentEmail').value;

      if (payBtn) payBtn.disabled = true;

      try {
        if (window.supabase) {
          const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
          const { error } = await client.from('enrollments').insert([{
            student_name: studentName,
            student_email: studentEmail,
            course_title: selectedCourse.title,
            price: selectedCourse.price,
            payment_status: 'PAID'
          }]);
          if (error) throw error;
          showToast(currentLang === 'en' ? "Success! Recorded in Supabase." : "Успешно! Данные занесены в Supabase.");
        }
        closeAllModals();
        enrollForm.reset();
      } catch (err) {
        showToast("Error: " + err.message);
      } finally {
        if (payBtn) payBtn.disabled = false;
      }
    });
  }
});

// Глобальные функции
window.selectAndEnroll = function(id) {
  const enrollModal = document.getElementById('enrollModal');
  const course = COURSES.find(c => c.id === id);
  if (course && enrollModal) {
    selectedCourse = course;
    document.getElementById('modalCourseTitle').textContent = course.title;
    document.getElementById('modalCoursePrice').textContent = `${course.price} $`;
    enrollModal.classList.add('open');
  }
};

const openCartBtn = document.getElementById('openCartBtn');
if (openCartBtn) {
  openCartBtn.addEventListener('click', () => selectAndEnroll(1));
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('open'));
}

function updateCalculator() {
  const calcSelect = document.getElementById('calcCourseSelect');
  const rangeInput = document.getElementById('monthsRange');
  const monthsVal = document.getElementById('monthsVal');
  const monthlyPrice = document.getElementById('monthlyPrice');

  if (!calcSelect || !rangeInput || !monthsVal || !monthlyPrice) return;
  const total = Number(calcSelect.value);
  const months = Number(rangeInput.value);
  monthsVal.textContent = `${months} ${TRANSLATIONS[currentLang].durationText}`;
  const perMonth = Math.round(total / months);
  monthlyPrice.textContent = `${perMonth} $ / mo`;
}

function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}