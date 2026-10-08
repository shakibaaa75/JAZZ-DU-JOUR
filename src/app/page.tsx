import JazzSite from "@/components/JazzSite";
import { getBooking, getCombos, getPersonnel, getSiteSettings, getTrackGroups } from "@/sanity/lib/data";

export default async function Home() {
  const [site, combos, tracks, personnel, booking] = await Promise.all([
    getSiteSettings(), getCombos(), getTrackGroups(), getPersonnel(), getBooking(),
  ]);
  return <JazzSite site={site} combos={combos} tracks={tracks} personnel={personnel} booking={booking} />;
}
