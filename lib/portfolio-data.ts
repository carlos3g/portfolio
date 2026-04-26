import type { Locale } from "@/i18n/routing";

type Localized<T> = { pt: T; en: T };

const L = <T>(value: Localized<T>, locale: Locale): T => value[locale];

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  period: string;
  summary: string;
  narrative: string;
  stack: string[];
  highlights: string[];
  link?: { href: string; label: string };
}

export interface EducationItem {
  institution: string;
  course: string;
  location: string;
  period: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Profile {
  name: string;
  handle: string;
  title: string;
  tagline: string;
  summary: string;
  focus: string;
  email: string;
  phone: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  cvUrl: string;
}

interface ExperienceSource {
  id: string;
  role: Localized<string>;
  company: string;
  location: Localized<string>;
  period: Localized<string>;
  summary: Localized<string>;
  highlights: Localized<string[]>;
  stack: string[];
}

interface ProjectSource {
  id: string;
  title: string;
  role: Localized<string>;
  period: Localized<string>;
  summary: Localized<string>;
  narrative: Localized<string>;
  stack: string[];
  highlights: Localized<string[]>;
  link?: { href: string; label: string };
}

interface EducationSource {
  institution: string;
  course: Localized<string>;
  location: string;
  period: Localized<string>;
}

interface SkillGroupSource {
  label: Localized<string>;
  items: string[];
}

interface ProfileSource {
  name: string;
  handle: string;
  title: Localized<string>;
  tagline: Localized<string>;
  summary: Localized<string>;
  focus: Localized<string>;
  email: string;
  phone: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  cvUrl: string;
}

const profileSource: ProfileSource = {
  name: "Carlos Mesquita",
  handle: "carlos3g",
  title: {
    pt: "Desenvolvedor Fullstack",
    en: "Fullstack Developer",
  },
  tagline: {
    pt: "Construo sistemas escaláveis em TypeScript, Node.js, React e AWS — do design de arquitetura à operação em produção.",
    en: "I build scalable systems in TypeScript, Node.js, React and AWS — from architecture design to production operation.",
  },
  summary: {
    pt: "Desenvolvedor Fullstack com mais de 4 anos de experiência construindo aplicações escaláveis em TypeScript, Node.js, React, React Native, PHP e Laravel. Atuação de ponta a ponta, do design de arquitetura à operação em produção, com forte domínio de infraestrutura AWS (EC2, SQS, S3, Lambda, Auto Scaling Groups) e práticas de observabilidade, CI/CD e testes automatizados.",
    en: "Fullstack Developer with 4+ years of experience building scalable applications in TypeScript, Node.js, React, React Native, PHP and Laravel. End-to-end ownership, from architecture design to production operation, with strong command of AWS infrastructure (EC2, SQS, S3, Lambda, Auto Scaling Groups) and observability, CI/CD and automated testing practices.",
  },
  focus: {
    pt: "Experiência comprovada em sistemas de pagamentos, integrações com gateways financeiros e plataformas de alta disponibilidade. Foco em entregar software estável, performático e bem testado.",
    en: "Proven experience in payment systems, financial gateway integrations and high-availability platforms. Focused on delivering stable, performant and well-tested software.",
  },
  email: "carlosmesquita156@gmail.com",
  phone: "+55 86 98131-3925",
  whatsapp: "https://wa.me/5586981313925",
  github: "https://github.com/carlos3g",
  linkedin: "https://www.linkedin.com/in/carlos3g",
  cvUrl:
    "https://github.com/carlos3g/curriculum-vitae/releases/latest/download/cv.pdf",
};

const experienceSource: ExperienceSource[] = [
  {
    id: "beehive",
    role: {
      pt: "Desenvolvedor Fullstack Pleno",
      en: "Mid-level Fullstack Developer",
    },
    company: "Beehive News",
    location: { pt: "Remoto", en: "Remote" },
    period: { pt: "Nov. 2024 — Presente", en: "Nov 2024 — Present" },
    summary: {
      pt: "Atuação full-stack e DevOps, com foco em escalabilidade, estabilidade e qualidade de software.",
      en: "Full-stack and DevOps work, focused on scalability, stability and software quality.",
    },
    highlights: {
      pt: [
        "Desenvolvi de ponta a ponta usando ExpressJS, TypeScript, React Native, ReactJS, AWS e Vercel.",
        "Estruturei e implementei testes automatizados (unitários e E2E) — não havia nenhuma cobertura anteriormente.",
        "Garanti alta disponibilidade da infra AWS configurando health checks, Auto Scaling Groups e otimização com SQS.",
        "Implementei observabilidade completa no backend com Jaeger Tracing e Sentry; logging no app com Sentry e GA.",
        "Desenvolvi a funcionalidade de storyboards, no backend e no app.",
        "Implementei todo o sistema de notificações com OneSignal, AWS SQS e demais integrações.",
        "Estruturei e automatizei pipelines de CI/CD com GitHub Actions, AWS CodeDeploy e Fastlane.",
        "Desenvolvi um backoffice em ReactJS com React Router v7, shadcn e React Query.",
      ],
      en: [
        "Built end-to-end with ExpressJS, TypeScript, React Native, ReactJS, AWS and Vercel.",
        "Designed and implemented automated tests (unit and E2E) — no coverage existed previously.",
        "Ensured AWS infrastructure high availability via health checks, Auto Scaling Groups and SQS-based optimization.",
        "Implemented full backend observability with Jaeger Tracing and Sentry; in-app logging with Sentry and GA.",
        "Developed the storyboards feature, both on the backend and in the app.",
        "Built the entire notification system with OneSignal, AWS SQS and surrounding integrations.",
        "Designed and automated CI/CD pipelines with GitHub Actions, AWS CodeDeploy and Fastlane.",
        "Built a backoffice in ReactJS with React Router v7, shadcn and React Query.",
      ],
    },
    stack: [
      "TypeScript",
      "ExpressJS",
      "React Native",
      "ReactJS",
      "AWS",
      "Vercel",
      "Sentry",
      "Jaeger",
    ],
  },
  {
    id: "navan",
    role: {
      pt: "Desenvolvedor Fullstack",
      en: "Fullstack Developer",
    },
    company: "Navan",
    location: { pt: "Remoto", en: "Remote" },
    period: { pt: "Ago. 2023 — Nov. 2024", en: "Aug 2023 — Nov 2024" },
    summary: {
      pt: "Desenvolvimento Fullstack com PHP, Laravel, NestJS, Next.js, ReactJS e React Native.",
      en: "Fullstack development with PHP, Laravel, NestJS, Next.js, ReactJS and React Native.",
    },
    highlights: {
      pt: [
        "Configuração e implementação de stack AWS: SQS, S3, SES, EC2, Lambda.",
        "Planejamento e implementação de pagamentos, assinaturas, fluxos de cadastro e contratos, assinatura eletrônica e webhooks próprios.",
        "Implementação de gateways de pagamento como Asaas.",
        "Integração entre sistemas em PHP puro e Laravel.",
        "Testes com PHP Pest, PHPUnit, Jest e Maestro.",
      ],
      en: [
        "Set up and implemented AWS stack: SQS, S3, SES, EC2, Lambda.",
        "Designed and shipped payments, subscriptions, signup and contract flows, e-signature and in-house webhooks.",
        "Integrated payment gateways such as Asaas.",
        "Integration between vanilla PHP and Laravel systems.",
        "Testing with PHP Pest, PHPUnit, Jest and Maestro.",
      ],
    },
    stack: [
      "PHP",
      "Laravel",
      "NestJS",
      "Next.js",
      "ReactJS",
      "React Native",
      "Redis",
      "PostgreSQL",
      "AWS",
    ],
  },
  {
    id: "smarti",
    role: {
      pt: "Desenvolvedor Fullstack",
      en: "Fullstack Developer",
    },
    company: "Grupo Smarti",
    location: { pt: "Remoto", en: "Remote" },
    period: { pt: "Fev. 2023 — Nov. 2023", en: "Feb 2023 — Nov 2023" },
    summary: {
      pt: "Atuação em hub de pagamentos: gateways, AWS e migração para arquitetura orientada a eventos.",
      en: "Payments hub work: gateways, AWS and migration to an event-driven architecture.",
    },
    highlights: {
      pt: [
        "Implementei gateways de pagamento, serviços AWS e atualizei a arquitetura para CQRS orientada a eventos.",
        "Desenvolvi um backoffice em React.JS.",
        "Apps em React Native com Google Analytics, OneSignal e APIs de maps, câmera e localização.",
        "Aprimorei performance de apps existentes, reduzindo tempo de resposta.",
        "No front-end, implementei novos designs e funcionalidades, atualizei legados em Next.js, React.js e Vue.js.",
      ],
      en: [
        "Implemented payment gateways, AWS services and migrated the architecture to event-driven CQRS.",
        "Built a backoffice in React.JS.",
        "React Native apps with Google Analytics, OneSignal and maps, camera and geolocation APIs.",
        "Improved performance of existing apps, reducing response times.",
        "On the front-end, shipped new designs and features, modernized legacy code in Next.js, React.js and Vue.js.",
      ],
    },
    stack: ["React.js", "React Native", "Next.js", "Vue.js", "AWS", "CQRS"],
  },
];

const volunteerSource: ExperienceSource[] = [
  {
    id: "beecrowd",
    role: { pt: "Moderador", en: "Moderator" },
    company: "Beecrowd",
    location: { pt: "Remoto", en: "Remote" },
    period: { pt: "Mai. 2020 — Presente", en: "May 2020 — Present" },
    summary: {
      pt: "Mentoria e auxílio em resolução de problemas algorítmicos em C, C++, Java e Python.",
      en: "Mentoring and helping with algorithmic problem solving in C, C++, Java and Python.",
    },
    highlights: {
      pt: [
        "Mentoria contínua para uma comunidade global de desenvolvedores iniciantes e intermediários.",
      ],
      en: [
        "Ongoing mentoring for a global community of beginner and intermediate developers.",
      ],
    },
    stack: ["C", "C++", "Java", "Python"],
  },
];

const projectsSource: ProjectSource[] = [
  {
    id: "echoes",
    title: "Echoes",
    role: {
      pt: "Fullstack & Arquitetura",
      en: "Fullstack & Architecture",
    },
    period: { pt: "Jul. 2024 — Presente", en: "Jul 2024 — Present" },
    summary: {
      pt: "Plataforma social construída do zero — desde a modelagem do banco até a infra automatizada.",
      en: "Social platform built from scratch — from database modeling to automated infrastructure.",
    },
    narrative: {
      pt: "Desenvolvimento Fullstack com NestJS, ReactJS, Next.js, React Native e PostgreSQL. Modelagem de banco e arquitetura de sistemas. Ambientes de desenvolvimento criados com Docker e Terraform.",
      en: "Fullstack development with NestJS, ReactJS, Next.js, React Native and PostgreSQL. Database modeling and systems architecture. Development environments built with Docker and Terraform.",
    },
    stack: [
      "TypeScript",
      "NestJS",
      "React Native",
      "ReactJS",
      "PostgreSQL",
      "Docker",
      "Terraform",
      "AWS SQS",
      "AWS S3",
    ],
    highlights: {
      pt: [
        "Modelagem de banco de dados e desenho da arquitetura geral.",
        "Infraestrutura como código com Terraform.",
        "Ambientes locais reprodutíveis com Docker.",
      ],
      en: [
        "Database modeling and overall architecture design.",
        "Infrastructure as code with Terraform.",
        "Reproducible local environments with Docker.",
      ],
    },
    link: {
      href: "https://github.com/carlos3g/echoes",
      label: "github.com/carlos3g/echoes",
    },
  },
];

const educationSource: EducationSource[] = [
  {
    institution: "Instituto Federal do Piauí",
    course: {
      pt: "Análise e Desenvolvimento de Sistemas",
      en: "Systems Analysis and Development",
    },
    location: "Pedro II — PI",
    period: { pt: "Mar. 2022 — Dez. 2025", en: "Mar 2022 — Dec 2025" },
  },
  {
    institution: "Instituto Federal do Piauí",
    course: {
      pt: "Curso técnico em informática",
      en: "Technical Course in Computing",
    },
    location: "Pedro II — PI",
    period: { pt: "Mar. 2019 — Dez. 2021", en: "Mar 2019 — Dec 2021" },
  },
];

const skillGroupsSource: SkillGroupSource[] = [
  {
    label: { pt: "Cloud & Infra", en: "Cloud & Infra" },
    items: [
      "AWS EC2",
      "AWS SQS",
      "AWS S3",
      "AWS SES",
      "AWS Lambda",
      "Auto Scaling Groups",
      "CodeDeploy",
      "CloudWatch",
      "Terraform",
      "Docker",
      "GitHub Actions",
      "GitLab CI",
      "Jenkins",
      "Fastlane",
    ],
  },
  {
    label: { pt: "Observabilidade", en: "Observability" },
    items: ["Jaeger Tracing", "Sentry", "Google Analytics", "CloudWatch"],
  },
  {
    label: { pt: "Linguagens", en: "Languages" },
    items: [
      "TypeScript",
      "JavaScript",
      "PHP",
      "SQL",
      "Python",
      "Java",
      "C#",
      "HTML/CSS",
    ],
  },
  {
    label: { pt: "Frameworks", en: "Frameworks" },
    items: [
      "Node.js",
      "Nest.js",
      "Next.js",
      "React",
      "React Native",
      "Expo",
      "Laravel",
    ],
  },
  {
    label: { pt: "Bancos de Dados", en: "Databases" },
    items: ["PostgreSQL", "MySQL", "Redis"],
  },
  {
    label: { pt: "Bibliotecas", en: "Libraries" },
    items: [
      "React Query",
      "Redux",
      "Redux Toolkit",
      "Zustand",
      "shadcn/ui",
    ],
  },
  {
    label: { pt: "Testes", en: "Testing" },
    items: [
      "Jest",
      "Vitest",
      "Pest",
      "PHPUnit",
      "React Testing Library",
      "Detox",
      "Maestro",
      "Playwright",
      "Cypress",
      "Selenium",
    ],
  },
];

function localizeExperience(
  src: ExperienceSource,
  locale: Locale
): ExperienceItem {
  return {
    id: src.id,
    role: L(src.role, locale),
    company: src.company,
    location: L(src.location, locale),
    period: L(src.period, locale),
    summary: L(src.summary, locale),
    highlights: L(src.highlights, locale),
    stack: src.stack,
  };
}

function localizeProject(src: ProjectSource, locale: Locale): ProjectItem {
  return {
    id: src.id,
    title: src.title,
    role: L(src.role, locale),
    period: L(src.period, locale),
    summary: L(src.summary, locale),
    narrative: L(src.narrative, locale),
    stack: src.stack,
    highlights: L(src.highlights, locale),
    link: src.link,
  };
}

function localizeEducation(
  src: EducationSource,
  locale: Locale
): EducationItem {
  return {
    institution: src.institution,
    course: L(src.course, locale),
    location: src.location,
    period: L(src.period, locale),
  };
}

function localizeSkillGroup(
  src: SkillGroupSource,
  locale: Locale
): SkillGroup {
  return { label: L(src.label, locale), items: src.items };
}

export function getProfile(locale: Locale): Profile {
  return {
    name: profileSource.name,
    handle: profileSource.handle,
    title: L(profileSource.title, locale),
    tagline: L(profileSource.tagline, locale),
    summary: L(profileSource.summary, locale),
    focus: L(profileSource.focus, locale),
    email: profileSource.email,
    phone: profileSource.phone,
    whatsapp: profileSource.whatsapp,
    github: profileSource.github,
    linkedin: profileSource.linkedin,
    cvUrl: profileSource.cvUrl,
  };
}

export function getExperience(locale: Locale): ExperienceItem[] {
  return experienceSource.map((e) => localizeExperience(e, locale));
}

export function getVolunteer(locale: Locale): ExperienceItem[] {
  return volunteerSource.map((e) => localizeExperience(e, locale));
}

export function getProjects(locale: Locale): ProjectItem[] {
  return projectsSource.map((p) => localizeProject(p, locale));
}

export function getEducation(locale: Locale): EducationItem[] {
  return educationSource.map((e) => localizeEducation(e, locale));
}

export function getSkillGroups(locale: Locale): SkillGroup[] {
  return skillGroupsSource.map((g) => localizeSkillGroup(g, locale));
}

export const experienceCount = experienceSource.length;
export const projectsCount = projectsSource.length;
