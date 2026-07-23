// EDIT THIS FILE to update your wedding website copy, pricing, images,
// packages, add-on menu, FAQs, and contact info.

export const weddingBrand = {
  name: "Basquin Vision Weddings",
  owner: "Junior Basquin",
  city: "South Florida",
  email: "weddings@basquinvision.com",
  phone: "(305) 555-0126",
  tagline: "Cinematic South Florida wedding films and photos for love stories with style.",
  heroImage: "/images/wedding-hero.png",
  // Short line shown near booking CTAs — update as your calendar changes.
  availability: "Now booking 2026 – 2027 weddings",
};

export const weddingStats = [
  { value: "4K", label: "wedding films" },
  { value: "48hr", label: "sneak peeks" },
  { value: "South Florida", label: "local + travel" },
  { value: "Photo + Video", label: "full coverage" },
];

export const weddingGallery = [
  {
    src: "/images/wedding-hero.png",
    title: "Golden hour portraits",
    type: "Editorial couple session",
  },
  {
    src: "/images/wedding-ceremony.png",
    title: "Ceremony coverage",
    type: "Vows / aisle / family moments",
  },
  {
    src: "/images/wedding-details.png",
    title: "Details that matter",
    type: "Rings / florals / invitations",
  },
];

export const weddingPackages = [
  {
    title: "Essentials",
    price: "$3,500",
    bestFor: "Elopements / intimate weddings",
    includes: ["4 hours coverage", "Edited highlight film", "Online gallery", "48-hour sneak peek"],
  },
  {
    title: "Signature",
    price: "$5,500",
    bestFor: "Full wedding day",
    badge: "Most booked",
    includes: ["8 hours photo + video", "Cinematic highlight film", "Edited photo gallery", "Drone add-on available"],
  },
  {
    title: "Luxury Story",
    price: "$12,000",
    bestFor: "Big weddings / destination",
    includes: ["Full-day coverage", "Second shooter option", "Trailer + full ceremony edit", "Private client delivery"],
  },
];

// Note shown under the packages grid.
export const weddingPackagesNote =
  "Every package includes a private online gallery. Travel available across South Florida, the Keys, and destination weddings.";

export const weddingAddOns = [
  {
    category: "Wall Art",
    items: [
      { name: "Gallery Canvas", price: "$150+", note: "Museum-style canvas prints for your home." },
      { name: "Framed Fine-Art Print", price: "$125+", note: "Premium framed portraits in black, white, or wood." },
      { name: "Acrylic Wall Print", price: "$250+", note: "Glossy luxury display with deep color and shine." },
    ],
  },
  {
    category: "Photo Products",
    items: [
      { name: "Wedding Album", price: "$450+", note: "Lay-flat heirloom album with edited story sequence." },
      { name: "Parent Album", price: "$250+", note: "Smaller album for parents or close family." },
      { name: "Print Box", price: "$175+", note: "Keepsake box with selected 4x6 or 5x7 prints." },
      { name: "Thank You Cards", price: "$95+", note: "Custom cards using your favorite wedding photo." },
    ],
  },
  {
    category: "Video Add-ons",
    items: [
      { name: "Same-Day Teaser", price: "$350+", note: "Short teaser delivered fast for social media." },
      { name: "Full Ceremony Edit", price: "$500+", note: "Clean multi-angle ceremony film with audio." },
      { name: "Raw Footage Drive", price: "$300+", note: "Delivered archive of usable wedding-day footage." },
      { name: "Drone Coverage", price: "$250+", note: "Venue, beach, estate, or city aerial shots where allowed." },
    ],
  },
  {
    category: "Extra Coverage",
    items: [
      { name: "Engagement Session", price: "$400+", note: "Pre-wedding portraits for invites and save-the-dates." },
      { name: "Extra Hour", price: "$250/hr", note: "Add more time for prep, reception, or after-party." },
      { name: "Second Shooter", price: "$600+", note: "More angles, more candids, more guest coverage." },
      { name: "Rehearsal Dinner", price: "$750+", note: "Coverage for speeches, family, and welcome moments." },
    ],
  },
  {
    category: "Digital Delivery",
    items: [
      { name: "Private Online Gallery", price: "Included", note: "Password-ready gallery for viewing and sharing." },
      { name: "Rush Delivery", price: "$300+", note: "Move your final gallery or film higher in the queue." },
      { name: "Social Media Pack", price: "$200+", note: "Vertical clips, story crops, and highlight selects." },
    ],
  },
];

export const weddingProcess = [
  { title: "Inquiry", note: "Send your date, venue, and vibe — we confirm availability fast." },
  { title: "Creative call", note: "A relaxed call to plan coverage, style, must-have moments, and timeline." },
  { title: "Wedding-day coverage", note: "Calm, guided, and unobtrusive — we capture it like a film crew, not a distraction." },
  { title: "Sneak peek", note: "A first look at selects within 48 hours, ready to share." },
  { title: "Final delivery", note: "Your private gallery and final film, plus albums and prints if ordered." },
];

export const weddingTestimonials = [
  {
    quote: "The film felt like a movie. We watched it with our family and everybody cried.",
    name: "Bride & Groom",
  },
  {
    quote: "Professional, calm, and creative. The photos looked expensive in the best way.",
    name: "South Florida Couple",
  },
];

// Questions couples ask before booking — also published as FAQ schema for SEO.
export const weddingFaqs = [
  {
    question: "Do you cover weddings outside South Florida?",
    answer:
      "Yes. We are based in South Florida and cover Miami, Fort Lauderdale, West Palm Beach, Broward, Palm Beach, and the Florida Keys — and we travel for destination weddings.",
  },
  {
    question: "Do you offer photo and video together?",
    answer:
      "Yes, full photo + video coverage is our specialty, so your gallery and film match in style. Photo-only or video-only coverage is also available on request.",
  },
  {
    question: "How fast do we get our photos and film?",
    answer:
      "You get a sneak peek within 48 hours. Full galleries and films follow after editing, and rush delivery is available if you want everything sooner.",
  },
  {
    question: "How do we hold our date?",
    answer:
      "Send an inquiry with your date and venue. After a quick creative call, a signed agreement and retainer lock in your date on our calendar.",
  },
  {
    question: "Can we add albums, canvases, or drone coverage later?",
    answer:
      "Yes. Albums, wall art, drone coverage, extra hours, and social media packs can be added to any package before or after the wedding.",
  },
];

// Dropdown + quick-pick options used by the inquiry form.
export const weddingGuestCounts = ["Under 50", "50 – 100", "100 – 150", "150+"];

export const weddingAddOnPicks = [
  "Drone coverage",
  "Wedding album",
  "Canvas / wall art",
  "Second shooter",
  "Engagement session",
  "Raw footage",
  "Social media pack",
  "Rush delivery",
];

// Short reassurance steps shown beside the inquiry form.
export const weddingInquirySteps = [
  "We reply with availability for your date.",
  "We hop on a relaxed creative call.",
  "Your date is locked in — we handle the rest.",
];
