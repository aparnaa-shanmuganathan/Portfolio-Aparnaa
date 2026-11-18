export const github = {
  username: "aparnaa-shanmuganathan",
  /** Repos hidden from the "More on GitHub" list (case-insensitive). Featured project repos are hidden automatically. */
  exclude: ["aparnaa-shanmuganathan", "skills-introduction-to-github", "hello-maven", "introduction-to-github"],
  /**
   * Short descriptions for repos with no GitHub description (keys are lowercase repo names).
   * A description set on GitHub itself always wins, so you can also just fill it in there.
   */
  descriptions: {
    "gtd-platform": "A Java platform for managing tasks in a Getting Things Done style.",
    "people-counter": "Counts people entering and leaving a scene from camera video.",
    "sml-lab": "Statistical machine learning lab work and experiments in notebooks.",
    "indic-voice-ai-assistant-main": "A voice assistant that understands and speaks Indian languages.",
    "road-network-platform": "Python tooling for analysing and working with road network data.",
    "machine-learning-lab": "Machine learning lab exercises and experiments in notebooks.",
    "asr_tts": "Experiments with speech recognition and text-to-speech models.",
    "deep-learning": "Deep learning coursework and experiments in notebooks.",
    "internship-task-tracker": "A TypeScript app for tracking tasks during an internship.",
    "prompt-engineering-sdlc": "Prompt engineering techniques applied across the software development lifecycle.",
    "portfolio-aparnaa": "The source code of this portfolio website.",
    "automated-attendance": "Automatic attendance marking from camera feeds using face recognition.",
    "object-identification-using-yolo": "Detecting and identifying objects in images with YOLO.",
    "ai-driven-smart-agriculture-assistant": "An AI assistant that helps farmers with crop and farming decisions.",
    "nlq-driven-smart-table-selector": "Picks the right database tables for a question asked in natural language.",
  } as Record<string, string>,
  /** Max repos in "More on GitHub". */
  moreLimit: 9,
} as const;
