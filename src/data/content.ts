/** Portfolio copy sourced from workspace me.txt, stack.txt, projects.txt */

const resumePath = `${import.meta.env.BASE_URL}resume.pdf`

export const person = {
  name: 'Влад',
  tagline:
    'Учусь на факультете ПИиКТ в ИТМО, обучаю модели машинного обучения.',
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

/** Soft skills — блок «Обо мне» (не из me.txt; общие формулировки) */
export const softSkills = [
  'Умение работать в команде',
  'Самообучаемость',
  'Стрессоустойчивость',
  'Самоорганизация и следование дедлайнам',
  'Ответственность за результат',
] as const

/** Разговорные языки — при необходимости поправьте уровни под резюме */
export const spokenLanguages = [
  'Английский — C1',
] as const

export const stackGroups = [
  {
    title: 'Машинное обучение',
    items: ['scikit-learn', 'CatBoost', 'PyTorch'],
  },
  {
    title: 'Работа с данными',
    items: ['pandas', 'PostgreSQL', 'SQLite', 'Microsoft Excel', 'NumPy'],
  },
  {
    title: 'Визуализация',
    items: ['Matplotlib', 'seaborn', 'Plotly', 'Streamlit'],
  },
  {
    title: 'Языки программирования',
    items: ['Python', 'C++', 'Java', 'JavaScript'],
  },
  {
    title: 'Инструменты',
    items: ['Git', 'Docker', 'Linux/Bash', 'LaTeX', 'Markdown'],
  },
] as const

/** Технологии этого сайта (футер) */
export const siteStackFooterText = ['Vite', 'React', 'TypeScript', 'CSS'].join(' · ')

export type ProjectBullet =
  | string
  | { readonly text: string; readonly sub: readonly string[] }

export const projects = [
  {
    title: 'Линейная регрессия с нуля',
    bullets: [
      'Реализовал с нуля регрессию через минимизацию MSE (аналитическое решение)',
      'Реализовал с нуля регрессию через минимизацию MAE (subgradient descent)',
      'Реализовал с нуля SGD',
      'Сделал визуализацию сходимости SGD',
      'Сравнил с релизациями sklearn',
    ],
    url: 'https://github.com/vladlenblch/linear_regressions_from_scratch',
    tags: ['Python', 'ML', 'sklearn', 'optimization'],
  },
  {
    title: 'Дерево решений на C++',
    bullets: [
      'Реализовал дерево бинарной классификации с нуля на C++',
      'Подготовил пайплайн, включающий в себя покрытие тестами, гугл-бенчмарки и проверку на утечки памяти',
      {
        text: 'Метрики на тестовой выборке:',
        sub: [
          'gini — Accuracy: 97.091',
          'gini — Precision: 95.238',
          'gini — Recall: 98.361', 
          'entropy — Accuracy: 98.546',
          'entropy — Precision: 99.167',
          'entropy — Recall: 97.541',
        ],
      },
    ],
    url: 'https://github.com/vladlenblch/decision_tree_classifier_cpp',
    tags: ['C++', 'ML', 'CI', 'algorithms'],
  },
  {
    title: 'Приложение с отслеживанием рук',
    bullets: [
      {
        text: 'Включает в себя следующие режимы:',
        sub: [
          'Подсчет количества пальцев',
          'Галерея с возможностью листать фото свайпом руками',
          'Рисование в воздухе с возможностью выбора цвета, жирности ручки и режима ластика',
          'Оставшиеся режимы, основанные на различных жестах рук',
        ],
      },
    ],
    url: 'https://github.com/vladlenblch/hands_detection',
    tags: ['Python', 'CV', 'mediapipe', 'interaction'],
  },
] as const satisfies ReadonlyArray<{
  title: string
  bullets: readonly ProjectBullet[]
  url: string
  tags: readonly string[]
}>

/** Бегущая строка — те же названия на английском, что в разделе «Стек» */
export const marqueeItems = stackGroups.flatMap((g) => [...g.items])
