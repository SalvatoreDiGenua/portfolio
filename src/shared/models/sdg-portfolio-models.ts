export enum TypeTheme {
    SDG_THEME_LIGHT = 'sdg-theme-light',
    SDG_THEME_DARK = 'sdg-theme-dark'
}

export interface Skill {
    name: string;
    iconUrl: string;
}

export interface Experience {
    company: string;
    employment: string;
    siteUrl: string;
    faviconUrl: string;
    permanence: string;
    stack: string[];
}

export interface Social {
    name: string;
    iconUrl: string;
    socialUrl: string;
}

export interface PortfolioState {
    theme: TypeTheme;
    skill: Skill[];
    experience: Experience[];
    social: Social[];
}