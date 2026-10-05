export const IELTS_TEST_SUITE = {
  reading: {
    title: "IELTS Academic Reading: The Future of Renewable Energy",
    suggestedTimeMinutes: 20,
    passage: `Over the past three decades, the transition toward renewable energy sources has accelerated at an unprecedented rate. Driven by pressing environmental concerns and volatile fossil fuel markets, nations worldwide have heavily invested in wind, solar, and hydroelectric infrastructure.

Solar photovoltaic technology, in particular, has witnessed an exponential decline in manufacturing costs, making it economically competitive with conventional coal-fired power plants. However, the intermittent nature of sunlight and wind remains a formidable engineering challenge. Without robust large-scale grid storage solutions, energy grids risk destabilization during peak demand hours.

Emerging battery technologies, such as solid-state and flow batteries, promise to mitigate these fluctuations. Furthermore, smart grid systems enabled by artificial intelligence are increasingly capable of balancing supply and demand in real time. As global economies strive for net-zero carbon emissions, the synergy between technological innovation and supportive regulatory frameworks will determine the ultimate viability of a completely green power grid.`,
    questions: [
      {
        id: "rq1",
        type: "multiple_choice",
        question: "What has been the primary driver behind the rapid expansion of renewable energy?",
        options: [
          "The complete exhaustion of global coal reserves",
          "Environmental imperatives and fluctuating fossil fuel prices",
          "Strict universal international prohibitions on oil drilling",
          "Government subsidies surpassing commercial viability"
        ],
        correctIndex: 1,
        explanationUz: "Matnning 1-xatboshisida 'Driven by pressing environmental concerns and volatile fossil fuel markets' deb aniq ko'rsatilgan."
      },
      {
        id: "rq2",
        type: "true_false_notgiven",
        question: "Solar photovoltaic manufacturing costs have escalated significantly in recent years.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctIndex: 1,
        explanationUz: "FALSE. Matnda xarajatlar oshgan emas, aksincha 'exponential decline in manufacturing costs' (keskin arzonlashgan) deyilgan."
      },
      {
        id: "rq3",
        type: "true_false_notgiven",
        question: "Artificial intelligence is currently incapable of adjusting power grids in real time.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctIndex: 1,
        explanationUz: "FALSE. Matnda 'smart grid systems enabled by artificial intelligence are increasingly capable of balancing supply and demand in real time' deb keltirilgan."
      }
    ]
  },

  listening: {
    title: "IELTS Listening Section 1: University Accommodation Inquiry",
    audioDuration: "03:45",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Public sample mp3 for listening practice
    transcript: `Officer: Good morning, Student Accommodation Office. How can I assist you today?
Student: Hello. I'm an international postgraduate student starting next month, and I'd like to inquire about university residence halls.
Officer: Certainly! We have single en-suite rooms and shared flats available on North Campus. The single rooms include a private bathroom and high-speed fiber internet.
Student: That sounds ideal. What is the weekly rental fee for the single en-suite?
Officer: The single en-suite is £165 per week, including all utility bills and gym membership.`,
    questions: [
      {
        id: "lq1",
        question: "Where are the accommodation halls located?",
        options: ["South Campus", "North Campus", "City Centre", "East Village"],
        correctIndex: 1
      },
      {
        id: "lq2",
        question: "How much is the weekly rental fee for the single en-suite room?",
        options: ["£145", "£155", "£165", "£175"],
        correctIndex: 2
      }
    ]
  },

  writing: {
    task1: {
      title: "Task 1 (Report - 150 words)",
      prompt: "The chart below shows the percentage of households with internet access in four European countries between 2010 and 2024. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      minimumWords: 150,
      tipsUz: "Kirish (paraphrase), umumiy tendensiya (overview) va batafsil taqqoslovchi asosiy xatboshilarni yozing."
    },
    task2: {
      title: "Task 2 (Essay - 250 words)",
      prompt: "Some people believe that artificial intelligence will eventually replace human teachers in classrooms, while others argue that the human element is irreplaceable in education. Discuss both views and give your own opinion.",
      minimumWords: 250,
      tipsUz: "Ikkala tomonning argumentlarini tahlil qiling va o'z shaxsiy xulosangizni aniq dalillar bilan tasdiqlang."
    }
  },

  speaking: {
    examinerName: "Dr. Alistair Finch (AI Certified Examiner)",
    parts: [
      {
        partNumber: 1,
        title: "Part 1: Introduction & General Questions",
        questions: [
          "Let's talk about your hometown. Where are you from, and what do you like most about living there?",
          "Do you prefer studying in the morning or in the evening? Why?",
          "How often do you read books or news articles in English?"
        ]
      },
      {
        partNumber: 2,
        title: "Part 2: Cue Card (Long Turn)",
        cueCard: {
          topic: "Describe an ambition or personal goal that you have had for a long time.",
          prompts: [
            "What the ambition is",
            "When and why you first formulated this goal",
            "What steps you have taken to achieve it",
            "And explain how you will feel once you successfully accomplish it."
          ],
          prepTimeSeconds: 60,
          speakTimeMinutes: 2
        }
      },
      {
        partNumber: 3,
        title: "Part 3: Two-way Discussion (Abstract & Analytical)",
        questions: [
          "In what ways have career aspirations among young people changed compared to past generations?",
          "Do you think societal pressure drives people to pursue goals they do not truly desire?",
          "How critical is government support in encouraging innovation and entrepreneurship?"
        ]
      }
    ]
  }
};
