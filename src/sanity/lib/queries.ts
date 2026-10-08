import { defineQuery } from "next-sanity";

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]{
  brand, eyebrow, heroTitle, heroAccent, heroSubtitle, combosTitle, combosLead, realJazz,
  samplesTitle, samplesLead, bookingTitle, bookingLead, footerText
}`);

export const combosQuery = defineQuery(`*[_type == "combo"]|order(order asc){
  _id, title, subtitle, instruments[]{label, icon, lead, ghost, alternateLabel}
}`);

export const trackGroupsQuery = defineQuery(`*[_type == "trackGroup"]|order(order asc){
  _id, style, songs[]{title, file}
}`);

export const personnelQuery = defineQuery(`*[_type == "personnel"][0]{
  title, subtitle, "photoUrl": photo.asset->url, sax, piano, bass, drums, guitar, note
}`);

export const bookingQuery = defineQuery(`*[_type == "bookingSettings"][0]{
  email, phone, intro, bandOptions
}`);
