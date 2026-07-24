// Client gallery + product settings.
// Replace the sample gallery images with real client folders once cloud storage is connected.

export const galleryAccessCodes = ["BASQUIN", "CLIENT2026", "JRPHOTO"];

export const clientGalleries = [
  {
    id: "sample-event",
    title: "Sample Event Gallery",
    client: "Private Event Client",
    date: "South Florida · 2026",
    status: "Proofs ready",
    cover: "/images/wedding-ceremony.png",
    accessCode: "BASQUIN",
    note: "Use this as the example layout for birthdays, showers, parties, and business events.",
    photos: [
      { src: "/images/wedding-ceremony.png", title: "Ceremony Moment", tag: "Favorite" },
      { src: "/images/wedding-details.png", title: "Detail Shot", tag: "Print ready" },
      { src: "/images/wedding-hero.png", title: "Hero Portrait", tag: "Download" },
      { src: "/images/flip-it-diner.png", title: "Night Still", tag: "Cinematic" },
      { src: "/images/flip-it-bts.png", title: "Behind the Scenes", tag: "Social" },
      { src: "/images/flip-it-hero.png", title: "Street Frame", tag: "Poster" },
    ],
  },
  {
    id: "portrait-proof",
    title: "Portrait Proof Gallery",
    client: "Portrait Session",
    date: "Miami · Proofing",
    status: "Select favorites",
    cover: "/images/flip-it-diner.png",
    accessCode: "JRPHOTO",
    note: "Clients can choose favorites, request retouching, and buy downloads or prints.",
    photos: [
      { src: "/images/flip-it-diner.png", title: "Portrait 01", tag: "Proof" },
      { src: "/images/flip-it-hero.png", title: "Portrait 02", tag: "Proof" },
      { src: "/images/flip-it-bts.png", title: "Portrait 03", tag: "Proof" },
    ],
  },
];

export const galleryProducts = [
  {
    title: "Single Digital Download",
    price: "$25",
    detail: "One high-resolution edited image delivered digitally.",
  },
  {
    title: "Full Gallery Download",
    price: "$199+",
    detail: "All approved edited images from the gallery.",
  },
  {
    title: "8x10 Print",
    price: "$35+",
    detail: "Professional photo print for portraits, family, or events.",
  },
  {
    title: "Canvas Wall Print",
    price: "$150+",
    detail: "Premium wall-ready canvas for favorite images.",
  },
];
