const resumePath = `${import.meta.env.BASE_URL}resume.pdf`

export const person = {
  name: 'Владислав Ларионов',
  tagline: 'Разработчик машинного обучения в Яндекс.Картах',
  github: 'https://github.com/vladlenblch',
  email: 'vlad6larionov@gmail.com',
  telegram: 'https://t.me/larionov_vlad',
  resumePath,
} as const

export const education = [
  {
    place: 'Университет ИТМО',
    details: [
      'Мегафакультет Компьютерных Технологий и Управления',
      'Факультет Программной Инженерии и Компьютерной Техники',
    ] as const,
    program: '«Системное и Прикладное Программное Обеспечение»',
    period: 'Сентябрь 2024 — июнь 2028',
  },
  {
    place: 'Заочная физико-техническая школа при МФТИ',
    details: [
      'Отделение математики, повышенный уровень',
      'Отделение информатики, повышенный уровень',
    ] as const,
    program: '',
    period: 'Сентябрь 2022 — июнь 2023',
  },
] as const

export const softSkills = [
  'Умение работать в команде',
  'Самообучаемость',
  'Стрессоустойчивость',
  'Самоорганизация и следование дедлайнам',
  'Ответственность за результат',
] as const

export const spokenLanguages = [
  'Английский — C1',
] as const

export const stackGroups = [
  {
    title: 'Языки программирования',
    items: ['Python', 'C++'],
  },
  {
    title: 'ML/DL',
    items: ['scikit-learn', 'CatBoost', 'PyTorch', 'Optuna'],
  },
  {
    title: 'Работа с данными и вычислениями',
    items: ['Pandas', 'NumPy'],
  },
  {
    title: 'Базы данных',
    items: ['PostgreSQL', 'SQLite'],
  },
  {
    title: 'Визуализация данных',
    items: ['Matplotlib', 'Seaborn', 'Plotly'],
  },
  {
    title: 'Инструменты и инфраструктура',
    items: ['Git', 'Docker', 'Linux/Bash', 'FastAPI'],
  },
] as const

export const siteStackFooterText = ['Vite', 'React', 'TypeScript', 'CSS'].join(' · ')

export type ProjectBullet =
  | string
  | { readonly text: string; readonly sub: readonly string[] }

export const projects = [
  {
    title: 'Credit Approval ML System',
    bullets: [
      'Разработал ML-сервис на FastAPI, который оценивает вероятность дефолта и принимает решение по заявке',
      'Построил пайплайн без утечки данных со стратифицированным разбиением, заполнением пропусков и конструированием признаков',
      'Подобрал гиперпараметры и веса ансамбля CatBoost, LightGBM и XGBoost через байесовскую оптимизацию в Optuna. Проверил качество по OOF-предсказаниям на трёх фолдах',
      'Подобрал порог принятия решения по функции прибыли',
      {
        text: 'Результаты на тестовой выборке',
        sub: [
          'PR-AUC = 0,4095 при доле дефолтов 6,68%',
          '16 234 у. е. по функции прибыли (+1 за одобрение без дефолта, −5 за одобрение с дефолтом)',
        ],
      },
    ],
    url: 'https://github.com/vladlenblch/credit_approval_system',
    tags: ['Python', 'FastAPI', 'Pandas', 'scikit-learn', 'Optuna', 'CatBoost', 'LightGBM', 'XGBoost'],
  },
  {
    title: 'Semantic Duplicate Detector',
    bullets: [
      'Сравнил TF-IDF с косинусным сходством, TF-IDF с логистической регрессией, Siamese Network и BERT Siamese Network',
      'Дообучил BERT в Siamese-архитектуре с Contrastive Loss и L2-нормализацией эмбеддингов',
      'Обучил модель с AdamW и ранней остановкой по ROC-AUC на валидации. Подобрал порог на валидации и оценил качество на отложенной тестовой выборке',
      {
        text: 'Результаты на тестовой выборке',
        sub: [
          'Accuracy = 0,885, ROC-AUC = 0,949',
          'Precision@100 = 0,96 у TF-IDF с логистической регрессией',
        ],
      },
    ],
    url: 'https://github.com/vladlenblch/semantic_duplicate_detector',
    tags: ['Python', 'PyTorch', 'Hugging Face Transformers', 'scikit-learn', 'Pandas'],
  },
  {
    title: 'Decision Tree Classifier',
    bullets: [
      'Реализовал дерево бинарной классификации с нуля на C++',
      'Покрыл проект тестами на GoogleTest, измерил производительность через Google Benchmark и настроил автоматический запуск тестов в GitHub Actions',
      'Сравнил критерии gini и entropy. С entropy Accuracy выросла с 0,971 до 0,985, а Precision — с 0,952 до 0,992',
      {
        text: 'Результаты на тестовой выборке для entropy',
        sub: [
          'Accuracy = 0,985',
          'Precision = 0,992',
          'Recall = 0,975',
        ],
      },
    ],
    url: 'https://github.com/vladlenblch/decision_tree_classifier_cpp',
    tags: ['C++', 'GoogleTest', 'Google Benchmark', 'GitHub Actions'],
  },
] as const satisfies ReadonlyArray<{
  title: string
  bullets: readonly ProjectBullet[]
  url: string
  tags: readonly string[]
}>

export const marqueeItems = stackGroups.flatMap((g) => [...g.items])
