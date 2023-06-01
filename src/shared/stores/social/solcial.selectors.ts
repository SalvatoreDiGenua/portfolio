import { PortfolioState, Social } from "src/shared/models/sdg-portfolio-models";

export const getSocial = (state: PortfolioState): Social[] => state.social;
