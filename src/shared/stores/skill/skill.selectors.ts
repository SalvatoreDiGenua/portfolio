import { PortfolioState, Skill } from "src/shared/models/sdg-portfolio-models";

export const getSkill = (state: PortfolioState): Skill[] => state.skill;
