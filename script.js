// 1. Конфигурация Supabase
const SUPABASE_URL = 'https://hiuewishszldiuatuxig.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_lLGFX7CFT3XKPqntjihpgQ_at_OA6kN'; 

// 2. Локальный массив курсов (отрисовывается мгновенно)
const COURSES = [
  { id: 1, category: 'dev', title: 'Fullstack Web Developer', desc: 'HTML, CSS, JavaScript, React, Node.js, PostgreSQL.', price: 1200, duration: '12 месяцев' },
  { id: 2, category: 'dev', title: 'Python Developer & Django', desc: 'Бэкенд разработка, парсинг, REST API, базы данных.', price: 950, duration: '9 месяцев' },
  { id: 3, category: 'design', title: 'UI/UX & Product Design', desc: 'Figma, веб-дизайн, мобильные интерфейсы, исследования.', price: 800, duration: '6 месяцев' },
  { id: 4, category: 'ai', title: 'AI & Prompt Engineer', desc: 'Работа с LLM, OpenAI API, разработка ИИ-агентов.', price: 1100, duration: '8 месяцев' },
  { id: 5, category: 'ai', title: 'Data Science & Machine Learning', desc: 'Python, Pandas, NumPy, обучение моделей и аналитика.', price: 1300, duration: '10 месяцев' },
  { id: 6, category: 'dev', title: 'Telegram Mini Apps & Web3', desc: 'Разработка WebApp внутри Telegram на React/Node.', price: 650, duration: '4 месяца' }
];

let selectedCourse = COURSES[0];

// Функция рендера карточек
function renderCourses(filter = 'all') {
  const coursesGrid = document.getElementById('coursesGrid');
  if (!coursesGrid) return;
  const filtered = filter === 'all' ? COURSES : COURSES.filter(c => c.category === filter);

  coursesGrid.innerHTML = filtered.map(c => `
    <div class="course-card">
      <span class="course-badge">${c.duration}</span>
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <div class="course-footer">
        <span class="course-price">${c.price} $</span>
        <button class="btn-accent" onclick="selectAndEnroll(${c.id})">Записаться</button>
      </div>
    </div>
  `).join('');
}

// ПЕРВЫЙ ЗАПУСК ОТРИСОВКИ (Сразу при загрузке скрипта)
renderCourses();

// Основной интерактив
document.addEventListener('DOMContentLoaded', () => {
  renderCourses(); // Повторный рендер для страховки

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

  // Маски карт
  const cardNum = document.getElementById('cardNumber');
  if (cardNum) {
    cardNum.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      e.target.value = val.replace(/(.{4})/g, '$1 ').trim();
    });
  }

  const cardExp = document.getElementById('cardExp');
  if (cardExp) {
    cardExp.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2, 4);
      e.target.value = val;
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

      if (payBtn) {
        payBtn.disabled = true;
        payBtn.textContent = 'Сохранение...';
      }

      try {
        // Подключаем Supabase ТОЛЬКО при клике на форму
        if (window.supabase) {
          const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
          const { error } = await client.from('enrollments').insert([
            {
              student_name: studentName,
              student_email: studentEmail,
              course_title: selectedCourse.title,
              price: selectedCourse.price,
              payment_status: 'PAID'
            }
          ]);

          if (error) throw error;
          showToast(`Успешно! Запись зафиксирована в Supabase.`);
        } else {
          showToast(`Успешно! Вы зачислены на "${selectedCourse.title}". (Локальный режим)`);
        }

        closeAllModals();
        enrollForm.reset();
      } catch (err) {
        console.error('Ошибка записи:', err);
        showToast('Ошибка базы данных: ' + err.message);
      } finally {
        if (payBtn) {
          payBtn.disabled = false;
          payBtn.textContent = 'Оплатить и начать обучение';
        }
      }
    });
  }

  // Аккордеон
  document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.classList.toggle('active');
    });
  });

  // Инфо модалки
  const openPrivacyBtn = document.getElementById('openPrivacyBtn');
  const openTermsBtn = document.getElementById('openTermsBtn');

  if (openPrivacyBtn) {
    openPrivacyBtn.addEventListener('click', () => {
      document.getElementById('infoModalTitle').textContent = "Privacy Policy";
      document.getElementById('infoModalText').textContent = "Защита персональных данных студентов CodeCraft Academy.";
      openInfoModal();
    });
  }

  if (openTermsBtn) {
    openTermsBtn.addEventListener('click', () => {
      document.getElementById('infoModalTitle').textContent = "Terms of Service";
      document.getElementById('infoModalText').textContent = "Оплата гарантирует доступ к материалам и поддержке.";
      openInfoModal();
    });
  }
});

// Глобальные функции
window.selectAndEnroll = function(id) {
  const enrollModal = document.getElementById('enrollModal');
  const modalCourseTitle = document.getElementById('modalCourseTitle');
  const modalCoursePrice = document.getElementById('modalCoursePrice');
  const course = COURSES.find(c => c.id === id);

  if (course && enrollModal) {
    selectedCourse = course;
    if (modalCourseTitle) modalCourseTitle.textContent = course.title;
    if (modalCoursePrice) modalCoursePrice.textContent = `${course.price} $`;
    enrollModal.classList.add('open');
  }
};

const openCartBtn = document.getElementById('openCartBtn');
if (openCartBtn) {
  openCartBtn.addEventListener('click', () => selectAndEnroll(1));
}

function openInfoModal() {
  const infoModal = document.getElementById('infoModal');
  if (infoModal) infoModal.classList.add('open');
}

function closeAllModals() {
  const enrollModal = document.getElementById('enrollModal');
  const infoModal = document.getElementById('infoModal');
  if (enrollModal) enrollModal.classList.remove('open');
  if (infoModal) infoModal.classList.remove('open');
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

function updateCalculator() {
  const calcSelect = document.getElementById('calcCourseSelect');
  const rangeInput = document.getElementById('monthsRange');
  const monthsVal = document.getElementById('monthsVal');
  const monthlyPrice = document.getElementById('monthlyPrice');

  if (!calcSelect || !rangeInput || !monthsVal || !monthlyPrice) return;
  const total = Number(calcSelect.value);
  const months = Number(rangeInput.value);
  monthsVal.textContent = `${months} месяцев`;
  const perMonth = Math.round(total / months);
  monthlyPrice.textContent = `${perMonth} $ / мес`;
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