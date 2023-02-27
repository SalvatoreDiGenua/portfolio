import { PortfolioState } from "src/app/app.module";
import { TypeTheme } from "../theme.service";

export const getTheme = (state: PortfolioState): TypeTheme => state.theme;