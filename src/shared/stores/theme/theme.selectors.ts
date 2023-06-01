import { PortfolioState, TypeTheme } from "src/shared/models/sdg-portfolio-models";

export const getTheme = (state: PortfolioState): TypeTheme => state.theme;