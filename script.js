const SUPABASE_URL = 'https://hiuewishszldiuatuxig.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_lLGFX7CFT3XKPqntjihpgQ_at_OA6kN'; 

let currentLang = 'en';

const TRANSLATIONS = {
  en: {
    navCourses: "Courses", navCalc: "Installment", navProgram: "Curriculum", navMentors: "Mentors", navReviews: "Reviews", navFaq: "FAQ",
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
    btnAction: "Enroll", durationText: "months",
    progHead: "Comprehensive Curriculum", progSub: "Step-by-step roadmap to professional competency",
    mentorsHead: "Industry Experts & Mentors", mentorsSub: "Learn directly from senior engineers and product leaders",
    reviewsHead: "Student Testimonials", reviewsSub: "Real feedback from graduates working worldwide",
    faqHead: "Frequently Asked Questions", faqSub: "Everything you need to know before joining",
    faigBio: "15+ years of software architecture experience. Ex-Senior Tech Lead specializing in enterprise cloud systems and distributed databases.",
    alexBio: "10+ years developing scalable React and Node.js microservices. Mentored over 500+ successful junior web developers.",
    elenaBio: "Design system advocate and UX research specialist with 8 years of experience leading product design for European banking apps.",
    rev1Text: '"The Fullstack program completely changed my career path. Within 2 months of graduation, I received two junior developer offers in Baku."',
    rev2Text: '"Mentors are real practitioners. Faiq Agayev\'s architecture code reviews gave me deep insights that no YouTube video could ever explain."',
    rev3Text: '"Great balance between theory and real project builds. The AI engineering module helped me automate workflow tools for my agency."'
  },
  ru: {
    navCourses: "Курсы", navCalc: "Рассрочка", navProgram: "Программа", navMentors: "Менторы", navReviews: "Отзывы", navFaq: "FAQ",
    enrollBtn: "Записаться 🎓", heroBadge: "⚡ Набор на поток 2026 открыт",
    heroTitle: "Освой <span>IT-профессию</span> и выйди на международный рынок",
    heroDesc: "Практические онлайн-курсы по Fullstack-разработке, Python, AI Engineering и UI/UX дизайну с индивидуальным менторством.",
    heroCatalog: "Каталог курсов", heroCalcBtn: "Рассчитать стоимость", statGrads: "выпускников", statHired: "трудоустроено", statScore: "средний балл",
    previewBadge: "Первый модуль — Бесплатно", coursesHead: "Флагманские программы", coursesSub: "Выбери направление и пройди путь от нуля до оффера",
    tabAll: "Все направления", tabDev: "Программирование", tabDesign: "Дизайн", tabAi: "ИИ & Data",
    calcTitle: "Калькулятор рассрочки", calcSub: "Рассчитай индивидуальный график оплаты без переплат",
    labelCourse: "Курс обучения:", labelPeriod: "Срок рассрочки:", monthlyPay: "Ежемесячный платёж:", firstPayNote: "Первый платёж только через 30 дней",
    applyInstallment: "Оформить рассрочку", modalHead: "Запись на курс & Оплата", modalSub: "Выберите курс и вариант участия",
    payBtnText: "Оплатить и начать обучение", namePlace: "Ваше Имя и Фамилия", emailPlace: "Email для доступа к платформе", cardPlace: "Номер карты (0000 0000 0000 0000)",
    btnAction: "Записаться", durationText: "месяцев",
    progHead: "Карта вашего обучения", progSub: "Пошаговый план погружения в индустрию",
    mentorsHead: "Преподаватели-практики", mentorsSub: "Опыт экспертов из ведущих IT-компаний",
    reviewsHead: "Отзывы студентов", reviewsSub: "Реальные истории успеха наших выпускников",
    faqHead: "Часто задаваемые вопросы", faqSub: "Всё, что нужно знать перед началом обучения",
    faigBio: "15+ лет опыта в IT-архитектуре. Экс-Senior Tech Lead, специализируется на высоконагруженных облачных системах и базах данных.",
    alexBio: "10+ лет опыта разработки веб-сервисов на React и Node.js. Обучил и вывел в мидлы более 500 студентов.",
    elenaBio: "Специалист по UX-исследованиям и проектированию сложных интерфейсов. 8 лет руководства UI/UX в финтех-проектах.",
    rev1Text: '"Программа по Fullstack полностью перевернула мою карьеру. Через 2 месяца после окончания получил сразу два оффера в Баку."',
    rev2Text: '"Разборы кода от Фаига Агаева давали такие инсайты, которые не найдешь ни на одном YouTube-канале. Настоящая практика!"',
    rev3Text: '"Отличный баланс теории и создания реальных проектов. Модуль AI помог мне автоматизировать процессы в собственном бизнесе."'
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

const CURRICULUM_DATA = {
  en: [
    { title: "Module 1: Web Fundamentals (HTML5, CSS3, Modern JS)", desc: "Build responsive, glassmorphic layouts using Figma designs. Master Flexbox, Grid, BEM methodology, ES6+ JavaScript, DOM manipulation, and Git workflow." },
    { title: "Module 2: Advanced JS & TypeScript", desc: "Master asynchronous JavaScript (Promises, Async/Await), RESTful API integration, Event Loop, OOP principles, and strong typing with TypeScript." },
    { title: "Module 3: React & State Management", desc: "Build scalable Single Page Applications (SPA) using React, Hooks, Redux Toolkit, React Router, and Tailwind CSS." },
    { title: "Module 4: Backend & PostgreSQL Integration", desc: "Construct REST APIs with Node.js and Express, handle authentication with JWT, and integrate cloud databases via Supabase / PostgreSQL." },
    { title: "Module 5: AI Integration & Capstone Project", desc: "Implement OpenAI API and AI agents into web applications. Develop a fullstack production-ready startup project with team code reviews." }
  ],
  ru: [
    { title: "Модуль 1: Веб-фундамент (HTML5, CSS3, JS)", desc: "Верстка адаптивных интерфейсов по Figma-макетам. Освоение Flexbox, Grid, БЭМ, ES6+ JavaScript, работы с DOM и системами контроля версий Git." },
    { title: "Модуль 2: Продвинутый JS и TypeScript", desc: "Глубокое погружение в асинхронный код (Promises, Async/Await), интеграция REST API, ООП и типизация на TypeScript." },
    { title: "Модуль 3: React и управление состоянием", desc: "Разработка современных SPA-приложений на React, работа с хуками, Redux Toolkit, Zustand и кастомными стилями." },
    { title: "Модуль 4: Бэкенд и базы данных PostgreSQL", desc: "Создание серверной логики на Node.js / Express, авторизация через JWT, подсоединение и запросы к PostgreSQL / Supabase." },
    { title: "Модуль 5: ИИ-интеграции и Дипломный проект", desc: "Внедрение моделей OpenAI API в реальные сервисы. Командная разработка веб-стартапа с защитой перед работодателями." }
  ]
};

const FAQ_DATA = {
  en: [
    { q: "Is prior programming experience required?", a: "No prior coding experience is required. Our programs start from fundamental principles and build up to advanced production-level software development step-by-step." },
    { q: "How much time do I need to commit weekly?", a: "We recommend dedicating 8–10 hours per week. This includes watching live webinars, working through practical assignments, and attending code review sessions." },
    { q: "Will I receive career support and job search help?", a: "Yes, our career center assists with resume building, LinkedIn optimization, mock technical interviews, and direct referrals to partner IT companies." },
    { q: "How does the payment and installment plan work?", a: "You can pay in full or choose an interest-free monthly installment plan (3 to 24 months). The first installment payment is due 30 days after enrollment." },
    { q: "What happens if I miss a live class?", a: "All live sessions are recorded and uploaded to your personal dashboard within 2 hours, along with learning materials and mentor notes." },
    { q: "Can I combine studying with a full-time job?", a: "Yes, 85% of our students work full-time or study at university. All live classes take place during weekday evenings and weekend hours." },
    { q: "What hardware or software do I need to get started?", a: "Any modern laptop or desktop PC with at least 8 GB RAM and a stable internet connection is sufficient for all course modules." },
    { q: "Do I get a certificate upon course completion?", a: "Yes, graduates receive an official verified Certificate of Completion and a ready GitHub portfolio featuring 4+ production projects." }
  ],
  ru: [
    { q: "Нужен ли опыт в программировании для старта?", a: "Нет, предварительный опыт не требуется. Обучение построено от базовых концепций до продвинутого уровня разработки реальных проектов." },
    { q: "Сколько времени нужно уделять учёбе в неделю?", a: "Мы рекомендуем уделять от 8 до 10 часов в неделю. Это включает просмотр лекций, выполнение практических ДЗ и разбор кода с ментором." },
    { q: "Помогаете ли вы с трудоустройством после курса?", a: "Да, наш карьерный центр помогает составить резюме, подготавливает к техническим собеседованиям и отправляет портфолио партнёрам." },
    { q: "Как работает система рассрочки?", a: "Вы можете оплатить курс целиком или оформить беспроцентную рассрочку на срок от 3 до 24 месяцев. Первый платеж списывается только через 30 дней." },
    { q: "Что делать, если я пропущу онлайн-занятие?", a: "Все лекции и разборы сохраняются в записи в вашем личном кабинете вместе с методическими материалами и домашними заданиями." },
    { q: "Можно ли совмещать обучение с работой или вузом?", a: "Да, более 85% наших студентов параллельно работают или учатся. Вебинары проходят по вечерам в будни и по выходным." },
    { q: "Какое оборудование необходимо для обучения?", a: "Достаточно любого современного ПК или ноутбука с оперативной памятью от 8 ГБ и стабильным доступом в интернет." },
    { q: "Выдаётся ли сертификат по окончанию программы?", a: "Да, вы получите подтвержденный сертификат CodeCraft Academy и готовое портфолио из 4 реальных проектов на GitHub." }
  ]
};

let selectedCourse = COURSES[0];

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

function renderAccordions() {
  const progContainer = document.getElementById('programAccordion');
  const faqContainer = document.getElementById('faqAccordion');

  if (progContainer) {
    progContainer.innerHTML = CURRICULUM_DATA[currentLang].map(item => `
      <div class="accordion-item">
        <button class="accordion-header">${item.title} <span>+</span></button>
        <div class="accordion-body"><p>${item.desc}</p></div>
      </div>
    `).join('');
  }

  if (faqContainer) {
    faqContainer.innerHTML = FAQ_DATA[currentLang].map(item => `
      <div class="accordion-item">
        <button class="accordion-header">${item.q} <span>+</span></button>
        <div class="accordion-body"><p>${item.a}</p></div>
      </div>
    `).join('');
  }

  document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.onclick = () => {
      btn.parentElement.classList.toggle('active');
    };
  });
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
  renderAccordions();
}

document.addEventListener('DOMContentLoaded', () => {
  applyLanguage('en');

  // Переключатель языка
  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const nextLang = currentLang === 'en' ? 'ru' : 'en';
      applyLanguage(nextLang);
    });
  }

  // --- ИСПРАВЛЕНО ЗАКРЫТИЕ МОДАЛКЕ (КРЕСТИК И ОВЕРЛЕЙ) ---
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeAllModals);
  }

  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
        closeAllModals();
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  // Маски ввода
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
      if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2, 4);
      e.target.value = val;
    });
  }

  const cardCvc = document.getElementById('cardCvc');
  if (cardCvc) {
    cardCvc.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
    });
  }

  // Фильтры
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