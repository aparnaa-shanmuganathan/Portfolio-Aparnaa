/* Types ------------------------------------------------------------------------------------------ */

export type Media = { src: string; alt: string; width: number; height: number };

export type VideoDemo = {
  type: "video";
  /** Files live in /public/demos/<slug>/. Provide WebM and/or MP4 (MP4 H.264 is the safe baseline). */
  sources: { src: string; type: "video/mp4" | "video/webm" }[];
  poster: Media;
  /** WebVTT caption tracks, e.g. { src: "/demos/x/captions.en.vtt", srclang: "en", label: "English" } */
  captions?: { src: string; srclang: string; label: string }[];
};

export type LiveDemo = {
  type: "live";
  /** Embeddable URL, e.g. https://<user>-<space>.hf.space or https://<app>.streamlit.app/?embed=true */
  url: string;
  /** Shown if the app is asleep or unreachable. */
  fallback?: VideoDemo;
};

export type FlowStep = {
  id: string;
  label: string;
  sub?: string;
  description: string;
  /** Optional screenshot or short clip for this stage. */
  media?: { kind: "image"; image: Media } | { kind: "video"; video: VideoDemo };
};

export type WalkthroughDemo = { type: "walkthrough"; steps: FlowStep[] };

export type Demo = VideoDemo | LiveDemo | WalkthroughDemo;

export type Project = {
  slug: string;
  title: string;
  /** One-line problem statement. */
  problem: string;
  /** What you built. */
  built: string;
  stack: string[];
  /** A headline number or result, if you have one. */
  metric?: { value: string; label: string };
  /** GitHub repo name under github.config.ts `username`. Omit if the project has no public repo. */
  repo?: string;
  /** In-site demo shown on the card and detail page. */
  demo?: Demo;
  /** Static architecture diagram (left to right). Not needed when `demo` is a walkthrough. */
  architecture?: { id: string; label: string; sub?: string }[];
  /** Your role / contribution. */
  role?: string;
  highlights?: string[];
  challenges?: { challenge: string; solution: string }[];
  results?: string[];
  /** Placeholder replacement for projects without a demo video. */
  image?: Media;
  featured: boolean;
};

/* Content ---------------------------------------------------------------------------------------- */

/** Featured projects first, in display order. */
export const projects: Project[] = [
  {
    slug: "research-paper-assistant",
    title: "AI Research Paper Assistant",
    problem: "Reading and cross-referencing many research papers is slow.",
    built:
      "A multi-PDF retrieval-augmented generation app. Upload papers, ask questions, and get answers grounded in the source text.",
    stack: ["Streamlit", "LangChain", "FAISS", "Gemini", "Python"],
    repo: "research-paper-assistant-main",
    architecture: [
      { id: "pdf", label: "PDFs", sub: "Uploaded papers" },
      { id: "chunk", label: "Chunk + embed", sub: "LangChain" },
      { id: "index", label: "FAISS index", sub: "Vector search" },
      { id: "llm", label: "Gemini", sub: "Answer from retrieved context" },
      { id: "ui", label: "Streamlit UI", sub: "Question and answer" },
    ],
    // Add once deployed, e.g. Hugging Face Spaces (see README for why that's the best free host):
    // demo: { type: "live", url: "https://<user>-<space>.hf.space", fallback: { type: "video", ... } },
    image: { src: "/projects/research-paper-assistant.svg", alt: "Illustration: PDFs flow into a FAISS index and Gemini, which answers questions with sources", width: 1600, height: 900 },
    featured: true,
  },
  {
    slug: "edge-entry-exit-tracker",
    title: "Edge People Entry/Exit Tracker",
    problem: "Knowing who is in a building right now, without sending raw video to the cloud.",
    built:
      "Real-time face recognition on RTSP camera streams, running locally on a Jetson Nano. Entry and exit events sync to a cloud dashboard with Google sign-in, an “inside now” list and an admin registration page.",
    stack: ["Jetson Nano", "Python", "OpenCV", "RTSP", "Face Recognition", "Cloud Dashboard"],
    repo: "jetson-nano-remote-access",
    demo: {
      type: "walkthrough",
      steps: [
        {
          id: "camera",
          label: "Camera",
          sub: "RTSP stream",
          description: "IP cameras publish an RTSP video stream that the edge device reads continuously.",
        },
        {
          id: "edge",
          label: "Jetson Nano",
          sub: "On-device recognition",
          description:
            "Faces are detected and matched locally on the Jetson Nano, so raw video never leaves the premises. Only entry and exit events are sent onward.",
        },
        {
          id: "cloud",
          label: "Cloud dashboard",
          sub: "Events and admin",
          description:
            "Events land in a cloud dashboard with Google sign-in, an “inside now” list, and an admin page for registering people.",
          // media: { kind: "image", image: { src: "/demos/edge-entry-exit-tracker/dashboard.png", alt: "Dashboard showing the inside-now list", width: 1600, height: 900 } },
        },
      ],
    },
    featured: true,
  },
  {
    slug: "voice-chatbot",
    title: "Conversational Voice Chatbot",
    problem: "Voice assistants for Indian languages usually need large GPUs or paid APIs.",
    built:
      "A fully open-source pipeline: ASR, a local LLM via Ollama, and switchable TTS (Kokoro or Indic Parler-TTS). Supports English and Indic languages with streaming responses.",
    stack: ["ASR", "Ollama", "Kokoro", "Indic Parler-TTS", "Streaming", "Python"],
    metric: { value: "≤ 8 GB", label: "VRAM needed" },
    repo: "voice-chatbot", // TODO: confirm. "indic-voice-ai-assistant-main" may be the right repo instead.
    architecture: [
      { id: "mic", label: "Microphone", sub: "Speech in" },
      { id: "asr", label: "ASR", sub: "Speech to text" },
      { id: "llm", label: "Local LLM", sub: "Ollama" },
      { id: "tts", label: "TTS", sub: "Kokoro or Indic Parler-TTS" },
      { id: "out", label: "Speaker", sub: "Streamed audio" },
    ],
    image: { src: "/projects/voice-chatbot.svg", alt: "Illustration: voice chatbot pipeline from microphone to ASR, local LLM and text to speech", width: 1600, height: 900 },
    featured: true,
  },
  {
    slug: "indic-to-indic-llm",
    title: "Indic-to-Indic LLM",
    problem: "Most LLMs handle Indian languages by translating through English, losing nuance.",
    built:
      "Trained an LLM to process Indian languages directly (for example Kannada) without pivoting through English.",
    stack: ["LLM", "Fine-tuning", "NLP", "Python"],
    image: { src: "/projects/indic-to-indic-llm.svg", alt: "Illustration: an LLM translating directly between Indian languages without an English pivot", width: 1600, height: 900 },
    featured: true,
  },
  {
    slug: "face-attendance",
    title: "Facial Recognition Attendance System",
    problem: "Manual attendance is slow and easy to fake.",
    built: "A face-recognition system that marks attendance automatically from a camera feed.",
    stack: ["Python", "OpenCV", "Face Recognition"],
    metric: { value: "95%+", label: "recognition accuracy" },
    // repo: "Automated-Attendance", // TODO: uncomment if this is the right repo
    demo: {
      type: "walkthrough",
      steps: [
        { id: "capture", label: "Camera", sub: "Live frames", description: "Frames are captured from the camera feed." },
        { id: "recognise", label: "Face recognition", sub: "Detect and match", description: "Faces are detected and matched against enrolled people." },
        { id: "record", label: "Attendance record", sub: "Marked automatically", description: "Recognised people are marked present without manual roll calls." },
      ],
    },
    featured: true,
  },
  {
    slug: "churn-analysis",
    title: "Customer Churn Analysis",
    problem: "Businesses lose revenue when they can't see which customers are about to leave.",
    built: "Exploratory analysis and predictive modelling to identify the drivers of customer churn.",
    stack: ["Python", "Pandas", "scikit-learn"],
    repo: "churn-analysis",
    image: { src: "/projects/churn-analysis.svg", alt: "Illustration: churn rate by tenure and feature importance charts", width: 1600, height: 900 },
    featured: true,
  },
  {
    slug: "esp32-staircase-lighting",
    title: "Automatic Staircase Lighting",
    problem: "Dark stairs are a hazard, and wall switches are never where you need them.",
    built: "Motion-triggered lighting that follows you up and down the stairs.",
    stack: ["ESP32", "MicroPython"],
    demo: {
      type: "walkthrough",
      steps: [
        { id: "sense", label: "Sensing", sub: "Detect a person", description: "Sensors at the stairs detect when someone approaches." },
        { id: "esp32", label: "ESP32", sub: "MicroPython logic", description: "The ESP32 decides which steps to light and when to switch them off." },
        { id: "lights", label: "Lighting", sub: "Step by step", description: "Lights switch on along the stairs as you move." },
      ],
    },
    featured: false,
  },
  {
    slug: "billing-system",
    title: "Billing System",
    problem: "Small shops need quick billing without paper records.",
    built: "A desktop billing application with persistent storage.",
    stack: ["Python", "MySQL", "Tkinter"],
    repo: "Billing-System-with-MySQL-and-Tkinter",
    image: { src: "/projects/billing-system.svg", alt: "Illustration: a billing window with an item list and total, connected to a MySQL database", width: 1600, height: 900 },
    featured: false,
  },
  {
    slug: "jigsaw-solver",
    title: "Jigsaw Puzzle Solver",
    problem: "Solving a jigsaw is a search problem a computer can do from the images alone.",
    built: "Reassembles shuffled puzzle pieces using image processing.",
    stack: ["Python", "OpenCV"],
    image: { src: "/projects/jigsaw-solver.svg", alt: "Illustration: shuffled puzzle pieces reassembled into the correct grid", width: 1600, height: 900 },
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const smallProjects = projects.filter((p) => !p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
