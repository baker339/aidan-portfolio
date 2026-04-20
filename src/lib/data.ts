export type GalleryCard = {
    id: string;
    heading: string;
    subhead: string;
    cta: string;
    href: string;
    img?: { src: string; alt: string };
    invert?: boolean;
};

export const siteMetadata = {
    title: 'Aidan | Portfolio',
    description:
        'Senior Software Engineer portfolio — .NET, React, Next.js, TypeScript, cloud, and more.',
};

export const summary =
    "I'm a senior software engineer who works across the stack: C# and .NET services, careful data modeling in PostgreSQL and SQL Server, and frontends in React, Next.js, and TypeScript—including MudBlazor when the product calls for it. Lately at DHCS I'm architecting provider licensing flows, running services in Docker, and pairing CircleCI, LaunchDarkly, and DataDog so releases stay safe and observable. Before that I led AWS migrations with Terraform at Ally, modernized enterprise apps at WestRock, and shipped government systems on Azure. On the side I build in Swift and Go too—ScoreKeep on iOS, HotDogity on Next.js, and a small Go URL shortener—because I like products that feel as good as the infrastructure underneath.";

export const skills = {
    'Spoken Languages 🗣️': ['English - Native', 'French - Fluent', 'Spanish - Novice', 'Japanese - Novice'],
    'Programming Languages ⌨️': ['C#', 'TypeScript', 'JavaScript', 'Go/GoLang', 'C', 'Python', 'R', 'SQL', 'PowerShell', 'Swift', 'HTML', 'CSS'],
    'Frameworks 🖼️': ['.NET Core', '.NET Framework', 'NextJS', 'ReactJS', 'React Native', 'Node.js'],
    'Technologies 🤖': [
        'AWS',
        'PostgreSQL',
        'Aurora',
        'Snowflake',
        'Git',
        'Github CI/CD',
        'GitLab CI/CD',
        'MongoDB',
        'Redis',
        'Vercel',
        'CircleCI',
        'Jenkins',
        'DataDog',
        'LaunchDarkly',
        'Terraform',
        'Microsoft Azure',
        'Azure DevOps',
        'Azure Functions',
        'Azure Data Factory',
    ],
} as const;

export const experience = [
    {
        company: 'California Department of Health Care Services',
        role: 'Senior Software Engineer',
        duration: 'October 2024 – Present',
        responsibilities: [
            'Architecture the development of a license and renewal platform for behavioral health providers, ensuring efficiency and scalability.',
            'Design and maintain a PostgreSQL database, implementing structured migrations to manage schema and data changes.',
            'Deploy and manage application services in Docker, optimizing containerized environments for reliability.',
            'Develop and refine backend services in .NET, orchestrating business logic and API routing.',
            'Build a modern, responsive frontend using .NET and MudBlazor, enhancing user experience with intuitive UI components.',
            'Automate CI/CD pipelines with CircleCI, enforcing rigorous testing and smooth deployments.',
            'Implement feature flagging with LaunchDarkly and monitor system performance with DataDog for real-time insights.',
        ],
    },
    {
        company: 'WestRock',
        role: 'Senior Software Engineer',
        duration: 'April 2024 – October 2024',
        responsibilities: [
            'Upgraded existing front-end applications using modern React frameworks.',
            'Migrated back-end MVC applications to latest .NET frameworks.',
            'Developed base applications that empowered other engineers to customize solutions.',
            'Transformed legacy applications by automating workflows.',
            'Optimized performance of existing applications for improved load times.',
            'Followed Agile Scrum methodologies and conducted code reviews.',
        ],
    },
    {
        company: 'Ally',
        role: 'Senior Software Engineer',
        duration: 'May 2021 – April 2024',
        responsibilities: [
            'Led a team of 8 developers, managing and distributing work.',
            'Migrated legacy applications to AWS Cloud system using Terraform.',
            'Developed CI/CD pipelines using GitLab.',
            'Implemented a universal auditing system for API tracking.',
            'Built secure .NET Core APIs with role-based authorization.',
            'Developed front-end applications using React and TypeScript.',
        ],
    },
    {
        company: 'Garsan Solutions',
        role: 'Software Engineer',
        duration: 'Jan 2019 – May 2021',
        responsibilities: [
            'Developed and modified government-owned applications using .NET, React, Java.',
            'Integrated SQL Server databases to call and store front-end data.',
            'Developed machine learning models for business predictions.',
            'Designed PowerShell scripts reducing maintenance time by 50%.',
            'Integrated Microsoft Azure services into business applications.',
        ],
    },
];

export const projects = [
    {
        name: 'ScoreKeep for Baseball',
        description: 'A lightweight baseball scorekeeping app for iOS.',
        tech: 'Swift, XCode, Core Data, UIKit',
        image: '/scorekeep.png',
        imageAlt: 'scorekeep app store screenshot',
        website: 'https://apps.apple.com/us/app/scorekeep-for-baseball/id6744072400',
        github: 'https://github.com/baker339/DOGR',
    },
    {
        name: 'HotDogity',
        description: 'A social media app for the hotdog loving community.',
        tech: 'Next.js, Firebase, MongoDB, TypeScript, Tailwind, Vercel',
        image: '/hotdogity_com_dashboard.jpeg',
        imageAlt: 'HotDogity dashboard screenshot',
        website: 'https://hotdogity.com/dashboard',
        github: 'https://github.com/baker339/DOGR',
    },
    {
        name: 'Go Shortener',
        description: 'A URL shortener built with Go, Redis, and PostgreSQL.',
        tech: 'GoLang, Redis, PostgreSQL, Fly.io, Docker, Vercel, Next.JS',
        image: '/futuristic-url-shortener_vercel_app.jpeg',
        imageAlt: 'Go Shortener screenshot',
        website: 'https://futuristic-url-shortener.vercel.app',
        github: 'https://github.com/baker339/url-shortener',
    },
    {
        name: 'Signal Garden (WIP)',
        description: 'A playful experiment in realtime UI and data viz — write-up and demo coming soon.',
        tech: 'Next.js, TypeScript, WebSockets, Vercel',
        image: '/globe.svg',
        imageAlt: 'Placeholder artwork for Signal Garden',
        website: 'https://github.com/baker339',
        github: 'https://github.com/baker339',
    },
    {
        name: 'Arcade Ledger (WIP)',
        description: 'A tiny toolkit for shipping side projects with less chaos — details landing soon.',
        tech: 'TBD',
        image: '/window.svg',
        imageAlt: 'Placeholder artwork for Arcade Ledger',
        website: 'https://github.com/baker339',
        github: 'https://github.com/baker339',
    },
];

export const primaryNav = [
    { href: '/', label: 'Home' },
    { href: '/skills', label: 'Skills' },
    { href: '/experience', label: 'Experience' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
] as const;

export const homeHero = {
    title: 'Aidan Baker',
    subtitle: 'Building delightful software experiences in .NET, React, iOS, and more.',
    icon: '/memoji_smile.png',
};

/** Home page section below the hero (no TV / studio metaphors). */
export const homeSection = {
    title: 'Pick a corner',
};

export const pageHeros = {
    skills: {
        title: 'My Toolbox',
        subtitle: 'What I reach for every day.',
        icon: '/memoji_computer.png',
        invert: true as const,
    },
    experience: {
        title: 'Experience',
        subtitle: 'Walking the line between enterprise & indie.',
        icon: '/memoji_secret.png',
        invert: true as const,
    },
    projects: {
        title: 'Projects',
        subtitle: 'Big experiments. Bigger lessons.',
        icon: '/memoji_peekaboo.png',
        invert: false as const,
    },
    contact: {
        title: "Let's Connect",
        subtitle: 'Always open to new opportunities and conversations.',
        icon: '/memoji_wave.png',
        invert: false as const,
    },
};

export const contactLinks = [
    {
        id: 'email',
        heading: 'Email',
        body: 'aidanbaker.ab@gmail.com',
        href: 'mailto:aidanbaker.ab@gmail.com',
    },
    {
        id: 'linkedin',
        heading: 'LinkedIn',
        body: 'Connect with me',
        href: 'https://linkedin.com/in/aidanbaker',
    },
    {
        id: 'github',
        heading: 'GitHub',
        body: 'Check out my code',
        href: 'https://github.com/baker339',
    },
] as const;

export const homeGallery: GalleryCard[] = [
    {
        id: 'skills',
        heading: 'Skills and Languages',
        subhead: 'A polyglot toolbox',
        cta: 'View skills',
        href: '/skills',
        img: { src: '/memoji_computer.png', alt: 'Memoji at a computer' },
    },
    {
        id: 'experience',
        heading: 'Experience',
        subhead: 'Government → FinTech → Health',
        cta: 'See timeline',
        href: '/experience',
        img: { src: '/memoji_secret.png', alt: 'Memoji in front of a glass office' },
    },
    {
        id: 'projects',
        heading: 'Side Projects',
        subhead: 'Shipping ideas for fun',
        cta: 'Explore apps',
        href: '/projects',
        img: { src: '/memoji_peekaboo.png', alt: 'Memoji peeking over a laptop' },
        invert: true,
    },
    {
        id: 'connect',
        heading: 'Connect',
        subhead: "Let's chat!",
        cta: 'See links',
        href: '/contact',
        img: { src: '/memoji_wave.png', alt: 'Memoji waving hello' },
        invert: true,
    },
];

export const skillsPageGallery: GalleryCard[] = [
    {
        id: 'experience',
        heading: 'Experience',
        subhead: 'Government • FinTech • Health',
        cta: 'See timeline',
        href: '/experience',
        img: { src: '/memoji_secret.png', alt: 'Modern office at dusk' },
    },
    {
        id: 'projects',
        heading: 'Side Projects',
        subhead: 'Shipping ideas for fun',
        cta: 'Explore apps',
        href: '/projects',
        img: { src: '/memoji_peekaboo.png', alt: 'MacBook on wooden desk' },
        invert: true,
    },
    {
        id: 'connect',
        heading: 'Connect',
        subhead: "Let's chat!",
        cta: 'See links',
        href: '/contact',
        img: { src: '/memoji_wave.png', alt: 'Memoji waving' },
        invert: true,
    },
];

export const experiencePageGallery: GalleryCard[] = [
    {
        id: 'skills',
        heading: 'Skills',
        subhead: 'My tech toolbox',
        cta: 'View skills',
        href: '/skills',
        img: { src: '/memoji_computer.png', alt: 'Syntax-highlighted code' },
    },
    {
        id: 'projects',
        heading: 'Side Projects',
        subhead: 'Where nights & weekends go',
        cta: 'Explore apps',
        href: '/projects',
        img: { src: '/memoji_peekaboo.png', alt: 'MacBook on desk' },
        invert: true,
    },
    {
        id: 'connect',
        heading: 'Connect',
        subhead: "Let's chat!",
        cta: 'See links',
        href: '/contact',
        img: { src: '/memoji_wave.png', alt: 'Memoji waving' },
        invert: true,
    },
];

export const projectsPageGallery: GalleryCard[] = [
    {
        id: 'skills',
        heading: 'Skills',
        subhead: 'My tech toolbox',
        cta: 'View skills',
        href: '/skills',
        img: { src: '/memoji_computer.png', alt: 'Syntax-highlighted code' },
    },
    {
        id: 'experience',
        heading: 'Experience',
        subhead: 'Government • FinTech • Health',
        cta: 'See timeline',
        href: '/experience',
        img: { src: '/memoji_secret.png', alt: 'Modern office at dusk' },
    },
    {
        id: 'connect',
        heading: 'Connect',
        subhead: "Let's chat!",
        cta: 'See links',
        href: '/contact',
        img: { src: '/memoji_wave.png', alt: 'Memoji waving' },
        invert: true,
    },
];

export const contactPageGallery: GalleryCard[] = [
    {
        id: 'skills',
        heading: 'Skills',
        subhead: 'My tech toolbox',
        cta: 'View skills',
        href: '/skills',
        img: { src: '/memoji_computer.png', alt: 'Syntax-highlighted code' },
    },
    {
        id: 'projects',
        heading: 'Projects',
        subhead: 'See what I build',
        cta: 'View projects',
        href: '/projects',
        img: { src: '/memoji_peekaboo.png', alt: 'MacBook on desk' },
    },
    {
        id: 'experience',
        heading: 'Experience',
        subhead: 'My journey so far',
        cta: 'See timeline',
        href: '/experience',
        img: { src: '/memoji_secret.png', alt: 'Modern office at dusk' },
    },
];

export const playModeCopy = {
    title: 'Playground',
    eyebrow: 'Bonus round',
    subtitle: 'Bump the goo-buttons and read the same resume data as the rest of the site — just with WASD.',
    ctaLabel: "Let's go",
    navLabel: 'Play',
    skipToSiteLabel: 'Skip to normal pages',
};
