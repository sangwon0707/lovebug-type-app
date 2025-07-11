export const lovebugData = {
  questions: [
    { emoji: "🦋", typeMap: { choice1: "E", choice2: "I" } },  // 1번 질문 (E/I)
    { emoji: "🎉", typeMap: { choice1: "E", choice2: "I" } },  // 2번 질문 (E/I)
    { emoji: "👀", typeMap: { choice1: "E", choice2: "I" } },  // 3번 질문 (E/I)
    { emoji: "❤️", typeMap: { choice1: "N", choice2: "S" } },  // 4번 질문 (N/S)
    { emoji: "💖", typeMap: { choice1: "N", choice2: "S" } },  // 5번 질문 (N/S)
    { emoji: "💭", typeMap: { choice1: "N", choice2: "S" } },  // 6번 질문 (N/S)
    { emoji: "😭", typeMap: { choice1: "F", choice2: "T" } },  // 7번 질문 (F/T)
    { emoji: "😲", typeMap: { choice1: "F", choice2: "T" } },  // 8번 질문 (F/T)
    { emoji: "⚖️", typeMap: { choice1: "F", choice2: "T" } },  // 9번 질문 (F/T)
    { emoji: "🚨", typeMap: { choice1: "P", choice2: "J" } },  // 10번 질문 (P/J)
    { emoji: "🎯", typeMap: { choice1: "P", choice2: "J" } },  // 11번 질문 (P/J)
    { emoji: "💅", typeMap: { choice1: "P", choice2: "J" } }   // 12번 질문 (P/J)
  ],
  results: {
    INFP: { compatibility: { best: ["ENFP"], worst: ["ISTJ"] } },
    ENFP: { compatibility: { best: ["INFJ"], worst: ["ISTP"] } },
    INTJ: { compatibility: { best: ["ENTP"], worst: ["ISFP"] } },
    ENTP: { compatibility: { best: ["INTJ"], worst: ["ISFJ"] } },
    INFJ: { compatibility: { best: ["ENFP"], worst: ["ESTP"] } },
    ISFP: { compatibility: { best: ["ENFJ"], worst: ["INTJ"] } },
    ISTJ: { compatibility: { best: ["ESFP"], worst: ["INFP"] } },
    ISFJ: { compatibility: { best: ["ESTP"], worst: ["INTP"] } },
    ESTP: { compatibility: { best: ["ISFJ"], worst: ["INFJ"] } },
    ESFP: { compatibility: { best: ["ISTJ"], worst: ["INFP"] } },
    ESTJ: { compatibility: { best: ["INTP"], worst: ["INFP"] } },
    ESFJ: { compatibility: { best: ["ISTP"], worst: ["INTP"] } },
    ENFJ: { compatibility: { best: ["ISFP"], worst: ["ISTP"] } },
    INTP: { compatibility: { best: ["ESTJ"], worst: ["ISFJ"] } },
    ENTJ: { compatibility: { best: ["INFP"], worst: ["ISFP"] } },
    ISTP: { compatibility: { best: ["ESFJ"], worst: ["ENFP"] } },
  },
};

export const mbtiImageMap: Record<LovebugType, string> = {
  "ISFJ": "lovebug-mbti-01",
  "ESFP": "lovebug-mbti-02",
  "ISTJ": "lovebug-mbti-03",
  "ENFP": "lovebug-mbti-04",
  "ENFJ": "lovebug-mbti-05",
  "ESFJ": "lovebug-mbti-06",
  "INFJ": "lovebug-mbti-07",
  "INTJ": "lovebug-mbti-08",
  "ISFP": "lovebug-mbti-09",
  "ESTP": "lovebug-mbti-10",
  "INFP": "lovebug-mbti-11",
  "ENTP": "lovebug-mbti-12",
  "ISTP": "lovebug-mbti-13",
  "ENTJ": "lovebug-mbti-14",
  "INTP": "lovebug-mbti-15",
  "ESTJ": "lovebug-mbti-16",
};

export type LovebugType = keyof typeof lovebugData.results;