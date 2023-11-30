import { createReducer } from "@ngrx/store";
import { Skill } from "src/shared/models/sdg-portfolio-models";

const defaultSkills: Skill[] = [
    {
        name: 'JavaScript',
        iconUrl: '/assets/skills-icons/javascript.svg'
    },
    {
        name: 'HTML',
        iconUrl: '/assets/skills-icons/html5.svg'
    },
    {
        name: 'CSS',
        iconUrl: '/assets/skills-icons/css3.svg'
    },
    {
        name: 'SCSS',
        iconUrl: '/assets/skills-icons/scss.svg'
    },
    {
        name: 'Angular',
        iconUrl: '/assets/skills-icons/angular-17.svg'
    },
    {
        name: 'TypeScript',
        iconUrl: '/assets/skills-icons/typescript.svg'
    },
    {
        name: 'RxJS',
        iconUrl: '/assets/skills-icons/rxjs.svg'
    },
    {
      name: 'NgRx',
      iconUrl: '/assets/skills-icons/ngrx.svg'
    },
    {
        name: 'NodeJS',
        iconUrl: '/assets/skills-icons/nodejs.svg'
    },
    {
        name: 'SQL',
        iconUrl: '/assets/skills-icons/sql.svg'
    }
]

export const skillReducer = createReducer(defaultSkills)
