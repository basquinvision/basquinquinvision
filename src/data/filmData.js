// EDIT THIS FILE to update the main Basquin Vision site: brand copy, stats,
// services, featured work, packages, drops, form options, and social links.
// Components read from here, so most day-to-day edits happen in this file.

export const film = {
  title: "Future Film",
  tagline: "Coming soon.",
  description:
    "A future Basquin Vision film project will be added here when production begins.",
  genre: "TBD",
  runtime: "TBD",
  location: "South Florida",
  year: "Coming soon",
  heroImage: "/images/flip-it-hero.png",
  // REPLACE with your YouTube or Vimeo embed URL.
  trailerEmbedUrl: "",
  contactEmail: "flipitfilm@example.com",
};

// EDIT these brand details for your full media company / creator website.
export const brand = {
  name: "Basquin Vision",
  founder: "Junior Basquin",
  tagline: "Clean photos, cinematic video, and simple booking for South Florida events.",
  description:
    "Basquin Vision helps regular people, artists, couples, and brands get sharp event photos, promo videos, wedding visuals, and private galleries without making the process complicated.",
  city: "South Florida",
  email: "bookbasquinvision@example.com",
  // Short line shown near booking CTAs — update as your calendar changes.
  availability: "Now booking South Florida dates",
  // Shown next to the contact form.
  responseNote: "Most inquiries get a reply within 1–2 days.",
};

export const stats = [
  { value: "$150/hr", label: "photo coverage rate" },
  { value: "$1,200", label: "regular event photos" },
  { value: "48hr", label: "sneak peeks available" },
  { value: "Private", label: "client galleries" },
];

export const trustPoints = [
  "Clear prices before the shoot",
  "Edited delivery link for every client",
  "Photo, video, weddings, promos, and events",
  "Based in South Florida",
];

export const serviceAreas = [
  "Miami",
  "Fort Lauderdale",
  "West Palm Beach",
  "Broward",
  "Palm Beach",
  "Florida Keys",
];

// Add or remove tabs/cards here as your media world grows.
export const mediaTabs = [
  {
    title: "Films",
    label: "Short films / features / trailers",
    description: "Cinematic stories, festival-ready pages, trailers, posters, press kits, and behind-the-scenes archives.",
    image: "/images/flip-it-hero.png",
    href: "#work",
  },
  {
    title: "Photography",
    label: "Portraits / events / campaigns",
    description: "Urban portraits, artist shoots, brand photos, red carpet coverage, and stills that look like movie frames.",
    image: "/images/flip-it-diner.png",
    href: "#work",
  },
  {
    title: "Videos",
    label: "Music videos / reels / promos",
    description: "Fast-turnaround edits, cinematic social clips, promo reels, trailers, and full video packages.",
    image: "/images/flip-it-bts.png",
    href: "#promo",
  },
  {
    title: "Premium Drops",
    label: "Paywall / private links / client delivery",
    description: "Send clients protected video, photo galleries, downloads, exclusive cuts, and paid digital products.",
    image: "/images/flip-it-hero.png",
    href: "#drops",
  },
];

export const featuredProjects = [
  {
    title: "Cinematic Weddings",
    type: "Wedding photo + video",
    year: "South Florida",
    description: "Premium wedding films, photo galleries, albums, canvases, and private client delivery.",
    image: "/images/wedding-hero.png",
    // Optional: card becomes a link when href is set.
    href: "/#/weddings",
    cta: "Explore weddings",
  },
  {
    title: "Artist Promo Reel",
    type: "Music / social",
    year: "Coming soon",
    description: "Fast, stylish visuals for artists who need content that looks bigger than the budget.",
    image: "/images/flip-it-bts.png",
  },
  {
    title: "Night Still Sessions",
    type: "Photography",
    year: "South Florida",
    description: "Portraits and BTS stills with neon, street texture, and cinematic contrast.",
    image: "/images/flip-it-diner.png",
  },
];

// Each service: what it is + what the client walks away with.
export const services = [
  {
    title: "Event photography",
    description: "Birthdays, private events, business events, baby showers, launches, and celebrations.",
    deliverable: "Edited online gallery + download link",
  },
  {
    title: "Portrait sessions",
    description: "Clean pictures for your brand, graduation, couples, artists, family, or social media.",
    deliverable: "High-resolution edits + web copies",
  },
  {
    title: "Promo videos",
    description: "Short videos for artists, businesses, products, events, reels, and social campaigns.",
    deliverable: "Finished edit + vertical social cuts",
  },
  {
    title: "Wedding photo + video",
    description: "Wedding photo and film packages with albums, prints, canvases, and add-ons.",
    deliverable: "Wedding gallery + highlight film options",
  },
];

export const bookingPackages = [
  {
    title: "Quick Photos",
    price: "$450",
    timeline: "3 hours · photos only",
    bestFor: "Portraits, small parties, quick brand photos, or content days.",
    includes: ["Up to 3 hours of coverage", "Edited online gallery", "High-res downloads", "Basic color cleanup"],
  },
  {
    title: "Regular Event",
    price: "$1,200",
    timeline: "8 hours · photos only",
    badge: "Most booked",
    bestFor: "Most birthdays, showers, private events, and business events.",
    includes: ["Up to 8 hours of coverage", "Edited online gallery", "Sneak peeks available", "Private delivery link"],
  },
  {
    title: "Full Day Photos",
    price: "$1,800",
    timeline: "12 hours · photos only",
    bestFor: "Long events, multiple locations, and full-day coverage.",
    includes: ["Up to 12 hours of coverage", "Full-day edited gallery", "Sneak peeks available", "Travel/custom add-ons available"],
  },
];

export const addOns = [
  { title: "Promo video", price: "Quote", detail: "Add a short recap, reel, or campaign video." },
  { title: "Canvas prints", price: "$150+", detail: "Wall-ready canvas options for weddings and portraits." },
  { title: "Photo prints", price: "$40+", detail: "Small print sets, enlargements, and keepsakes." },
  { title: "Rush delivery", price: "Quote", detail: "Faster turnaround when the schedule allows." },
];

export const bookingSteps = [
  {
    title: "Send the date",
    description: "Tell me the event type, location, date, hours, and what you need delivered.",
  },
  {
    title: "Lock the package",
    description: "I confirm availability, recommend the right package, and give you a clear quote.",
  },
  {
    title: "Shoot + deliver",
    description: "I cover the event and send your edited gallery or video through a private link.",
  },
];

export const premiumDrops = [
  {
    title: "Client Photo Gallery",
    price: "$149+",
    description: "Private gallery delivery for portraits, events, BTS, and campaign stills.",
  },
  {
    title: "Video Promo Pack",
    price: "$299+",
    description: "A polished reel, vertical clips, thumbnails, and caption-ready exports.",
  },
  {
    title: "Exclusive Film Access",
    price: "$9+",
    description: "Password or paid access for trailers, screeners, bonus scenes, and press materials.",
  },
];

// Homepage banner that sends wedding couples to /weddings.
export const weddingPromo = {
  eyebrow: "Basquin Vision Weddings",
  title: "Getting married?",
  accent: "Love stories, shot like cinema.",
  description:
    "South Florida wedding photography and films — golden-hour portraits, 4K highlight films, albums, canvases, and private galleries.",
  image: "/images/wedding-hero.png",
  primaryCta: { label: "Explore wedding packages", href: "/#/weddings" },
  secondaryCta: { label: "Check your date", href: "/#/weddings#wedding-contact" },
};

// Options shown in the booking form dropdowns.
export const projectTypes = [
  "Regular event photos",
  "Quick photo session",
  "Full-day event photos",
  "Event coverage",
  "Promo video",
  "Wedding photo + video",
  "Portraits",
  "Other",
];

export const budgetRanges = ["$450 Quick Photos", "$1,200 Regular Event", "$1,800 Full Day Photos", "Wedding package", "Custom quote"];

// REPLACE names, roles, photos, and bios below.
export const people = [
  {
    role: "Director",
    name: "Director Name",
    photo: "/images/flip-it-hero.png",
    bio: "A filmmaker focused on tense, character-driven stories rooted in city life.",
  },
  {
    role: "Director of Photography",
    name: "Junior Basquin",
    photo: "/images/flip-it-bts.png",
    bio: "A cinematographer shaping natural light, urban texture, and bold cinematic frames.",
  },
  {
    role: "Producer",
    name: "Producer Name",
    photo: "/images/flip-it-diner.png",
    bio: "An independent producer committed to ambitious stories and resourceful productions.",
  },
  {
    role: "Lead Actor",
    name: "Actor Name",
    photo: "/images/flip-it-hero.png",
    bio: "A rising performer bringing restraint, urgency, and emotional weight to the lead role.",
  },
];

// REPLACE or add gallery image paths here.
export const gallery = [
  {
    src: "/images/flip-it-diner.png",
    alt: "A tense late-night conversation in a diner",
    label: "Scene 04 / The Offer",
  },
  {
    src: "/images/flip-it-hero.png",
    alt: "A character outside at night beside a car",
    label: "Scene 11 / The Choice",
  },
  {
    src: "/images/flip-it-bts.png",
    alt: "A film crew working at night",
    label: "Behind the Scenes",
  },
];

export const pressKit = [
  {
    title: "Official Poster",
    description: "High-resolution promotional artwork",
    href: "/press-kit/flip-it-poster.png",
  },
  {
    title: "Logline",
    description: "One-sentence film summary",
    href: "/press-kit/logline.txt",
  },
  {
    title: "Synopsis",
    description: "Short and extended film synopsis",
    href: "/press-kit/synopsis.txt",
  },
  {
    title: "Contact Sheet",
    description: "Production stills and image credits",
    href: "/press-kit/contact-sheet.txt",
  },
];

// REPLACE "#" with real social profile URLs.
export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Vimeo", href: "#" },
];
