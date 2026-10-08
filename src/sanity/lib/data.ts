import { hasSanityConfig } from "../env";
import { client } from "./client";
import { siteSettingsQuery, combosQuery, trackGroupsQuery, personnelQuery, bookingQuery } from "./queries";
import { defaultSite, defaultCombos, defaultTracks, defaultPersonnel, defaultBooking } from "@/lib/default-content";

async function safeFetch<T>(query: string, fallback: T): Promise<T> {
  if (!hasSanityConfig) return fallback;
  try {
    const data = await client.fetch<T>(query, {}, { next: { revalidate: 60 } });
    return (data ?? fallback) as T;
  } catch {
    return fallback;
  }
}

export const getSiteSettings = () => safeFetch(siteSettingsQuery, defaultSite);
export const getCombos = () => safeFetch(combosQuery, defaultCombos);
export const getTrackGroups = () => safeFetch(trackGroupsQuery, defaultTracks);
export const getPersonnel = () => safeFetch(personnelQuery, defaultPersonnel);
export const getBooking = () => safeFetch(bookingQuery, defaultBooking);
