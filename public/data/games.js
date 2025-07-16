window.puzzleData = [
  {
    id: 1,
    imageSrc: '/images/puzzle1.jpg',
    completed: false
  },
  {
    id: 2,
    imageSrc: '/images/puzzle2.jpg',
    completed: false
  },
  {
    id: 3,
    imageSrc: '/images/puzzle3.jpg',
    completed: false
  }
];

window.difficultyLevels = [
  {
    id: 'easy',
    name: 'Легкий',
    rows: 3,
    columns: 4,
    description: '3x4'
  },
  {
    id: 'medium',
    name: 'Средний',
    rows: 4,
    columns: 6,
    description: '4x6'
  },
  {
    id: 'hard',
    name: 'Сложный',
    rows: 6,
    columns: 8,
    description: '6x8'
  }
];

window.crosswordData = {
  size: 23,
  words: [
    {
      id: 'v1',
      word: 'Москва',
      clue: 'Какой город воздушная арктическая трасса вдоль евразийского побережья связала с самыми отдалёнными базами Советской Арктики, с её портами, зимовками, полярными станциями и промышленными новостройками?',
      direction: 'vertical',
      start: { row: 1, col: 14 },
      solved: false
    },
    {
      id: 'h2',
      word: 'Гидросамолет',
      clue: 'Использование каких самолетов позволяло приземляться на водные поверхности, что было особенно актуально в условиях сурового климата?',
      direction: 'horizontal',
      start: { row: 2, col: 10 },
      solved: false
    },
    {
      id: 'v3',
      word: 'Аэрогидропорт',
      clue: 'С 1933 года началось регулярное воздушное сообщение по маршрутам Красноярск – Игарка. Что для этого было обустроено в Красноярске на острове Телячем?',
      direction: 'vertical',
      start: { row: 4, col: 9 },
      solved: false
    },
    {
      id: 'h4',
      word: 'Кострома',
      clue: 'Одна из остановок авиамаршрута Москва – Архангельск, родина Снегурочки?',
      direction: 'horizontal',
      start: { row: 4, col: 2 },
      solved: false
    },
    {
      id: 'h5',
      word: 'Арктика',
      clue: 'Как называется район Земли, который примыкает к Северному полюсу?',
      direction: 'horizontal',
      start: { row: 6, col: 8 },
      solved: false
    },
    {
      id: 'h6',
      word: 'Шмидт',
      clue: 'В 1932 году было образовано Главное управление Северного морского пути, назовите фамилию того, кто стал его руководителем?',
      direction: 'horizontal',
      start: { row: 9, col: 7 },
      solved: false
    },
    {
      id: 'v7',
      word: 'Северный',
      clue: 'Для изучения подступов к какому полюсу использовался маршрут Москва — Земля Франца-Иосифа?',
      direction: 'vertical',
      start: { row: 12, col: 14 },
      solved: false
    },
    {
      id: 'v8',
      word: 'Красноярск',
      clue: 'В каком городе начинался и заканчивался кольцевой маршрут, который совершили в июле 1936 года лётчики Г.Т. Побежимов и В.С. Молоков на летающей лодке Дорнье «Валь» облетев территорию Крайнего Севера?',
      direction: 'vertical',
      start: { row: 14, col: 12 },
      solved: false
    },
    {
      id: 'h9',
      word: 'Молоков',
      clue: 'Фамилия летчика, впервые проложившего авиатрассу через весь Северный морской путь?',
      direction: 'horizontal',
      start: { row: 14, col: 8 },
      solved: false
    },
    {
      id: 'h10',
      word: 'Авиаперевозки',
      clue: 'Что стало важным инструментом для транспортировки грузов, почты и пассажиров в арктическом регионе?',
      direction: 'horizontal',
      start: { row: 22, col: 1 },
      solved: false
    }
  ]
};

window.quizData = [
  {
    id: 1,
    question: 'Для чего в 1930-е годы в СССР была создана полярная авиация?',
    info: '(выберите один или несколько правильных ответов)',
    answers: [
      { id: 'a', text: 'помогала осваивать Америку', correct: false },
      { id: 'b', text: 'снабжение дрейфующих и полярных станций', correct: true },
      { id: 'c', text: 'помогала осваивать Арктику', correct: true },
      { id: 'd', text: 'перевозка пассажиров и грузов в районах Крайнего Севера', correct: true }
    ],
    multiAnswer: true
  },
  {
    id: 2,
    question: 'В каком году началось регулярное воздушное сообщение по маршруту Красноярск — Игарка?',
    answers: [
      { id: 'a', text: '1933', correct: true },
      { id: 'b', text: '1934', correct: false },
      { id: 'c', text: '1930', correct: false }
    ],
    multiAnswer: false
  },
  {
    id: 3,
    question: 'Название какого города пропущено в тексте?',
    info: 'В июле 1936 года лётчики Г. Т. Побежимов и В. С. Молоков на летающей лодке Дорнье «Валь» облетели территорию Крайнего Севера, преодолев по кольцевому маршруту ________ — Якутск — Охотск — остров Врангеля — Москва — ________ 31 000 километров.',
    answers: [
      { id: 'a', text: 'Краснодар', correct: false },
      { id: 'b', text: 'Копейск', correct: false },
      { id: 'c', text: 'Красноярск', correct: true }
    ],
    multiAnswer: false
  },
  {
    id: 4,
    question:
      '22 июля 1936 года Василий Молоков совершил полёт на ______ «СССР Н-2», который проходил от Красноярска вдоль берегов Северного Ледовитого океана до Архангельска с остановками по всем полярным станциям. Какое слово пропущено?',
    answers: [
      { id: 'a', text: 'аквасамолет', correct: false },
      { id: 'b', text: 'гидросамолет', correct: true },
      { id: 'c', text: 'водосамолет', correct: false }
    ],
    multiAnswer: false
  },
  {
    id: 5,
    question: 'Важной частью чего стал в 1930-х годах Северный морской путь?',
    answers: [
      { id: 'a', text: 'транспортной инфраструктуры Советского Союза', correct: true },
      { id: 'b', text: 'военной миссии Советского Союза', correct: false },
      { id: 'c', text: 'курортных маршрутов Советского Союза', correct: false }
    ],
    multiAnswer: false
  },
  {
    id: 6,
    question: 'Как расшифровывается аббревиатура СМП?',
    answers: [
      { id: 'a', text: 'Снежная Морозная Погода', correct: false },
      { id: 'b', text: 'Самолет Морского Предназначения', correct: false },
      { id: 'c', text: 'Северный Морской Путь', correct: true }
    ],
    multiAnswer: false
  },
  {
    id: 7,
    question: 'Сколько самолетов насчитывалось у полярной авиации в 1935 году?',
    answers: [
      { id: 'a', text: '77', correct: true },
      { id: 'b', text: '15', correct: false },
      { id: 'c', text: '104', correct: false }
    ],
    multiAnswer: false
  },
  {
    id: 8,
    question: 'Какие отечественные самолеты конструктора А.Н.Туполева получила в 1935 году полярная авиация?',
    answers: [
      { id: 'a', text: 'МП-6', correct: true },
      { id: 'b', text: 'АНТ-4', correct: false },
      { id: 'c', text: 'АНТ-25', correct: false }
    ],
    multiAnswer: false
  },
  {
    id: 9,
    question: 'В феврале 1933 года было образовано Управление воздушной службы. Кто стал руководителем организации?',
    answers: [
      { id: 'a', text: 'Б.Г. Чухновский', correct: false },
      { id: 'b', text: 'М.И. Шевелёв', correct: true },
      { id: 'c', text: 'А.В. Беляков', correct: false }
    ],
    multiAnswer: false
  },
  {
    id: 10,
    question: 'Модель какого самолета рассматривает летчик Василий Молоков с женой Надеждой?',
    answers: [
      { id: 'a', text: 'Р-5', correct: true },
      { id: 'b', text: 'Ш-2', correct: false },
      { id: 'c', text: 'У-2', correct: false }
    ],
    multiAnswer: false
  }
];
