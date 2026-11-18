export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "ML / AI", items: ["Computer Vision", "NLP", "LLMs", "RAG", "ASR / TTS"] },
  { label: "Languages", items: ["Python", "SQL", "Dart"] },
  { label: "Frameworks & Tools", items: ["LangChain", "FAISS", "OpenCV", "Streamlit", "Ollama", "Flutter"] },
  { label: "Edge & Embedded", items: ["Jetson Nano", "ESP32", "MicroPython", "RTSP"] },
  { label: "Practices", items: ["Agile / SDLC", "Git", "MySQL"] },
];
