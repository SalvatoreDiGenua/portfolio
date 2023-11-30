import { createReducer } from "@ngrx/store";
import { Experience } from "src/shared/models/sdg-portfolio-models";

const defaultExperience: Experience[] = [
    {
        company: 'SCAI Tecno',
        employment: 'Web Developer',
        permanence: '2023 / in progress',
        siteUrl: 'https://www.grupposcai.it/company/scai-tecno/',
        faviconUrl: '/assets/experience-icons/scai_tecno/logo_scai_tecno.svg',
        stack: ['JavaScript', 'HTML5', 'CSS3', 'Angular(2+)', 'Typescript', 'NgRx', 'RxJs', 'Bootstrap']
    },
    {
        company: 'ACCA Software',
        employment: 'Web Developer',
        permanence: '2019 / 2023',
        siteUrl: 'https://acca.it',
        faviconUrl: '/assets/experience-icons/acca/logo_acca.svg',
        stack: ['JavaScript', 'HTML5', 'CSS3', 'Angular(2+)', 'Typescript', 'NgRx', 'RxJs', 'NodeJS']
    }
]

export const experienceReducer = createReducer(defaultExperience)
