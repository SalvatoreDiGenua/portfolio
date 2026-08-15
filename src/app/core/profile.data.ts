export interface ExperienceItem {
  key: string;
  tags: string[];
}
export interface EducationItem {
  key: string;
}
export interface SkillGroup {
  key: string;
  items: string[];
}
export const PROFILE = {
  name: 'Salvatore Di Genua',
  title: 'Senior Frontend Engineer - Angular Specialist',
  subtitle: 'AI-Assisted Development & Team Leadership',
  location: 'Montella, Campania, Italia',
  email: 'saldigenua@gmail.com',
  phone: '+39 327 7868017',
  linkedin: 'https://www.linkedin.com/in/salvatore-di-genua-b664b716a',
  summary: 'about.profile.summary',
};
export const EXPERIENCES: ExperienceItem[] = [
  {
    key: 'experience.items.orbyta',
    tags: ['Angular', 'Signals', 'RxJS', 'NgRx', 'PrimeNG', 'Tailwind'],
  },
  {
    key: 'experience.items.scai',
    tags: ['Angular', 'RxJS', 'Micro-Frontend', 'Cypress', 'Team Leadership'],
  },
  {
    key: 'experience.items.acca',
    tags: ['Angular', 'Node.js', 'Express.js', 'Socket.IO', 'MySQL'],
  },
];
export const EDUCATION: EducationItem[] = [
  { key: 'education.items.master' },
  { key: 'education.items.degree' },
  { key: 'education.items.diploma' },
];
export const SKILLS: SkillGroup[] = [
  {
    key: 'skills.groups.frontend',
    items: [
      'angular',
      'typescript',
      'signals',
      'standalone',
      'changeDetection',
      'rxjs',
      'state',
      'react',
    ],
  },
  {
    key: 'skills.groups.ui',
    items: [
      'html',
      'css',
      'scss',
      'tailwind',
      'material',
      'primeng',
      'bootstrap',
      'mui',
      'devexpress',
    ],
  },
  {
    key: 'skills.groups.testing',
    items: ['cypress', 'karma', 'review', 'refactoring'],
  },
  {
    key: 'skills.groups.backend',
    items: ['rest', 'node', 'express', 'socket', 'mysql'],
  },
  {
    key: 'skills.groups.ai',
    items: [
      'cursor',
      'antigravity',
      'copilot',
      'claude',
      'opencode',
      'skills',
      'mcp',
    ],
  },
  {
    key: 'skills.groups.methods',
    items: ['scrum', 'microfrontend', 'leadership', 'mentoring'],
  },
];
