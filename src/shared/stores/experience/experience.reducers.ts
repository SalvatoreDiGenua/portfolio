import { createReducer } from "@ngrx/store";
import { Experience } from "src/shared/models/sdg-portfolio-models";

const defaultExperience: Experience[] = [
    {
        company: 'SCAI Tecno',
        employment: 'Frontend Developer | Angular',
        permanence: '2023 / in progress',
        siteUrl: 'https://www.grupposcai.it/company/scai-tecno/',
        faviconUrl: '/assets/experience-icons/scai_tecno/logo_scai_tecno.svg',
        stack: ['JavaScript', 'HTML5', 'CSS3', 'Angular(2+)', 'Typescript', 'NgRx', 'RxJs', 'Bootstrap', 'Cypress']
    },
    {
        company: 'ACCA Software',
        employment: 'Full Stack Developer',
        permanence: '2019 / 2023',
        siteUrl: 'https://acca.it',
        faviconUrl: '/assets/experience-icons/acca/logo_acca.svg',
        stack: ['JavaScript', 'HTML5', 'CSS3', 'Angular(2+)', 'Typescript', 'NgRx', 'RxJs', 'NodeJS', 'ExpressJS', 'SocketIO', 'MySQL']
    }
]

export const experienceReducer = createReducer(defaultExperience)
