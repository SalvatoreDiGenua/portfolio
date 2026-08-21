export interface Profile {
  readonly name: string;
  readonly title: string;
  readonly subtitle: string;
  readonly location: string;
  readonly email: string;
  readonly linkedin: string;
  readonly summary: string;
}

export interface ExperienceItem {
  readonly key: string;
  readonly tags: readonly string[];
}

export interface EducationItem {
  readonly key: string;
}

export interface SkillGroup {
  readonly key: string;
  readonly items: readonly string[];
}

export interface ProjectItem {
  readonly key: string;
  readonly name: string;
  readonly category: string;
  readonly tags: readonly string[];
  readonly repositoryUrl: string;
  readonly liveUrl: string;
  readonly liveLabel: string;
  readonly accent: 'primary' | 'accent';
}

export const PROFILE: Profile = {
  name: 'Salvatore Di Genua',
  title: 'Senior Frontend Engineer - Angular Specialist',
  subtitle: 'AI-Assisted Development & Team Leadership',
  location: 'Montella, Campania, Italia',
  email: 'salvatoredigenua.developer@gmail.com',
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

export const PROJECTS: readonly ProjectItem[] = [
  {
    key: 'projects.angular',
    name: 'angular-boilerplate',
    category: 'Angular',
    tags: ['Angular', 'Signals', 'SSR', 'Hydration', 'Tailwind CSS'],
    repositoryUrl: 'https://github.com/SalvatoreDiGenua/angular-boilerplate',
    liveUrl:
      'https://stackblitz.com/fork/github/SalvatoreDiGenua/angular-boilerplate/tree/main?startScript=start&title=Angular%20Boilerplate',
    liveLabel: 'projects.liveDemo',
    accent: 'primary',
  },
  {
    key: 'projects.requestLock',
    name: 'ngx-request-lock',
    category: 'Angular Library',
    tags: ['Angular', 'Signals', 'HttpClient', 'Interceptors'],
    repositoryUrl: 'https://github.com/SalvatoreDiGenua/ngx-request-lock-docs',
    liveUrl: 'https://ngx-request-lock-docs.netlify.app/',
    liveLabel: 'projects.documentation',
    accent: 'accent',
  },
];
