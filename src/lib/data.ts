export const summary = "Senior Software Engineer with deep expertise in .NET 8, C#, and full-stack web development. Skilled in building scalable, modern applications and APIs with a strong frontend background in React, Next.js, and TypeScript. Experienced in designing cloud-native systems and leading lift-and-shift migrations from legacy on-premise infrastructure to AWS and Azure. Proven success delivering enterprise systems in government and public-sector environments, as well as polished mobile and web apps in independent projects.";

export const skills = {
    "Spoken Languages 🗣️": ["English - Native", "French - Fluent", "Spanish - Novice", "Japanese - Novice"],
    "Programming Languages ⌨️": ["C#", "TypeScript", "JavaScript", "Go/GoLang", "C", "Python", "R", "SQL", "PowerShell", "Swift", "HTML", "CSS"],
    "Frameworks 🖼️": [".NET Core", ".NET Framework", "NextJS", "ReactJS", "React Native", "Node.js"],
    "Technologies 🤖": [
        "AWS", "PostgreSQL", "Aurora", "Snowflake", "Git", "Github CI/CD", "GitLab CI/CD",
        "MongoDB", "Redis", "Vercel",
        "CircleCI", "Jenkins", "DataDog", "LaunchDarkly", "Terraform",
        "Microsoft Azure", "Azure DevOps", "Azure Functions", "Azure Data Factory"
    ],
};

export const experience = [
    {
        company: "California Department of Health Care Services",
        role: "Senior Software Engineer",
        duration: "October 2024 – Present",
        responsibilities: [
            "Architecture the development of a license and renewal platform for behavioral health providers, ensuring efficiency and scalability.",
            "Design and maintain a PostgreSQL database, implementing structured migrations to manage schema and data changes.",
            "Deploy and manage application services in Docker, optimizing containerized environments for reliability.",
            "Develop and refine backend services in .NET, orchestrating business logic and API routing.",
            "Build a modern, responsive frontend using .NET and MudBlazor, enhancing user experience with intuitive UI components.",
            "Automate CI/CD pipelines with CircleCI, enforcing rigorous testing and smooth deployments.",
            "Implement feature flagging with LaunchDarkly and monitor system performance with DataDog for real-time insights."
        ],
    },
    {
        company: "WestRock",
        role: "Senior Software Engineer",
        duration: "April 2024 – October 2024",
        responsibilities: [
            "Upgraded existing front-end applications using modern React frameworks.",
            "Migrated back-end MVC applications to latest .NET frameworks.",
            "Developed base applications that empowered other engineers to customize solutions.",
            "Transformed legacy applications by automating workflows.",
            "Optimized performance of existing applications for improved load times.",
            "Followed Agile Scrum methodologies and conducted code reviews.",
        ],
    },
    {
        company: "Ally",
        role: "Senior Software Engineer",
        duration: "May 2021 – April 2024",
        responsibilities: [
            "Led a team of 8 developers, managing and distributing work.",
            "Migrated legacy applications to AWS Cloud system using Terraform.",
            "Developed CI/CD pipelines using GitLab.",
            "Implemented a universal auditing system for API tracking.",
            "Built secure .NET Core APIs with role-based authorization.",
            "Developed front-end applications using React and TypeScript.",
        ],
    },
    {
        company: "Garsan Solutions",
        role: "Software Engineer",
        duration: "Jan 2019 – May 2021",
        responsibilities: [
            "Developed and modified government-owned applications using .NET, React, Java.",
            "Integrated SQL Server databases to call and store front-end data.",
            "Developed machine learning models for business predictions.",
            "Designed PowerShell scripts reducing maintenance time by 50%.",
            "Integrated Microsoft Azure services into business applications.",
        ],
    },
];

export const projects = [
    {
        name: "ScoreKeep for Baseball",
        description: "A lightweight baseball scorekeeping app for iOS.",
        tech: "Swift, XCode, Core Data, UIKit",
        image: "/scorekeep.png",
        imageAlt: "scorekeep app store screenshot",
        website: "https://apps.apple.com/us/app/scorekeep-for-baseball/id6744072400",
        github: "https://github.com/baker339/DOGR",
    },
    {
        name: "HotDogity",
        description: "A social media app for the hotdog loving community.",
        tech: "Next.js, Firebase, MongoDB, TypeScript, Tailwind, Vercel",
        image: "/hotdogity_com_dashboard.jpeg",
        imageAlt: "HotDogity dashboard screenshot",
        website: "https://hotdogity.com/dashboard",
        github: "https://github.com/baker339/DOGR",
    },
    {
        name: "Go Shortener",
        description: "A URL shortener built with Go, Redis, and PostgreSQL.",
        tech: "GoLang, Redis, PostgreSQL, Fly.io, Docker, Vercel, Next.JS",
        image: "/futuristic-url-shortener_vercel_app.jpeg",
        imageAlt: "Go Shortener screenshot",
        website: "https://futuristic-url-shortener.vercel.app",
        github: "https://github.com/baker339/url-shortener",
    },
    // {
    //     name: "ScaleUp",
    //     description: "A gamified music theory learning app.",
    //     tech: "Next.js, Tailwind, PostgreSQL, Vercel",
    //     image: "/hotdogity_com_dashboard.jpeg",
    //     imageAlt: "HotDogity dashboard screenshot",
    //     website: "https://scale-up-app.vercel.app",
    //     github: "https://github.com/baker339/scale-up",
    // },
    // {
    //     name: "Troo Blog",
    //     description: "A fake news blog site using stories created by ChatGPT.",
    //     tech: "Next.JS, ChatGPT, Vercel",
    //     image: "/hotdogity_com_dashboard.jpeg",
    //     imageAlt: "HotDogity dashboard screenshot",
    //     website: "https://troo-stuff-blog.vercel.app/",
    //     github: "https://github.com/baker339/troo-stuff-blog"
    // }
];