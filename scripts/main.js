console.info('Portfolio landing initialized');

const translations = {
  ru: {
    'about.title': 'Обо мне',
    'hero.greeting': 'Привет, я Влад!',
    'education.itmo.title': 'Университет ИТМО',
    'education.itmo.period': 'Сентябрь 2024 – Июнь 2028',
    'education.itmo.faculty': 'Факультет программной инженерии и компьютерной техники',
    'education.itmo.program': 'Программа «Системное и прикладное программное обеспечение»',
    'education.mfti.title': 'Заочная Физико-Техническая Школа при МФТИ',
    'education.mfti.period': 'Сентябрь 2022 - Июнь 2023',
    'education.mfti.math': 'Отделение математики, повышенный уровень',
    'education.mfti.cs': 'Отделение информатики, повышенный уровень',
    'nav.aria': 'Навигация по разделам',
    'nav.about': 'Обо мне',
    'nav.stack': 'Стек',
    'nav.projects': 'Проекты',
    'nav.contacts': 'Контакты',
    'stack.title': 'Стек',
    'stack.core': 'Основное',
    'stack.data': 'Работа с данными',
    'stack.ml': 'Машинное обучение',
    'stack.visualization': 'Визуализация',
    'projects.title': 'Проекты',
    'projects.eyetracker.title': 'Отслеживание взгляда',
    'projects.eyetracker.summary': 'Детекция лица и отслеживание направления глаз в реальном времени с помощью веб-камеры и проверка попадания взгляда в область на графике.',
    'projects.prediction.title': 'Предсказание попадания',
    'projects.prediction.summary': 'Логистическая регрессия дообучается на полученных данных, предсказание попадания перед каждым выстрелом на основе предыдущих координат.',
    'projects.rl.title': 'RL-агент',
    'projects.rl.summary': 'Агент, основанный на обучении с поддержкой, помогает пользователю попадать по графику, манипулируя его областью. Общается с бэкендом через Kafka.',
    'contacts.title': 'Контакты',
    'contacts.email': 'Email',
    'contacts.resume': 'Resume',
    'email.copied': 'Скопировано',
    'email.error': 'Не удалось скопировать email:'
  },
  en: {
    'about.title': 'About',
    'hero.greeting': 'Hi, I\'m Vlad!',
    'education.itmo.title': 'ITMO University',
    'education.itmo.period': 'September 2024 – June 2028',
    'education.itmo.faculty': 'Faculty of Software Engineering and Computer Systems',
    'education.itmo.program': 'Program «System and Applied Software»',
    'education.mfti.title': 'MIPT Distance Learning Physics and Technology School',
    'education.mfti.period': 'September 2022 - June 2023',
    'education.mfti.math': 'Mathematics Department, Advanced Level',
    'education.mfti.cs': 'Computer Science Department, Advanced Level',
    'nav.aria': 'Section navigation',
    'nav.about': 'About',
    'nav.stack': 'Stack',
    'nav.projects': 'Projects',
    'nav.contacts': 'Contacts',
    'stack.title': 'Stack',
    'stack.core': 'Core',
    'stack.data': 'Data Processing',
    'stack.ml': 'Machine Learning',
    'stack.visualization': 'Visualization',
    'projects.title': 'Projects',
    'projects.eyetracker.title': 'Eye Tracking',
    'projects.eyetracker.summary': 'Real-time face detection and eye direction tracking using a webcam and verification of gaze hitting an area on the chart.',
    'projects.prediction.title': 'Hit Prediction',
    'projects.prediction.summary': 'Logistic regression is fine-tuned on collected data, predicting hits before each shot based on previous coordinates.',
    'projects.rl.title': 'RL Agent',
    'projects.rl.summary': 'A reinforcement learning-based agent that helps the user hit the chart by manipulating its area. Communicates with the backend via Kafka.',
    'contacts.title': 'Contacts',
    'contacts.email': 'Email',
    'contacts.resume': 'Resume',
    'email.copied': 'Copied',
    'email.error': 'Failed to copy email:'
  }
};

let currentLang = localStorage.getItem('language') || 'ru';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;
  
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    const key = element.getAttribute('data-i18n-aria');
    if (translations[lang] && translations[lang][key]) {
      element.setAttribute('aria-label', translations[lang][key]);
    }
  });
  
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.querySelector('.lang-toggle__text').textContent = lang === 'ru' ? 'EN' : 'RU';
  }
  
  document.querySelectorAll('[data-email]').forEach(emailButton => {
    const emailKey = emailButton.getAttribute('data-i18n');
    if (emailKey && translations[lang] && translations[lang][emailKey]) {
      emailButton.setAttribute('data-original-text', translations[lang][emailKey]);
    }
  });
}

setLanguage(currentLang);

const langToggle = document.getElementById('langToggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    setLanguage(newLang);
  });
}

const navLabels = document.querySelectorAll('.radio-container label[data-target]');
let isScrollingProgrammatically = false;

navLabels.forEach((label) => {
  label.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = label.getAttribute('data-target');
    const target = targetId ? document.querySelector(targetId) : null;
    const inputId = label.getAttribute('for');
    const input = inputId ? document.getElementById(inputId) : null;

    if (input) {
      isScrollingProgrammatically = true;
      input.checked = true;
      setTimeout(() => {
        isScrollingProgrammatically = false;
      }, 1000);
    }
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const sections = document.querySelectorAll('.section[id]');
const navInputs = {
  '#about': document.getElementById('nav-hero'),
  '#stack': document.getElementById('nav-stack'),
  '#projects': document.getElementById('nav-projects'),
  '#contacts': document.getElementById('nav-contacts')
};

const observerOptions = {
  root: null,
  rootMargin: '-20% 0px -60% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  if (isScrollingProgrammatically) return;

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const sectionId = '#' + entry.target.id;
      const input = navInputs[sectionId];
      if (input) {
        input.checked = true;
      }
    }
  });
}, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});

const emailButtons = document.querySelectorAll('[data-email]');

async function copyText(text) {
  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
  }
}

emailButtons.forEach((emailButton) => {
  const email = emailButton.getAttribute('data-email');
  
  const getOriginalText = () => {
    return emailButton.getAttribute('data-original-text') || emailButton.textContent;
  };

  emailButton.addEventListener('click', async (event) => {
    event.preventDefault();
    if (!email) return;

    try {
      const copied = await copyText(email);

      if (copied) {
        emailButton.textContent = translations[currentLang]['email.copied'];
        setTimeout(() => {
          emailButton.textContent = getOriginalText();
        }, 1200);
      }
    } catch (err) {
      console.warn(translations[currentLang]['email.error'], err);
    }
  });
});

const body = document.body;
const releaseHover = () => {
  body.classList.remove('suppress-hover');
  window.removeEventListener('mousemove', releaseHover);
};

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    body.classList.add('suppress-hover');
  } else if (document.visibilityState === 'visible') {
    window.addEventListener('mousemove', releaseHover, { once: true });
  }
});

console.info('Portfolio landing initialized');
