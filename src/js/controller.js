import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import addRecipeView from './views/addRecipeView.js';
import Pagination from './views/paginationView.js';

import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import { TIMEOUT } from 'dns';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    // 0 update reults to mark selected
    resultsView.update(model.getSearchResultsPage())

    if (!id) return;
    recipeView.renderSpinner();


    // 2) Loading recipe
    await model.loadRecipe(id);

    // 3) Rendering recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
    
    // 2) Load search results
    await model.loadSearchResults(query);
    
    // 3) Render results
    resultsView.render(model.getSearchResultsPage(6));
    
    // init pagination buttons
    Pagination.render(model.state.search)
    
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // init pagination buttons
  Pagination.render(model.state.search)
  
};


const controlAddRecipe = async function (newRecipe) {
  try {

    addRecipeView.renderSpinner()

    await model.uploadRecipe(newRecipe)

    console.log(newRecipe)
    // Show loading spinner
    addRecipeView.renderSpinner();
    
    
    // Render recipe
    recipeView.render(model.state.recipe);
    
    // Success message
    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks)

    // Change ID url
    window.history.pushState(null, '', `#${model.state.recipe.id}`)

  setTimeout(() => {
    addRecipeView.toggleWindow();
  }, MODAL_CLOSE_SEC * 1000);    
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};

const controlServing = (dataServing) => {
  model.updateServing(dataServing);
  
  // Render recipe
  recipeView.update(model.state.recipe);
}

const bookmarkController = () => {
  model.addBookmark(model.state.recipe)

    // Render recipe
    recipeView.render(model.state.recipe);

    //model.loadRecipe.apply(model.state.recipe.id)

        // Render bookmark
        bookmarksView.render(model.state.bookmarks);

}
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  recipeView.addBookmarkHandler(bookmarkController);
  paginationView.addHandlerBtn(controlPagination)
  recipeView.addHandlerUpdateServing(controlServing)
};
init();
