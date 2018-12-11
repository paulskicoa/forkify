import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/* Global state of the app
search object
Current recipe object
Shopping list object
Liked recipes
*/
const state = {};

const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput();
  console.log(query);

  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    // 4) Search for recipes
    await state.search.getResults();

    // 5) Render results on UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};

const controlRecipe = async () => {
  // 1) Get ID of clicked recipe
  const r = new Recipe(46956);
  await r.getRecipe();
  console.log(r);
};
controlRecipe();

elements.searchForm.addEventListener('submit', (event) => {
  // Stop automatic page load
  event.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', (event) => {
  /* Use closest() so that clicks on the button, svg,
   * or span all count as clicks on just the button */
  const btn = event.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});
