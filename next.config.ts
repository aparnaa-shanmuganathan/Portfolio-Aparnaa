import type { NextConfig } from "next";

// No `output: "export"`: ISR (revalidate every 6h) needs Vercel's server runtime.
const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
};

export default config;
