export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  linkedin: string;
  image: string;
}

export interface GlobalLink {
  key: string;
  url: string;
  icon: string;
  color: string;
}

export const globalLinks: GlobalLink[] = [
  {
    key: "homepage_it",
    url: "https://www.morfeushub.com/it",
    icon: "solar:home-2-linear",
    color: "from-indigo-500 to-blue-600",
  },
  {
    key: "homepage_en",
    url: "https://www.morfeushub.com/en",
    icon: "solar:global-linear",
    color: "from-blue-600 to-cyan-600",
  },
  {
    key: "ai_espresso",
    url: "https://matteoarnaboldi.substack.com/",
    icon: "solar:letter-linear",
    color: "from-orange-500 to-red-600",
  },
  {
    key: "linkedin",
    url: "https://www.linkedin.com/company/morfeus-hub-ai/",
    icon: "simple-icons:linkedin",
    color: "from-blue-700 to-indigo-800",
  },
  {
    key: "youtube",
    url: "https://www.youtube.com/@MorfeusHub",
    icon: "simple-icons:youtube",
    color: "from-red-600 to-rose-700",
  },
];

export const teamMembers: Record<string, TeamMember> = {
  matteo: {
    slug: "matteo",
    name: "Matteo Arnaboldi",
    role: "CEO / Founder",
    email: "matteo@morfeushub.com",
    phone: "+393388368457",
    linkedin: "https://www.linkedin.com/in/matteo-arnaboldi/",
    image: "/profile pic/Profile Matt.png",
  },
  alex: {
    slug: "alex",
    name: "Alex Carofiglio",
    role: "CTO / Founder",
    email: "alex@morfeushub.com",
    phone: "+393520797697",
    linkedin: "https://www.linkedin.com/in/alex-carofiglio-aa4788186/",
    image: "/profile pic/Profile-alex.jpg",
  },
  simone: {
    slug: "simone",
    name: "Simone Zin",
    role: "COO / Founder",
    email: "simone@morfeushub.com",
    phone: "+393289245012",
    linkedin: "https://www.linkedin.com/in/simone-zin-9b745b210/",
    image: "/profile pic/Profile-Simo.jpg",
  },
};
