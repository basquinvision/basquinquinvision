const siteUrl = "https://basquinvision.com";

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function setLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function setJsonLd(id, data) {
  let element = document.head.querySelector(`#${id}`);
  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

export function applySeo({ title, description, keywords, path = "/", image = "/images/flip-it-hero.png", schema, faqSchema }) {
  const url = `${siteUrl}${path}`;
  const imageUrl = `${siteUrl}${image}`;

  document.title = title;
  setMeta('meta[name="description"]', { name: "description", content: description });
  setMeta('meta[name="keywords"]', { name: "keywords", content: keywords.join(", ") });
  setMeta('meta[name="robots"]', { name: "robots", content: "index, follow" });
  setMeta('meta[name="author"]', { name: "author", content: "Junior Basquin, Basquin Vision" });

  setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "Basquin Vision" });
  setMeta('meta[property="og:title"]', { property: "og:title", content: title });
  setMeta('meta[property="og:description"]', { property: "og:description", content: description });
  setMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
  setMeta('meta[property="og:url"]', { property: "og:url", content: url });
  setMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
  setMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_US" });

  setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
  setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
  setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
  setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: imageUrl });

  setLink("canonical", url);

  if (schema) {
    setJsonLd("local-business-schema", schema);
  }

  if (faqSchema) {
    setJsonLd("faq-schema", faqSchema);
  }
}

// Builds schema.org FAQPage markup from [{ question, answer }] entries.
export function buildFaqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export const mainSeo = {
  title: "Basquin Vision | South Florida Event Photographer & Videographer",
  description:
    "Basquin Vision by Junior Basquin offers simple South Florida event photography, portraits, promo videos, music videos, wedding photo and video, and private galleries. Regular event photos start at $1,200.",
  keywords: [
    "Basquin Vision",
    "Junior Basquin",
    "South Florida photographer",
    "South Florida videographer",
    "South Florida event photographer",
    "South Florida event photography",
    "Miami photographer",
    "Miami videographer",
    "Miami music video director",
    "wedding videographer South Florida",
    "event photography South Florida",
    "promo video South Florida",
    "cinematic photography",
    "$1200 event photographer",
    "South Florida creative director",
  ],
  path: "/",
  image: "/images/flip-it-hero.png",
  schema: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Basquin Vision",
    founder: "Junior Basquin",
    description:
      "South Florida event photography, portrait, wedding, promo video, music video, and private gallery company.",
    areaServed: ["South Florida", "Miami", "Fort Lauderdale", "West Palm Beach"],
    url: siteUrl,
    email: "bookbasquinvision@example.com",
    image: `${siteUrl}/images/flip-it-hero.png`,
    sameAs: [],
    serviceType: [
      "Film production",
      "Wedding videography",
      "Photography",
      "Music videos",
      "Event coverage",
      "Promo videos",
    ],
    priceRange: "$450 – $1,800+",
  },
};

export const weddingSeo = {
  title: "Basquin Vision Weddings | South Florida Wedding Photo & Video",
  description:
    "Cinematic South Florida wedding photography and wedding videography by Basquin Vision. Wedding films, photo galleries, canvases, albums, prints, drone coverage, and private delivery.",
  keywords: [
    "South Florida wedding photographer",
    "South Florida wedding videographer",
    "Miami wedding photographer",
    "Miami wedding videographer",
    "Fort Lauderdale wedding photographer",
    "Palm Beach wedding videographer",
    "cinematic wedding film South Florida",
    "wedding photo and video South Florida",
    "wedding albums",
    "wedding canvas prints",
    "wedding drone coverage",
    "Basquin Vision Weddings",
    "Junior Basquin weddings",
  ],
  path: "/weddings",
  image: "/images/wedding-hero.png",
  schema: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Basquin Vision Weddings",
    founder: "Junior Basquin",
    description: "South Florida wedding photography and cinematic wedding videography.",
    areaServed: ["South Florida", "Miami", "Fort Lauderdale", "West Palm Beach", "Florida Keys"],
    url: `${siteUrl}/weddings`,
    email: "weddings@basquinvision.com",
    telephone: "(305) 555-0126",
    priceRange: "$3,500 – $12,000",
    image: `${siteUrl}/images/wedding-hero.png`,
    serviceType: [
      "Wedding photography",
      "Wedding videography",
      "Wedding films",
      "Wedding albums",
      "Canvas prints",
      "Drone wedding coverage",
    ],
  },
};
