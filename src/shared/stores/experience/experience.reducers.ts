import { createReducer } from "@ngrx/store";
import { Experience } from "src/shared/models/sdg-portfolio-models";

const defaultExperience: Experience[] = [
    {
        company: 'SCAI Tecno',
        employment: 'Frontend Developer | Angular',
        permanence: '2023 / in progress',
        siteUrl: 'https://www.grupposcai.it/company/scai-tecno/',
        faviconUrl: '/assets/experience-icons/scai_tecno/logo_scai_tecno.svg',
        description: `Mi occupo dello sviluppo di un'applicazione finanziaria focalizzata sulla gestione del recupero crediti. 
                      Per la parte di Frontend ho utilizzato il framework Angular abbinato ad RxJS, come componentistica PrimeNG e come framework grafico Bootstrap. In aggiunta ho utilizzato Cypress per la creazione di automation testing per assicurare elevati standard di affidabilità e performance dell'applicazione.`,
        stack: ['JavaScript', 'HTML5', 'CSS3', 'Angular', 'Typescript', 'NgRx', 'RxJs', 'Bootstrap', 'Cypress'],
    },
    {
        company: 'ACCA Software',
        employment: 'Full Stack Developer',
        permanence: '2019 / 2023',
        siteUrl: 'https://acca.it',
        faviconUrl: '/assets/experience-icons/acca/logo_acca.svg',
        description: `Mi sono occupato dello sviluppo di servizi e soluzioni in ambito cloud, in particolar modo ho sviluppato la parte di Frontend con qualche task sulla parte di Backend. Punto di riferimento di questo lavoro è la piattaforma usBIM.com sulla quale sono pubblicati i suddetti servizi come, ad esempio, un applicativo per la gestione del lavoro organizzandolo in "cose da fare" con un interfaccia di tipo Kanban per evidenziare il ciclo di vita dei propri topic da eseguire. 
                      Per la parte di Frontend ho utilizzato il framework Angular abbinato ad RxJS, come componentistica Angular Material e DevExpress. 
                      Per la parte di Backend ho utilizzato NodeJS abbinato al framework ExpressJS per la creazione delle API. Ho gestito anche il “real time” tramite la libreria Socket.IO tramite interazioni lato frontend e backend. Infine ho utilizzato MySQL come database relazionale.`,
        stack: ['JavaScript', 'HTML5', 'CSS3', 'Angular', 'Typescript', 'NgRx', 'RxJs', 'NodeJS', 'ExpressJS', 'SocketIO', 'MySQL']
    }
]

export const experienceReducer = createReducer(defaultExperience)
