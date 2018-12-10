import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResList.innerHTML = '';
};

const limitRecipeTitle = (title, limit = 17) => {
  const limitedTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if ((acc + cur).length <= limit) {
        limitedTitle.push(cur);
      }
      // return value used as acc for next iteration
      return acc + cur;
    }, '');
    return `${limitedTitle.join(' ')}...`;
  }
  return title;
};

const renderRecipe = (recipe) => {
  const markup = (
    `
    <li>
      <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
      </a>
    </li>
    `
  );
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// Takes an array of recipes that we get from the API
export const renderResults = (recipes) => {
  // forEach automatically called with current el as arg
  recipes.forEach(renderRecipe);
};
