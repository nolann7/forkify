import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRacipeView from './views/addRacipeView.js';

// import 'core.js';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2
// this is parcel not js (apply only in development)
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    // получаем hash из ссылки
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 0) update results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());
    // 1) updating bookmarks
    bookmarksView.update(model.state.bookmarks);
    // 2) loading receipe
    await model.loadRecipe(id);
    // 3) reneder recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    // 1) Get query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    // 2) load results of the query
    await model.loadSearchResults(query);

    // 3) render results
    resultsView.render(model.getSearchResultsPage());

    // 4) render pagination

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (goTo) {
  // 1) render NEW results
  resultsView.render(model.getSearchResultsPage(goTo));
  // 2) render NEW pagination
  paginationView.render(model.state.search);
};
const controlServings = function (servings) {
  // Update recipe servings in state
  model.updateServings(servings);
  // Update rendering recipeView
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  // 1) Add/delete bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else model.deleteBookmark(model.state.recipe.id);
  // 2) render icon of a bookmark
  recipeView.update(model.state.recipe);
  // 3) render list of bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const initRenderBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const controlRecipeUpload = async function (newRecipe) {
  try {
    // 1) render spinner
    addRacipeView.renderSpinner();
    // 2) upload new recipe data
    await model.uploadRecipe(newRecipe);
    // 3) render recipe
    recipeView.render(model.state.recipe);
    // 4) success message
    addRacipeView.renderMessage();
    // 5) render bookmark view
    bookmarksView.render(model.state.bookmarks);
    // 6) change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // 7) close form window
    setTimeout(function () {
      addRacipeView.toggleWindow();
    }, 2500);
  } catch (err) {
    addRacipeView.renderError(err.message);
  }
};

const newFeature = function () {
  console.log('Welcome to the application');
  console.log('new line');
};
const init = function () {
  bookmarksView.addHandlerRender(initRenderBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRacipeView.addRecipeUpload(controlRecipeUpload);
  newFeature();
  
};
init();
