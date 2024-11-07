import { createReducer } from "@ngrx/store";
import { Experience } from "src/shared/models/sdg-portfolio-models";

const defaultExperience: Experience[] = [
    {
        company: 'SCAI Tecno',
        employment: 'Frontend Developer | Angular',
        permanence: '2023 / in progress',
        siteUrl: 'https://www.grupposcai.it/company/scai-tecno/',
        faviconUrl: '/assets/experience-icons/scai_tecno/logo_scai_tecno.svg',
        description: `Sviluppo di un'applicazione finanziaria focalizzata sulla gestione del recupero crediti.
                      Per la parte di Frontend ho utilizzato il framework Angular abbinato ad RxJS, come componentistica PrimeNG e come framework grafico Bootstrap. L'applicazione, inoltre, è strutturata in Micro-Frontend per gestire al meglio ogni modulo indipendentemente dall'altro.
                      In aggiunta ho utilizzato Cypress per la creazione di automation testing per assicurare elevati standard di affidabilità e performance dell'applicazione.
                      Il tutto gestito in modalità AGILE.`,
        stack: ['JavaScript', 'HTML5', 'CSS3', 'Angular', 'Typescript', 'NgRx', 'RxJS', 'Bootstrap', 'PrimeNG', 'Cypress', 'AGILE'],
    },
    {
        company: 'ACCA Software',
        employment: 'Full Stack Developer',
        permanence: '2019 / 2023',
        siteUrl: 'https://acca.it',
        faviconUrl: '/assets/experience-icons/acca/logo_acca.svg',
        description: `Sviluppo di servizi e soluzioni in ambito cloud, in particolar modo ho sviluppato la parte di Frontend con qualche task sulla parte di Backend.
                      Punto di riferimento di questo lavoro è la piattaforma usBIM.com sulla quale sono pubblicati i suddetti servizi come, ad esempio, un applicativo per la gestione del lavoro organizzandolo in "cose da fare" con un interfaccia di tipo Kanban per evidenziare il ciclo di vita dei propri topic da eseguire. 
                      Per la parte di Frontend ho utilizzato il framework Angular abbinato ad RxJS, come componentistica Angular Material e DevExpress. 
                      Per la parte di Backend ho utilizzato NodeJs abbinato al framework ExpressJs per la creazione delle API. Ho gestito anche il “real time” tramite la libreria SocketIo tramite interazioni lato frontend e backend. Infine ho utilizzato MySQL come database relazionale.
                      Il tutto gestito in modalità AGILE.`,
        stack: ['JavaScript', 'HTML5', 'CSS3', 'Angular', 'Typescript', 'NgRx', 'Angular Material', 'RxJS', 'DevExpress', 'NodeJs', 'ExpressJs', 'SocketIo', 'MySQL', 'AGILE']
    }
]

export const experienceReducer = createReducer(defaultExperience)
