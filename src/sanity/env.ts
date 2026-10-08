export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.SANITY_API_VERSION || "2026-05-15";

export const hasSanityConfig = Boolean(projectId && dataset);
