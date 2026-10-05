// Local Storage & Persistence Service for English Master AI

const STORAGE_KEYS = {
  USER: 'ema_user_profile',
  XP: 'ema_user_xp',
  STREAK: 'ema_user_streak',
  COMPLETED_LESSONS: 'ema_completed_lessons',
  VOCABULARY: 'ema_user_vocab',
  MISTAKES: 'ema_error_notebook',
  SETTINGS: 'ema_settings',
  DAILY_TASKS: 'ema_daily_tasks'
};

const DEFAULT_USER = {
  id: 'usr_local_1',
  name: 'Ali Valiyev',
  email: 'ali@example.com',
  phone: '+998 90 123 45 67',
  level: 'Beginner (0)',
  targetLevel: 'IELTS 9.0',
  avatar: '👨‍🎓',
  joinDate: '2026-09-01'
};

const DEFAULT_SETTINGS = {
  theme: 'dark',
  language: 'uz', // 'uz' or 'en'
  reminderPhone: '+998 90 123 45 67',
  reminderTime: '19:00',
  reminderEnabled: true,
  dailyGoalMin: 20
};

export const storageService = {
  getUser: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  },

  saveUser: (user) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getXP: () => {
    return parseInt(localStorage.getItem(STORAGE_KEYS.XP) || '1250', 10);
  },

  addXP: (amount) => {
    const current = storageService.getXP();
    const updated = current + amount;
    localStorage.setItem(STORAGE_KEYS.XP, updated.toString());
    return updated;
  },

  getStreak: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STREAK);
      return data ? JSON.parse(data) : { days: 7, lastDate: new Date().toDateString() };
    } catch {
      return { days: 7, lastDate: new Date().toDateString() };
    }
  },

  getCompletedLessons: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
      return data ? JSON.parse(data) : ['z1', 'z2', 'z3', 'a1_1'];
    } catch {
      return ['z1', 'z2', 'z3', 'a1_1'];
    }
  },

  markLessonComplete: (lessonId, xp = 30) => {
    const completed = storageService.getCompletedLessons();
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
      localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(completed));
      storageService.addXP(xp);
    }
    return completed;
  },

  getMistakes: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MISTAKES);
      return data ? JSON.parse(data) : [
        {
          id: 'm1',
          incorrect: 'I go yesterday to school.',
          correct: 'I went to school yesterday.',
          ruleUz: "Yesterday o'tgan zamon bo'lgani sababli 'went' ishlatiladi.",
          topic: 'Past Simple',
          date: 'Kecha'
        },
        {
          id: 'm2',
          incorrect: 'She have 20 years old.',
          correct: 'She is 20 years old.',
          ruleUz: "Ingliz tilida yoshni aytganda 'have' emas, 'to be' ishlatiladi.",
          topic: 'To Be',
          date: 'Bugun'
        }
      ];
    } catch {
      return [];
    }
  },

  addMistake: (mistake) => {
    const list = storageService.getMistakes();
    const newItem = {
      id: 'm_' + Date.now(),
      date: 'Bugun',
      ...mistake
    };
    list.unshift(newItem);
    localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(list));
    return list;
  },

  getDailyTasks: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DAILY_TASKS);
      return data ? JSON.parse(data) : [
        { id: 't1', titleUz: '10 ta yangi so\'z o\'rganish', completed: true, xp: 20 },
        { id: 't2', titleUz: '1 ta video dars ko\'rish', completed: false, xp: 30 },
        { id: 't3', titleUz: '10 ta grammatika testi yechish', completed: false, xp: 25 },
        { id: 't4', titleUz: '5 daqiqa speaking mashqi qilish', completed: false, xp: 30 },
        { id: 't5', titleUz: 'AI ustoz bilan 1 marta suhbatlashish', completed: true, xp: 25 }
      ];
    } catch {
      return [];
    }
  },

  toggleDailyTask: (taskId) => {
    const tasks = storageService.getDailyTasks();
    const updated = tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
    localStorage.setItem(STORAGE_KEYS.DAILY_TASKS, JSON.stringify(updated));
    return updated;
  },

  getSettings: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings: (settings) => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }
};
