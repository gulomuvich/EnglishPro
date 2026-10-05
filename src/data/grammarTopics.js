export const GRAMMAR_TOPICS = [
  {
    id: "g_tobe",
    title: "To Be fe'li (am / is / are / was / were)",
    level: "0 / A1",
    summaryUz: "'To be' fe'li — bo'lmoq, mavjud bo'lmoq ma'nosini bildiradi va kishining kimligi, qayerdaligi, holatini ifodalashda qo'llaniladi.",
    formula: "Subject + am/is/are + Noun/Adjective",
    examples: [
      { en: "I am a student.", uz: "Men talabaman." },
      { en: "He is at work right now.", uz: "U hozir ishda." },
      { en: "They were happy yesterday.", uz: "Ular kecha xursand edilar." }
    ],
    commonMistake: {
      incorrect: "She have 20 years old.",
      correct: "She is 20 years old.",
      reason: "Ingliz tilida yoshni aytganda 'have' emas, 'to be' ishlatiladi."
    },
    quiz: {
      question: "Which sentence is grammatically correct?",
      options: [
        "They is my best friends.",
        "They are my best friends.",
        "They am my best friends."
      ],
      correctIndex: 1
    }
  },
  {
    id: "g_present_simple",
    title: "Present Simple (Oddiy Hozirgi Zamon)",
    level: "A1 / A2",
    summaryUz: "Doimiy takrorlanadigan ish-harakatlar, odatlar, ilmiy faktlar va jadvallar uchun qo'llaniladi.",
    formula: "I/You/We/They + V1 | He/She/It + V1(s/es)",
    examples: [
      { en: "She drinks coffee every morning.", uz: "U har kuni ertalab qahva ichadi." },
      { en: "Water boils at 100 degrees Celsius.", uz: "Suv 100 gradusda qaynaydi." },
      { en: "Do you play football on Sundays?", uz: "Yakshanba kunlari futbol o'ynaysizmi?" }
    ],
    commonMistake: {
      incorrect: "He play tennis very well.",
      correct: "He plays tennis very well.",
      reason: "Uchinchi shaxs birlikda (he/she/it) fe'lga '-s' qo'shiladi."
    },
    quiz: {
      question: "Sarah _______ to the gym three times a week.",
      options: ["go", "goes", "is going"],
      correctIndex: 1
    }
  },
  {
    id: "g_past_simple",
    title: "Past Simple (Oddiy O'tgan Zamon)",
    level: "A2",
    summaryUz: "O'tmishda sodir bo'lgan va yakunlangan ish-harakatlarni ifodalaydi. 'Yesterday', 'last year', 'in 2020' kabi so'zlar bilan keladi.",
    formula: "Subject + V2 (Verb+ed yoki Irregular Verb)",
    examples: [
      { en: "I watched an amazing documentary yesterday.", uz: "Men kecha ajoyib hujjatli film ko'rdim." },
      { en: "We went to Samarkand last weekend.", uz: "Biz o'tgan dam olish kunlari Samarqandga bordik." },
      { en: "Did you finish your homework?", uz: "Vazifangizni tugatdingizmi?" }
    ],
    commonMistake: {
      incorrect: "I didn't went there.",
      correct: "I didn't go there.",
      reason: "'Didn't' dan keyin doim fe'lning boshlang'ich shakli (V1) keladi."
    },
    quiz: {
      question: "They _______ a new apartment last month.",
      options: ["buy", "bought", "have bought"],
      correctIndex: 1
    }
  },
  {
    id: "g_present_perfect",
    title: "Present Perfect (Tugallangan Hozirgi Zamon)",
    level: "B1",
    summaryUz: "O'tmishda boshlangan yoki tugallangan, lekin natijasi ayni damda ko'rinib turgan tajribalar.",
    formula: "Subject + have/has + V3 (Past Participle)",
    examples: [
      { en: "I have visited London three times.", uz: "Men uch marta Londonda bo'lganman." },
      { en: "She has just completed her IELTS test.", uz: "U hozirgina IELTS testini tugatdi." },
      { en: "Have you ever tried traditional Uzbek plov?", uz: "Siz hech an'anaviy o'zbek oshini tatib ko'rganmisiz?" }
    ],
    commonMistake: {
      incorrect: "I have seen him yesterday.",
      correct: "I saw him yesterday.",
      reason: "Aniq o'tgan vaqt (yesterday, last week) bo'lsa, Present Perfect emas, Past Simple ishlatiladi."
    },
    quiz: {
      question: "He _______ his passport, so he cannot board the plane.",
      options: ["lost", "has lost", "was losing"],
      correctIndex: 1
    }
  },
  {
    id: "g_conditionals",
    title: "Conditionals (Shart Mayli 0, 1, 2, 3)",
    level: "B1 / B2",
    summaryUz: "Muayyan shart bajarilganda sodir bo'ladigan voqea-hodisalar. Real (1st) va noreal (2nd, 3rd) vaziyatlar.",
    formula: "1st: If + Present Simple, will + V1 | 2nd: If + Past Simple, would + V1",
    examples: [
      { en: "If you study hard, you will pass IELTS.", uz: "Agar qattiq o'qisangiz, IELTS dan o'tasiz." },
      { en: "If I had more free time, I would read more books.", uz: "Agar bo'sh vaqtim ko'proq bo'lganida, ko'proq kitob o'qir edim." }
    ],
    commonMistake: {
      incorrect: "If it will rain, I will stay at home.",
      correct: "If it rains, I will stay at home.",
      reason: "'If' dan keyingi shart ergash gapda 'will' ishlatilmaydi, Present Simple ishlatiladi."
    },
    quiz: {
      question: "If I _______ you, I would take that opportunity immediately.",
      options: ["am", "was", "were"],
      correctIndex: 2
    }
  },
  {
    id: "g_passive_voice",
    title: "Passive Voice (Majhul Nisbat)",
    level: "B2 / IELTS",
    summaryUz: "Ish-harakatni bajaruvchi shaxs emas, balki harakat ob'ekti va natijasi muhim bo'lgan holatlarda ishlatiladi.",
    formula: "Subject + to be (zamoniga qarab) + V3",
    examples: [
      { en: "English is spoken all around the world.", uz: "Ingliz tili butun dunyo bo'ylab so'zlashiladi." },
      { en: "The report was published yesterday.", uz: "Hisobot kecha e'lon qilindi." }
    ],
    commonMistake: {
      incorrect: "The car was disappeared.",
      correct: "The car disappeared.",
      reason: "'Disappear' kabi o'timsiz (intransitive) fe'llar passivda ishlatilmaydi."
    },
    quiz: {
      question: "The historic building _______ by thousands of tourists every week.",
      options: ["is visited", "visited", "is visit"],
      correctIndex: 0
    }
  }
];
