export interface ExperienceItem { key: string; tags: string[]; }
export interface EducationItem { key: string; }
export interface SkillGroup { title: string; items: string[]; }
export const PROFILE = { name: 'Salvatore Di Genua', title: 'Senior Frontend Engineer - Angular Specialist', subtitle: 'AI-Assisted Development & Team Leadership', location: 'Benevento, Campania, Italia', email: 'saldigenua@gmail.com', phone: '+39 327 7868017', linkedin: 'https://www.linkedin.com/', summary: "Sviluppo applicazioni web dal 2019, con specializzazione in Angular e TypeScript e nelle funzionalità più recenti del framework, tra cui Signals e Standalone Components. Ho lavorato sia come sviluppatore che come team lead su progetti fintech e piattaforme cloud, occupandomi di architettura, sviluppo, qualità del codice e collaborazione con clienti e stakeholder. Integro Cursor, Antigravity, Claude Code e OpenCode nel flusso quotidiano; uso skills personalizzate e server MCP per rendere code generation, refactoring e documentazione più precisi e coerenti con l'architettura del progetto." };
export const EXPERIENCES: ExperienceItem[] = [
  { key: 'experience.items.orbyta', tags: ['Angular','Signals','RxJS','NgRx','PrimeNG','Tailwind','STOMP'] },
  { key: 'experience.items.scai', tags: ['Angular','RxJS','Micro-Frontend','Cypress','Team Leadership'] },
  { key: 'experience.items.acca', tags: ['Angular','Node.js','Express.js','Socket.IO','MySQL'] }
];
export const EDUCATION: EducationItem[] = [
  { key: 'education.items.master' },
  { key: 'education.items.degree' },
  { key: 'education.items.diploma' }
];
export const SKILLS: SkillGroup[] = [
  { title: 'Frontend & Framework', items: ['Angular','TypeScript','Signals','Standalone Components','Change Detection','RxJS','NgRx / Redux','React'] },
  { title: 'UI & Librerie', items: ['HTML5','CSS3','SCSS','Tailwind CSS','Angular Material','PrimeNG','Bootstrap','MUI','DevExpress'] },
  { title: 'Testing & Qualità', items: ['Cypress E2E','Karma / Jasmine','Code Review','Refactoring'] },
  { title: 'Backend', items: ['REST API','Node.js','Express.js','Socket.IO','MySQL'] },
  { title: 'AI-Assisted Development', items: ['Cursor','Antigravity','Claude Code','OpenCode','Custom Skills','MCP Servers'] },
  { title: 'Metodologie', items: ['Scrum / Agile','CI/CD','Micro-Frontend','Team Leadership','Mentoring Tecnico'] }
];
