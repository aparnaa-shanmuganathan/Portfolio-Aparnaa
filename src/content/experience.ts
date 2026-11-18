export type Experience = {
  org: string;
  role: string;
  period: string;
  bullets: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    org: "Tata Elxsi",
    role: "AI Intern / ML & Gen AI Trainee",
    period: "Feb – Apr 2026",
    bullets: [
      "Worked on conversational AI systems, including Indic-language speech recognition (ASR) and text-to-speech (TTS).",
      "Optimized LLMs for efficient inference and deployment.",
      "Delivered work through Agile and SDLC workflows alongside engineering teams.",
    ],
    stack: ["Conversational AI", "ASR", "TTS", "LLM optimization", "Agile"],
  },
];

export const leadership = [
  { title: "IEEE CMRIT Student Branch", detail: "Membership Drive Chair" },
  { title: "CCA CMRIT", detail: "Sponsorship Head" },
  { title: "College basketball team", detail: "Team player" },
] as const;

export const certifications = [
  { name: "NLP", issuer: "NPTEL" },
  { name: "Mastering OpenCV with Python", issuer: "OpenCV University" },
  { name: "Fundamentals of OpenCV", issuer: "OpenCV University" },
] as const;
