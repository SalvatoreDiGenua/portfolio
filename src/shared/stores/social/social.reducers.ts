import { createReducer } from "@ngrx/store";
import { Social } from "src/shared/models/sdg-portfolio-models";

const defaultSocial: Social[] = [
    {
        name: 'Instagram',
        iconUrl: '/assets/social-icons/instagram.svg',
        socialUrl: 'https://www.instagram.com/salvatore_di_genua/'
    },
    {
        name: 'Facebook',
        iconUrl: '/assets/social-icons/facebook.svg',
        socialUrl: 'https://www.facebook.com/profile.php?id=100008219641807'
    },
    {
        name: 'LinkedIn',
        iconUrl: '/assets/social-icons/linkedin.svg',
        socialUrl: 'https://www.linkedin.com/in/salvatore-di-genua-b664b716a'
    },
    {
        name: 'WhatsApp',
        iconUrl: '/assets/social-icons/whatsapp.svg',
        socialUrl: 'https://api.whatsapp.com/send?phone=3277868017'
    },
    {
        name: 'GitHub',
        iconUrl: '/assets/social-icons/github.svg',
        socialUrl: 'https://github.com/SalvatoreDiGenua'
    },
]

export const socialReducer = createReducer(defaultSocial)
