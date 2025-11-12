import Project from "../models/project.model.js";
import Qualification from "../models/qualification.model.js";

const sampleProjects = [
  {
    title: "TTC Delay Insights",
    summary: "ETL + analytics platform for Toronto transit delay data",
    description:
      "End-to-end ETL and analytics project that cleans a decade of Toronto transit delay data and loads it into PostgreSQL for SQL-first exploration and API reporting.",
    role: "Data Engineer & API Developer",
    outcome:
      "Automated ingestion for 10+ years of delay events with reusable SQL views powering parameterized reports and a React dashboard.",
    status: "In Progress",
    technologies: [
      "Python",
      "Pandas",
      "PostgreSQL",
      "Docker",
      "FastAPI",
      "React",
    ],
    highlights: [
      "Standardized mixed Excel/CSV sources into a unified fact table",
      "Containerized Postgres with seeded schema, indexes, and validation",
      "Exposed analytics endpoints through FastAPI for the Vite frontend",
    ],
    githubLink: "https://github.com/Eddie000321/ttc-delay-insights",
    liveLink: "",
    image: "/images/projects/ttc-delay-insights.svg",
  },
  {
    title: "DB Lab (Postgres Only)",
    summary: "Self-contained PostgreSQL playground",
    description:
      "Playground packaged with make targets for spinning up schemas, fixtures, and indexing experiments without impacting other environments.",
    role: "Database Engineer",
    outcome:
      "Delivered a reproducible lab that provisions schema, seeds datasets, and automates EXPLAIN-before/after benchmarks for index tuning.",
    status: "Completed",
    technologies: ["PostgreSQL", "Docker", "Make"],
    highlights: [
      "Scripted schema + seed workflows mirroring Prisma models",
      "Parameterized data generation to stress-test query plans",
      "Documented backup/restore and EXPLAIN exercises via make targets",
    ],
    githubLink: "https://github.com/Eddie000321/db-lab",
    liveLink: "",
    image: "/images/projects/db-lab.svg",
  },
  {
    title: "Dockerized Express + Prisma Todo App",
    summary: "Full-stack todo suite with session auth",
    description:
      "Full-stack to-do platform showcasing Node.js backends, culminating in a Dockerized Express + PostgreSQL + Prisma deployment with session auth.",
    role: "Full Stack Developer",
    outcome:
      "Shipped cookie-backed authentication, CRUD APIs, and container orchestration for local development with a security hardening roadmap.",
    status: "In Progress",
    technologies: ["Node.js", "Express", "PostgreSQL", "Prisma", "Docker"],
    highlights: [
      "Built progressive projects from simple REST server to full Docker stack",
      "Implemented session-based auth with HttpOnly cookies",
      "Outlined CSRF tokens and rate limiting for future hardening",
    ],
    githubLink:
      "https://github.com/Eddie000321/backend-nodejs-expressjs-postgresql",
    liveLink: "",
    image: "/images/projects/docker-prisma-todo.svg",
  },
  {
    title: "VetChart EMR System",
    summary: "Full-stack EMR for veterinary clinics",
    description:
      "Electronic medical records platform with scheduling, patient management, and operational observability dashboards.",
    role: "Full Stack Developer",
    outcome:
      "Delivered a TypeScript-first monorepo with Dockerized environments, JWT-secured APIs, and ready-to-activate PostgreSQL persistence via Prisma.",
    status: "In Progress",
    technologies: [
      "React",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Docker",
      "Tailwind CSS",
    ],
    highlights: [
      "Implemented appointment, billing, and medical record flows",
      "Added Prometheus metrics and DB health checks",
      "Prepared Prisma schema and migrations for scaling",
    ],
    githubLink: "https://github.com/Eddie000321/vet-chart",
    liveLink: "",
    image: "/images/projects/vetchart-emr.svg",
  },
];

const sampleQualifications = [
  {
    institution: "Centennial College",
    program:
      "Computer Engineering Technology - Advanced Diploma (3 Year Program)",
    status: "Currently Enrolled",
    period: "2024 - Present",
    location: "Toronto, ON, Canada",
    type: "college",
    description:
      "Comprehensive 3-year advanced diploma program covering practical computer engineering skills, programming languages, and hands-on technology projects.",
    highlights: [
      "Programming in Multiple Languages",
      "Hardware & Software Integration",
      "Network Administration",
      "Project Management",
    ],
  },
  {
    institution: "Korea National Open University",
    program: "Bachelor's Degree in Computer Science",
    status: "Transfer Student - Currently Enrolled",
    period: "2025 - Present",
    location: "Seoul, South Korea",
    type: "university",
    description:
      "Pursuing comprehensive computer science education with focus on advanced software development, algorithms, and system design.",
    highlights: [
      "Software Engineering Principles",
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Web Development Technologies",
    ],
  },
];

const upsertSampleData = async (Model, samples, buildFilter, label) => {
  for (const sample of samples) {
    await Model.findOneAndUpdate(buildFilter(sample), sample, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }
  console.info(`Seeded/updated default ${label} data`);
};

const seedPortfolioData = async () => {
  await upsertSampleData(
    Project,
    sampleProjects,
    (sample) => ({ title: sample.title }),
    "projects"
  );
  await upsertSampleData(
    Qualification,
    sampleQualifications,
    (sample) => ({ institution: sample.institution, program: sample.program }),
    "qualifications"
  );
};

export default seedPortfolioData;
