import { API_URL, RESULTS_PER_PAGE, KEY } from './config.js';
import { AJAX } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: {},
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    currentPage: 1,
  },
  bookmarks: [],
};
const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

    state.recipe = createRecipeObject(data);
    console.log(state.recipe);
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image_url,
        publisher: recipe.publisher,
        ...(recipe.key && { key: recipe.key }),
      };
    });
    state.search.currentPage = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.currentPage) {
  state.search.currentPage = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  // new Quantity = old Quantity * (newServings / oldServings)
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const persistBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Adding recipe to bookmarkes
  state.bookmarks.push(recipe);
  // Если кликнутый резепт === текущему рецепту в state, то добавляем/изменяем свойство bookmarked в этом резепте на true
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmark();
};
export const deleteBookmark = function (id) {
  index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmark();
};

const init = function () {
  let storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

// function only for development
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
    let ingredientsArray = [];
    let ingCount = 1;
    const ingredients = Object.entries(newRecipe).filter(
      entry => entry[0].startsWith('ingredient') /* && entry[1] !== '' */
    );
    for (let i = 0; i < ingredients.length; i = i + 3) {
      console.log(`i `,i);
      console.log(`ingCount `,ingCount);
      console.log(ingredients[i][0].startsWith(`ingredient-${ingCount}`));
      if (ingredients[i][0].startsWith(`ingredient-${ingCount}`) && ingredients[i][1] !== '') {
        let tempObj = {};
        tempObj.description = ingredients[i][1];
        tempObj.quantity = ingredients[i + 1][1] ? Number(ingredients[i + 1][1]): null;
        tempObj.unit = ingredients[i + 2][1];
        ingredientsArray.push(tempObj);
        tempObj = {};
      }
      ingCount++;
    }
    // .map((el, i) => {
    //   if (el[0].startsWith(`ingredient-${i+1}`)) {
    //    console.log('yeas');
    //   }
    // });
    // .map(ing => {
    //   ingArr = ing[1].split(',').map(el => el.trim());
    //   // if (ingArr.length !== 3) throw new Error('Please use correct format');

    //   let [quantity, unit, description] = ingArr;
    //   quantity = quantity ? Number(quantity) : null;
    //   return { quantity, unit, description };
    // });
    console.log(ingredientsArray);
    console.log(ingredients);

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: Number(newRecipe.cookingTime),
      servings: Number(newRecipe.servings),
      ingredients: ingredientsArray,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
