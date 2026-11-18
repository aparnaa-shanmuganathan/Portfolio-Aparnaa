/**
 * Core personal details. Replace every value marked TODO before deploying.
 */
export const profile = {
  name: "Aparnaa A S",
  role: "ML / AI Engineer",
  tagline:
    "I build computer vision, NLP and LLM systems, from RAG apps to real-time models running on edge hardware.",
  location: "Bengaluru, India",
  /** TODO: set the real URL, e.g. https://aparnaa-shanmuganathan.vercel.app */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aparnaa-shanmuganathan.vercel.app",
  /** TODO: replace with your real email. */
  email: "aparnaa.cas55@gmail.com",
  summary: [
    "I'm a Computer Science (Data Science) undergraduate at CMR Institute of Technology, Bengaluru, focused on machine learning and applied AI: computer vision, NLP, LLMs and retrieval-augmented generation.",
    "I like taking models out of notebooks and onto real hardware, from a Jetson Nano reading RTSP camera streams to voice assistants that run in 8 GB of VRAM. Most recently I worked on conversational AI and Indic speech at Tata Elxsi.",
  ],
  education: {
    school: "CMR Institute of Technology, Bengaluru",
    degree: "B.E. Computer Science (Data Science)",
    /** TODO: your graduation year, e.g. "2027" */
    graduating: "2027",
  },
  availability: "Open to AI / ML internships and graduate roles",
} as const;

export const links = {
  github: "https://github.com/aparnaa-shanmuganathan",
  /** TODO: your LinkedIn profile URL */
  linkedin: "https://www.linkedin.com/in/aparnaa-a-s/",
  /** Drop your PDF at public/resume.pdf */
  resume: "/resume.pdf",
} as const;
