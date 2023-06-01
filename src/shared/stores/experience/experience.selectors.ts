import { Experience, PortfolioState } from "src/shared/models/sdg-portfolio-models";

export const getExperience = (state: PortfolioState): Experience[] => state.experience;
