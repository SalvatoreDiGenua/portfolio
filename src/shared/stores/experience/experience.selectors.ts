import { Experience, PortfolioState } from "src/shared/models/sdg-portfolio-models";

export const getExperience = (state: PortfolioState): Experience[] =>
  state.experience.map(el => (
    {
      ...el,
      description: el.stack.reduce((acc, el) =>
        acc = acc.replaceAll(el, `<strong class="experience-details__description-text-skill">${el}</strong>`), el.description
      )
    }
  )
  );
