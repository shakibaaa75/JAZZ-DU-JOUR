export type Instrument = { label: string; icon: string; lead?: boolean; ghost?: boolean; alternateLabel?: string };
export type Combo = { _id?: string; title: string; subtitle: string; instruments: Instrument[] };
export type TrackGroup = { _id?: string; style: string; songs: { title: string; file: string }[] };

export const defaultSite = {
  brand: "JAZZ DU JOUR",
  eyebrow: "Live Jazz for Any Occasion in the Sacramento & Yolo County Area",
  heroTitle: "JAZZ",
  heroAccent: "DU",
  heroSubtitle: "Jazz Combos",
  combosTitle: "The Combos",
  combosLead: "We can play it hot, we can play it cool, we can play it featured, we can play it as background, we can play it slow, we can play it fast, we can play it any way you want it.",
  realJazz: 'But this is “real jazz,” not Dixieland and not “smooth jazz.”',
  samplesTitle: "Music Samples",
  samplesLead: "We play all standard jazz styles. Click any song title to hear a brief sample.",
  bookingTitle: "Book the Band",
  bookingLead: "To discuss booking the band in the Sacramento & Yolo County Area, contact Michael Motley — or send us a few details.",
  footerText: "by Michael Motley, Ph.D. All Rights Reserved."
};

const sax = "sax", bass = "bass", drums = "drums", piano = "piano", guitar = "guitar", rec = "rec";
export const defaultCombos: Combo[] = [
  { _id: "quartet", title: "Jazz Quartet", subtitle: "Sax, Bass, Drums & Piano or Guitar", instruments: [
    { label: "Sax", icon: sax, lead: true }, { label: "Bass", icon: bass }, { label: "Drums", icon: drums }, { label: "Piano or Guitar", icon: piano, alternateLabel: guitar }
  ]},
  { _id: "trio", title: "Jazz Trio", subtitle: "Sax, Bass & Piano or Guitar", instruments: [
    { label: "Sax", icon: sax, lead: true }, { label: "Bass", icon: bass }, { label: "Piano or Guitar", icon: piano, alternateLabel: guitar }
  ]},
  { _id: "duo", title: "Jazz Duo", subtitle: "Sax & Piano or Guitar", instruments: [
    { label: "Sax", icon: sax, lead: true }, { label: "Piano or Guitar", icon: piano, alternateLabel: guitar }
  ]},
  { _id: "solo", title: "Solo Sax", subtitle: "With Pre-Recorded Rhythm Section", instruments: [
    { label: "Sax", icon: sax, lead: true }, { label: "Pre-recorded rhythm section", icon: rec, ghost: true }
  ]}
];

export const defaultTracks: TrackGroup[] = [
  { style: "Older Jazz Standards", songs: [
    { title: "Satin Doll", file: "/audio/satin-doll.wav" },
    { title: "Take the “A” Train", file: "/audio/take-the-a-train.wav" },
    { title: "On Green Dolphin St.", file: "/audio/on-green-dolphin-st.wav" }
  ]},
  { style: "Newer Jazz Standards", songs: [
    { title: "Straight No Chaser", file: "/audio/straight-no-chaser.wav" }, { title: "Footprints", file: "/audio/footprints.wav" },
    { title: "Four", file: "/audio/four.wav" }, { title: "Sugar", file: "/audio/sugar.wav" }
  ]},
  { style: "Jazz Blues", songs: [
    { title: "All Blues", file: "/audio/all-blues.wav" }, { title: "Tenor Madness", file: "/audio/tenor-madness.wav" },
    { title: "Freedom Jazz Dance", file: "/audio/freedom-jazz-dance.wav" }, { title: "Sandu", file: "/audio/sandu.wav" }, { title: "Vierd Blues", file: "/audio/vierd-blues.wav" }
  ]},
  { style: "Ballads", songs: [
    { title: "Misty", file: "/audio/misty.wav" }, { title: "Georgia on My Mind", file: "/audio/georgia-on-my-mind.wav" },
    { title: "Lover Man", file: "/audio/lover-man.wav" }, { title: "Body & Soul", file: "/audio/body-and-soul.wav" }, { title: "’Round Midnight", file: "/audio/round-midnight.wav" }
  ]},
  { style: "Bossas & Latin", songs: [
    { title: "Girl from Ipanema", file: "/audio/girl-from-ipanema.wav" }, { title: "Black Orpheus", file: "/audio/black-orpheus.wav" },
    { title: "Wave", file: "/audio/wave.wav" }, { title: "Blue Bossa", file: "/audio/blue-bossa.wav" }
  ]},
  { style: "Funky Jazz", songs: [
    { title: "Night Train", file: "/audio/night-train.wav" }, { title: "Comin’ Home Baby", file: "/audio/comin-home-baby.wav" },
    { title: "Mercy Mercy", file: "/audio/mercy-mercy.wav" }, { title: "Watermelon Man", file: "/audio/watermelon-man.wav" }
  ]}
];

export const defaultPersonnel = {
  title: "Typical Personnel", subtitle: "Michael Motley — Saxophone", photo: "/images/image (2).png",
  sax: "Michael Motley", piano: "Doug Mattson, Aaron Garner", bass: "Jim Mazzaferro, Al Bent",
  drums: "J. J. Funderburk, Jay Roberts", guitar: "Greg Perkins, Doug Pauley",
  note: "Samples feature Motley on sax with various rhythm section personnel."
};

export const defaultBooking = {
  email: process.env.NEXT_PUBLIC_BOOKING_EMAIL || "mtmotley@ucdavis.edu",
  phone: process.env.NEXT_PUBLIC_BOOKING_PHONE || "530-304-6462",
  intro: "Send a booking request",
  bandOptions: ["Not sure yet", "Jazz Quartet", "Jazz Trio", "Jazz Duo", "Solo Sax"]
};
