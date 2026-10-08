import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
  stega: process.env.NODE_ENV === "development" && Boolean(process.env.NEXT_PUBLIC_SANITY_STUDIO_URL)
    ? { studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL }
    : false,
});
