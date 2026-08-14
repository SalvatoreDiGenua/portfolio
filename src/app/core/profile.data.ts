export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

export interface EducationItem {
  title: string;
  institution: string;
  period: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export const PROFILE = {
  name: 'Salvatore Di Genua',
  title: 'Senior Frontend Engineer - Angular Specialist',
  subtitle: 'AI-Assisted Development & Team Leadership',
  location: 'Benevento, Campania, Italia',
  email: 'saldigenua@gmail.com',
  phone: '+39 327 7868017',
  linkedin: 'https://www.linkedin.com/',
  summary:
    "Sviluppo applicazioni web dal 2019, con specializzazione in Angular e TypeScript e nelle funzionalità più recenti del framework, tra cui Signals e Standalone Components. Ho lavorato sia come sviluppatore che come team lead su progetti fintech e piattaforme cloud, occupandomi di architettura, sviluppo, qualità del codice e collaborazione con clienti e stakeholder. Integro Cursor, Antigravity, Claude Code e OpenCode nel flusso quotidiano; uso skills personalizzate e server MCP per rendere code generation, refactoring e documentazione più precisi e coerenti con l'architettura del progetto."
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: 'Senior IT Consultant - Frontend & Application Architecture',
    company: 'Orbyta Tech',
    period: '2025 — Oggi',
    description:
      "Consulenza frontend per applicazioni web moderne e performanti. Sviluppo con Angular avanzato, Signals, RxJS, NgRx, PrimeNG, Tailwind e Bootstrap; definizione dell'architettura insieme al cliente e gestione autonoma di priorità e consegna. Integrazione con backend Java e funzionalità real-time tramite STOMP. Utilizzo Cursor, OpenCode, server MCP e skills per supportare scrittura, revisione e refactoring del codice.",
    tags: ['Angular', 'Signals', 'RxJS', 'NgRx', 'PrimeNG', 'Tailwind', 'STOMP']
  },
  {
    role: 'Senior Frontend Developer & Team Lead',
    company: 'SCAI Tecno',
    period: '2023 — 2025',
    description:
      "Guida del team frontend nello sviluppo di un'applicazione per la gestione del recupero crediti, basata su architettura Micro-Frontend. Lavoro con Angular, RxJS, PrimeNG e Bootstrap e implementazione di test end-to-end con Cypress sui flussi principali, riducendo il rischio di regressioni durante i rilasci. Mentoring tecnico, best practice, code review e allineamento agli obiettivi di business in contesto Agile.",
    tags: ['Angular', 'RxJS', 'Micro-Frontend', 'Cypress', 'Team Leadership']
  },
  {
    role: 'Full Stack Developer',
    company: 'ACCA Software S.p.A.',
    period: '2019 — 2023',
    description:
      'Sviluppo del frontend Angular abbinato a RxJS di usBIM.com, applicazione Kanban per la gestione dei workflow, con Angular Material e DevExpress. Integrazione di API REST con Node.js ed Express.js, funzionalità real-time con Socket.IO e persistenza con MySQL in un contesto Agile.',
    tags: ['Angular', 'Node.js', 'Express.js', 'Socket.IO', 'MySQL']
  }
];

export const EDUCATION: EducationItem[] = [
  {
    title: 'Master in AI Engineering',
    institution: 'eCampus Digital School',
    period: '2025 — in corso'
  },
  {
    title: 'Laurea Triennale in Ingegneria Informatica e dell\'Automazione',
    institution: 'Università telematica eCampus',
    period: '2022 — 2024'
  },
  {
    title: 'Diploma di Perito Informatico',
    institution: "IISS Rinaldo D'Aquino, Montella",
    period: '2014 — 2019'
  }
];

export const SKILLS: SkillGroup[] = [
  {
    title: 'Frontend & Framework',
    items: ['Angular', 'TypeScript', 'Signals', 'Standalone Components', 'Change Detection', 'RxJS', 'NgRx / Redux', 'React']
  },
  {
    title: 'UI & Librerie',
    items: ['HTML5', 'CSS3', 'SCSS', 'Tailwind CSS', 'Angular Material', 'PrimeNG', 'Bootstrap', 'MUI', 'DevExpress']
  },
  {
    title: 'Testing & Qualità',
    items: ['Cypress E2E', 'Karma / Jasmine', 'Code Review', 'Refactoring']
  },
  {
    title: 'Backend',
    items: ['REST API', 'Node.js', 'Express.js', 'Socket.IO', 'MySQL']
  },
  {
    title: 'AI-Assisted Development',
    items: ['Cursor', 'Antigravity', 'Claude Code', 'OpenCode', 'Custom Skills', 'MCP Servers']
  },
  {
    title: 'Metodologie',
    items: ['Scrum / Agile', 'CI/CD', 'Micro-Frontend', 'Team Leadership', 'Mentoring Tecnico']
  }
];
