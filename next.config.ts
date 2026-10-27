import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
