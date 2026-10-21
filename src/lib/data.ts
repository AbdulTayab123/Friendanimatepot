// src/lib/data.ts
// Single source of truth. Every piece of data is sourced strictly from the résumé.

export interface Profile {
  name: string;
  firstName: string;
  role: string;
  headingRole: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeSummary: string;
  additionalSummary: string;
  quote: string;
  linkedin: string;
  github?: string; // Not present in résumé -> omitted per rule 1
  resumePath: string;
  idCard: {
    idNumber: string;
    department: string;
    validTill: string;
    degree: string;
    keyFocus: string;
    keyProjects: string;
    honours: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
}

export type SkillFamily = 'All' | 'Frontend' | 'Backend' | 'Practices' | 'Design' | 'Professional';

export interface Skill {
  atomicNumber: number;
  symbol: string;
  name: string;
  family: Exclude<SkillFamily, 'All'>;
  isBrand: boolean;
  logo?: string;
  conceptIcon?: string;
  description: string;
  projects: string[];
}

export interface Project {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string; // None in résumé
  mockupType: 'mobile-app' | 'database' | 'terminal' | 'arcade' | 'salon' | 'booking' | 'gallery';
  image: string; // <--- YEH NAYI LINE ADD KI HAI
}

export interface Certification {
  id: string;
  index: string;
  title: string;
  issuer: string;
}

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  place: string;
  period: string;
  type: 'education' | 'experience' | 'next';
  bullets: string[];
}

export interface Achievement {
  id: string;
  index: string;
  platform: string;
  logo: string;
  brandColor: string;
  metricNumber: number;
  metricPrefix?: string;
  metricSuffix: string;
  metricDisplay: string;
  label: string;
  caption: string;
  detail: string;
}

export const PROFILE: Profile = {
  name: "Ameema Waheed",
  firstName: "AMEEMA",
  role: "Full Stack Developer",
  headingRole: "Full Stack Developer.",
  email: "amimasheikh4@gmail.com",
  phone: "+92 311 7781239",
  phoneHref: "tel:+923117781239",
  location: "Karachi, Pakistan",
  resumeSummary:
    "Full Stack Developer with hands-on experience designing and building responsive, scalable web applications using JavaScript, jQuery, HTML, CSS, Bootstrap, React, and Python. Strong foundation in object-oriented programming, problem-solving, and clean code practices, with a track record of delivering projects across multiple internships and freelance engagements. Skilled at collaborating with cross-functional teams, troubleshooting technical issues, and contributing to fast-paced development environments. Seeking to bring strong technical and analytical capabilities to a Full Stack Developer role.",
  additionalSummary:
    "Skilled at collaborating with cross-functional teams, troubleshooting technical issues, and contributing to fast-paced development environments.",
  quote:
    "Delivering responsive, scalable web applications through clean code, structured logic, and cross-functional collaboration.",
  linkedin: "https://linkedin.com/in/ameema-waheed-566220282",
  // Per Non-Negotiable Rule 1, no GitHub link is in the resume so it is left undefined
  github: undefined,
  resumePath: "/resume.pdf",
  idCard: {
    idNumber: "AW-2025-CS",
    department: "Computer Science",
    validTill: "2025",
    degree: "BS Computer Science (JUW)",
    keyFocus: "Full-Stack Development, Clean Code & API Architecture",
    keyProjects: "Pet's Paw, Movie Management, ATM Simulation",
    honours: "AI-First Product Leader, Top 1% LinkedIn Creator, ICyDD Speaker",
  },
};

export const NAV: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Certifications", href: "#certifications" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const SKILL_FAMILIES: SkillFamily[] = [
  "All",
  "Frontend",
  "Backend",
  "Practices",
  "Design",
  "Professional",
];

export const SKILLS: Skill[] = [
  // Front-End Development
  {
    atomicNumber: 1,
    symbol: "Js",
    name: "JavaScript",
    family: "Frontend",
    isBrand: true,
    logo: "/logos/javascript.svg",
    description: "Core language for dynamic web interfaces, DOM manipulation, asynchronous calls and component logic.",
    projects: ["Pet's Paw", "The Art Gallery", "Jumping Jack Game"],
  },
  {
    atomicNumber: 2,
    symbol: "Re",
    name: "React",
    family: "Frontend",
    isBrand: true,
    logo: "/logos/react.svg",
    description: "Component-driven user interface development with state management and reusable modular architecture.",
    projects: ["Pet's Paw (Final Year Project)"],
  },
  {
    atomicNumber: 3,
    symbol: "Ht",
    name: "HTML5",
    family: "Frontend",
    isBrand: true,
    logo: "/logos/html5.svg",
    description: "Semantic web structure, accessibility standards, canvas elements and responsive document hierarchies.",
    projects: ["Hair Styling Website", "Basket of Gold Events", "The Art Gallery"],
  },
  {
    atomicNumber: 4,
    symbol: "Cs",
    name: "CSS3",
    family: "Frontend",
    isBrand: true,
    logo: "/logos/css3.svg",
    description: "Modern layouts (Grid, Flexbox), custom animations, responsive viewports and design system styling.",
    projects: ["Hair Styling Website", "Basket of Gold Events", "The Art Gallery"],
  },
  {
    atomicNumber: 5,
    symbol: "Bs",
    name: "Bootstrap",
    family: "Frontend",
    isBrand: true,
    logo: "/logos/bootstrap.svg",
    description: "Responsive grid systems, utility classes and rapid UI scaffolding across device screens.",
    projects: ["Internee.pk Frontend Development"],
  },
  {
    atomicNumber: 6,
    symbol: "Jq",
    name: "jQuery",
    family: "Frontend",
    isBrand: true,
    logo: "/logos/jquery.svg",
    description: "Event handling, DOM traversal and lightweight frontend interactions across legacy and modern codebases.",
    projects: ["CodSoft Web Projects", "Interactive Web Pages"],
  },
  {
    atomicNumber: 7,
    symbol: "Rd",
    name: "Responsive UI Design",
    family: "Frontend",
    isBrand: false,
    conceptIcon: "layout",
    description: "Fluid cross-device viewports, fluid typography, breakpoint tuning and touch-friendly mobile layouts.",
    projects: ["Pet's Paw", "Basket of Gold Events", "Hair Styling Website"],
  },

  // Back-End & Programming
  {
    atomicNumber: 8,
    symbol: "Py",
    name: "Python",
    family: "Backend",
    isBrand: true,
    logo: "/logos/python.svg",
    description: "Server-side programming, algorithmic logic, backend automation and data processing.",
    projects: ["Growintern Applications", "TechnoHacks Solutions", "ATM Machine Simulation"],
  },
  {
    atomicNumber: 9,
    symbol: "Op",
    name: "OOP",
    family: "Backend",
    isBrand: false,
    conceptIcon: "cube",
    description: "Object-oriented programming: classes, encapsulation, inheritance, polymorphism and modular separation.",
    projects: ["ATM Machine Simulation", "Movie Management System"],
  },
  {
    atomicNumber: 10,
    symbol: "Wa",
    name: "Web APIs",
    family: "Backend",
    isBrand: false,
    conceptIcon: "api",
    description: "RESTful API design, endpoint integration, JSON serialization and client-server communication.",
    projects: ["Pet's Paw Full-Stack App", "TechnoHacks API Development"],
  },
  {
    atomicNumber: 11,
    symbol: "Db",
    name: "Database Fundamentals",
    family: "Backend",
    isBrand: false,
    conceptIcon: "database",
    description: "Relational data modeling, schema architecture, CRUD transactions and structured record indexing.",
    projects: ["Movie Management System"],
  },

  // Development Practices
  {
    atomicNumber: 12,
    symbol: "Cc",
    name: "Clean Code",
    family: "Practices",
    isBrand: false,
    conceptIcon: "sparkles",
    description: "Readable, self-documenting, maintainable architecture following modular best practices.",
    projects: ["Growintern", "Internee.pk", "ATM Simulation"],
  },
  {
    atomicNumber: 13,
    symbol: "Dg",
    name: "Debugging",
    family: "Practices",
    isBrand: false,
    conceptIcon: "bug",
    description: "Root-cause fault isolation, runtime logging, edge-case resolution and technical troubleshooting.",
    projects: ["Growintern Python Applications", "Internee.pk Issues"],
  },
  {
    atomicNumber: 14,
    symbol: "Po",
    name: "Performance",
    family: "Practices",
    isBrand: false,
    conceptIcon: "gauge",
    description: "Asset optimization, efficient DOM rendering, lightweight payloads and smooth framerates.",
    projects: ["Internee.pk Interfaces", "The Art Gallery"],
  },
  {
    atomicNumber: 15,
    symbol: "Vc",
    name: "Version Control",
    family: "Practices",
    isBrand: false,
    conceptIcon: "git-branch",
    description: "Source code versioning, commit workflows, branch management and collaborative releases.",
    projects: ["DevQuest PK", "Internee.pk", "Academic Projects"],
  },

  // Design Tools
  {
    atomicNumber: 16,
    symbol: "Ps",
    name: "Adobe Photoshop",
    family: "Design",
    isBrand: true,
    logo: "/logos/photoshop.svg",
    description: "Image manipulation, visual composition, digital asset preparation and photo retouching.",
    projects: ["UI/UX Mockups", "Visual Presentations"],
  },
  {
    atomicNumber: 17,
    symbol: "Ai",
    name: "Adobe Illustrator",
    family: "Design",
    isBrand: true,
    logo: "/logos/illustrator.svg",
    description: "Vector iconography, typography layout, illustration systems and scalable graphic branding.",
    projects: ["Event Collateral", "Digital Badges"],
  },
  {
    atomicNumber: 18,
    symbol: "Ux",
    name: "UI/UX Design",
    family: "Design",
    isBrand: false,
    conceptIcon: "pen-tool",
    description: "User flow architecture, wireframing, visual hierarchy and accessible interface ergonomics.",
    projects: ["Pet's Paw", "The Art Gallery", "Hair Styling Website"],
  },

  // Professional Skills
  {
    atomicNumber: 19,
    symbol: "Tl",
    name: "Team Leadership",
    family: "Professional",
    isBrand: false,
    conceptIcon: "users",
    description: "Guiding multidisciplinary squads, delegating responsibilities and driving consensus.",
    projects: ["DevQuest PK Lead", "KhiNext'26 Organizing"],
  },
  {
    atomicNumber: 20,
    symbol: "Pm",
    name: "Project & Event Management",
    family: "Professional",
    isBrand: false,
    conceptIcon: "calendar",
    description: "End-to-end event strategy, milestone tracking, logistics coordination and audience operations.",
    projects: ["DevQuest PK", "KhiNext'26", "TEDxClifton"],
  },
  {
    atomicNumber: 21,
    symbol: "Tm",
    name: "Time Management",
    family: "Professional",
    isBrand: false,
    conceptIcon: "clock",
    description: "Sprint scheduling, prioritization, milestone delivery and meeting project deadlines.",
    projects: ["CodeAlpha Deadlines", "DevQuest Event Schedules"],
  },
  {
    atomicNumber: 22,
    symbol: "Cm",
    name: "Communication",
    family: "Professional",
    isBrand: false,
    conceptIcon: "message-square",
    description: "Technical speaking, cross-functional collaboration and delivering complex technical content.",
    projects: ["ICyDD Conference Speaker", "ISPR Summer Internship"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "pets-paw",
    index: "01",
    title: "Pet's Paw",
    kicker: "Final Year Project (Web & Mobile App)",
    description:
      "Designed and developed a pet care web and mobile application as a final year project, covering front-end interface design and full-stack functionality for pet owners and service providers.",
    features: [
      "Front-end interface design tailored for pet owners & care clinics",
      "Full-stack functionality covering service scheduling and pet profiles",
    ],
    tech: ["React", "JavaScript", "HTML5", "CSS3", "Web APIs"],
    mockupType: "mobile-app",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "movie-management-system",
    index: "02",
    title: "Movie Management System",
    kicker: "Database Application",
    description:
      "Built a database-driven movie management system to handle movie records, bookings, and data management using structured database design principles.",
    features: [
      "Structured database design principles for movie catalogs and showtimes",
      "Robust management pipeline for user bookings and ticketing records",
    ],
    tech: ["Python", "Database Fundamentals", "OOP", "Clean Code"],
    mockupType: "database",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "atm-machine-simulation",
    index: "03",
    title: "ATM Machine Simulation",
    kicker: "OOP Simulation",
    description:
      "Developed an ATM machine simulation applying object-oriented programming (OOP) concepts including classes, encapsulation, and modular design.",
    features: [
      "Encapsulated account state with secure PIN verification workflows",
      "Modular transaction routines for balance inquiry, deposit and withdrawal",
    ],
    tech: ["Python", "Object-Oriented Programming", "Debugging"],
    mockupType: "terminal",
    image: "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "jumping-jack-game",
    index: "04",
    title: "Jumping Jack Game",
    kicker: "Digital Logic Design (DLD) Project",
    description:
      "Created an interactive Jumping Jack game for a Digital Logic Design (DLD) project, applying logic design and programming fundamentals.",
    features: [
      "Interactive game loop governed by digital logic timing states",
      "Responsive collision physics and real-time score tracking",
    ],
    tech: ["JavaScript", "HTML5", "Clean Code"],
    mockupType: "arcade",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "hair-styling-website",
    index: "05",
    title: "Hair Styling Website",
    kicker: "ICT Project",
    description:
      "Designed and developed a hair styling services website for an ICT project, focusing on responsive layout and visual presentation using HTML and CSS.",
    features: [
      "Responsive layout optimized for salon service catalogues and pricing",
      "Refined visual presentation with aesthetic typography and imagery",
    ],
    tech: ["HTML5", "CSS3", "Responsive UI Design"],
    mockupType: "salon",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "basket-of-gold-events",
    index: "06",
    title: "Basket of Gold Events",
    kicker: "Event Platform",
    description:
      "Designed and developed a responsive event-booking website using HTML and CSS — a one-stop platform for browsing and selecting events such as birthdays, engagements, and cultural festivals.",
    features: [
      "One-stop browsing portal for birthdays, engagements and cultural festivals",
      "Interactive event selection cards with responsive viewport layout",
    ],
    tech: ["HTML5", "CSS3", "Responsive UI Design"],
    mockupType: "booking",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "the-art-gallery",
    index: "07",
    title: "The Art Gallery",
    kicker: "Creative Showcase",
    description:
      "Built a web-based gallery showcasing visual artwork (paintings, sculptures, photography), with focus on clean, user-friendly front-end design.",
    features: [
      "Curated visual showcase for paintings, sculptures, and fine photography",
      "Clean, user-friendly front-end architecture with minimal distraction",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "UI/UX Design"],
    mockupType: "gallery",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1200&auto=format&fit=crop",
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "ai-first-product-leader",
    index: "01",
    title: "Becoming an AI-First Product Leader",
    issuer: "Certified",
  },
  {
    id: "cybersecurity-awareness",
    index: "02",
    title: "Cybersecurity Awareness: Cybersecurity Terminology",
    issuer: "Certified",
  },
  {
    id: "icydd-speaker",
    index: "03",
    title: "Speaker / Presenter — 2nd Int'l Conference on Cybersecurity & Digital Defense (ICyDD)",
    issuer: "ICyDD Conference",
  },
  {
    id: "web-dev-codesoft",
    index: "04",
    title: "Web Development",
    issuer: "CodeSoft",
  },
  {
    id: "python-codeclause-growintern",
    index: "05",
    title: "Python Development",
    issuer: "CodeClause & Growintern",
  },
  {
    id: "chromeos-education",
    index: "06",
    title: "Introduction to ChromeOS for Education",
    issuer: "Google",
  },
];

export const TIMELINE: TimelineEntry[] = [
  {
    id: "edu-college",
    year: "2017 – 2019",
    title: "Inter, Computer Science",
    place: "Sir Syed Govt Girls College",
    period: "May 2017 – May 2019",
    type: "education",
    bullets: [
      "Completed intermediate studies with core focus on computer science, mathematics and analytical fundamentals.",
    ],
  },
  {
    id: "edu-diploma",
    year: "2020 – 2021",
    title: "Diploma, Information Technology",
    place: "Aptech Computer Education",
    period: "Jul 2020 – Dec 2021",
    type: "education",
    bullets: [
      "Intensive practical training in software fundamentals, web technologies, and database architecture.",
    ],
  },
  {
    id: "edu-bs",
    year: "2022 – 2025",
    title: "BS, Computer Science",
    place: "Jinnah University for Women",
    period: "Feb 2022 – Dec 2025",
    type: "education",
    bullets: [
      "Majored in Computer Science; core coursework in OOP, Data Structures, Web Engineering, and Database Systems.",
      "Developed 'Pet's Paw' web and mobile application as Final Year Project.",
    ],
  },
  {
    id: "exp-codsoft",
    year: "2023",
    title: "Web Development",
    place: "CodSoft",
    period: "Oct 2023 – Dec 2023",
    type: "experience",
    bullets: [
      "Completed front-end and full-stack web development projects, focusing on functional integration and clean implementation.",
    ],
  },
  {
    id: "exp-technohacks",
    year: "2023 – 2024",
    title: "Python Developer",
    place: "TechnoHacks EduTech",
    period: "Dec 2023 – Jan 2024",
    type: "experience",
    bullets: [
      "Develop Python-based solutions, strengthening core programming fundamentals applicable to back-end and API development.",
    ],
  },
  {
    id: "exp-internncraft",
    year: "2024",
    title: "Frontend Developer",
    place: "InternnCraft",
    period: "Apr 2024 – May 2024",
    type: "experience",
    bullets: [
      "Design and develop responsive web pages and UI components using JavaScript, HTML, and CSS for client-facing projects.",
    ],
  },
  {
    id: "exp-codealpha",
    year: "2024",
    title: "Frontend Developer",
    place: "CodeAlpha",
    period: "Aug 2024 – Sep 2024",
    type: "experience",
    bullets: [
      "Delivered front-end development tasks using JavaScript and modern web technologies within set project deadlines.",
    ],
  },
  {
    id: "exp-growintern",
    year: "2024",
    title: "Python Developer",
    place: "Growintern",
    period: "Sep 2024 – Nov 2024",
    type: "experience",
    bullets: [
      "Build and debug Python applications, applying strong analytical and problem-solving skills to deliver efficient, well-structured code.",
    ],
  },
  {
    id: "exp-devquest",
    year: "2025 – Present",
    title: "Administration Lead & Karachi Event Lead",
    place: "DevQuest PK",
    period: "May 2025 – Present",
    type: "experience",
    bullets: [
      "Lead a team and coordinate cross-functional efforts for community events, demonstrating leadership, organizational ability, and collaborative project delivery.",
    ],
  },
  {
    id: "exp-ispr",
    year: "2025",
    title: "Summer Internship",
    place: "ISPR",
    period: "Jul 2025 – Aug 2025",
    type: "experience",
    bullets: [
      "Gained professional exposure within a structured team environment, strengthening communication and collaborative problem-solving skills.",
    ],
  },
  {
    id: "exp-internee",
    year: "2025",
    title: "Frontend Developer",
    place: "Internee.pk",
    period: "Sep 2025 – Nov 2025",
    type: "experience",
    bullets: [
      "Develop responsive, user-focused web interfaces using HTML, CSS, JavaScript, and Bootstrap following industry best practices for maintainability and performance.",
      "Collaborate with cross-functional teams to implement new features, resolve front-end issues, and ensure consistent user experience across devices.",
    ],
  },
  {
    id: "next-team",
    year: "Future",
    title: "Next — Your team?",
    place: "Your Company / Organization",
    period: "Available for Full Stack Opportunities",
    type: "next",
    bullets: [
      "Seeking to bring strong technical, analytical, and collaborative capabilities to a high-impact engineering team.",
    ],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "linkedin-reach",
    index: "01 / 06",
    platform: "LinkedIn",
    logo: "/logos/linkedin.svg",
    brandColor: "rgba(10, 102, 194, 0.2)",
    metricNumber: 566,
    metricSuffix: "K+",
    metricDisplay: "566K+",
    label: "Top 1% LinkedIn Creator",
    caption: "566K+ Organic Reach",
    detail: "Strong communication and technical content delivery across developer communities.",
  },
  {
    id: "ambassadorships",
    index: "02 / 06",
    platform: "Google / AveronX / ConnecToLead",
    logo: "/logos/google.svg",
    brandColor: "rgba(66, 133, 244, 0.2)",
    metricNumber: 10,
    metricSuffix: "+",
    metricDisplay: "10+",
    label: "Global & Local Ambassador",
    caption: "10+ Tech Organizations",
    detail: "Ambassador across Google Developer Groups, AveronX, and ConnecToLead networks.",
  },
  {
    id: "khinext-summit",
    index: "03 / 06",
    platform: "KhiNext",
    logo: "/logos/khinext.svg",
    brandColor: "rgba(34, 197, 94, 0.2)",
    metricNumber: 26,
    metricPrefix: "'",
    metricSuffix: "",
    metricDisplay: "'26",
    label: "Organizer, KhiNext'26",
    caption: "Karachi Tech Summit",
    detail: "Leading large-scale tech event planning and operations for Karachi's tech community.",
  },
  {
    id: "devquest-lead",
    index: "04 / 06",
    platform: "DevQuest PK",
    logo: "/logos/devquest.svg",
    brandColor: "rgba(96, 165, 250, 0.2)",
    metricNumber: 2,
    metricSuffix: " Roles",
    metricDisplay: "2",
    label: "Event & Administration Lead",
    caption: "DevQuest PK",
    detail: "Managing cross-functional teams, operations, and community developer events.",
  },
  {
    id: "tedx-clifton",
    index: "05 / 06",
    platform: "TEDxClifton",
    logo: "/logos/tedx.svg",
    brandColor: "rgba(230, 43, 30, 0.2)",
    metricNumber: 1,
    metricSuffix: " Core",
    metricDisplay: "1",
    label: "Core Team Member",
    caption: "TEDxClifton",
    detail: "Supporting event strategy, data coordination, and live audience engagement.",
  },
  {
    id: "icydd-conference",
    index: "06 / 06",
    platform: "ICyDD",
    logo: "/logos/icydd.svg",
    brandColor: "rgba(56, 189, 248, 0.2)",
    metricNumber: 2,
    metricSuffix: "nd",
    metricDisplay: "2nd",
    label: "Speaker / Presenter",
    caption: "Int'l Cybersecurity Conf",
    detail: "2nd International Conference on Cybersecurity and Digital Defense (ICyDD).",
  },
];