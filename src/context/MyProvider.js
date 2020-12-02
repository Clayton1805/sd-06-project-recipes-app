import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import mealsContext from './MealsContext';
import { getAllDrinkTypesApi, getFilteredDrinksApi,
  getDrinksAlcoholic } from '../services/drinksAPI';
import { getAllRecipeTypesApi, getFilteredRecipesApi } from '../services/mealsAPI';

function MyProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [alcoholic, setAlcoholic] = useState([]);
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [glasses, setGlasses] = useState([]);
  const [disable, setDisable] = useState(true);
  const [user, setUser] = useState({ email: '' });
  const [showSearchBar, setSearchBar] = useState(false);
  const [recommendedMeals, setRecommendedMeals] = useState();
  const [recommendedDrinks, setRecommendedDrinks] = useState();
  const [cardsRecipe, setCardsRecipe] = useState([]);
  const [drinksAlcoholic, setDrinksAlcoholic] = useState({});
  const [recipeMeal, setRecipeMeal] = useState();
  const [recipeDrink, setRecipeDrink] = useState();
  const [ingredientsExplorer, setIngredientsExplorer] = useState([]);

  // async function verifyRecommendedRecipes() {
  //   const inditialIndex = 0;
  //   const quantityRecipes = 6;
  //   if (recommendedMeals[0] === undefined) {
  //     const resultRecommendedMeals = await getRecipesMealsApi();
  //     const myRecommendedMeals = resultRecommendedMeals
  //       .slice(inditialIndex, quantityRecipes);
  //     console.log('array vazio', myRecommendedMeals);
  //     setRecommendedMeals(myRecommendedMeals);
  //   }
  //   if (recommendedDrinks[0] === undefined) {
  //     const resultRecommendedDrinks = await getRecipeDrinksApi();
  //     const myRecommendedDrinks = resultRecommendedDrinks
  //       .slice(inditialIndex, quantityRecipes);
  //     setRecommendedDrinks(myRecommendedDrinks);
  //   }
  // }

  useEffect(() => {
    async function fetchALL() {
      const myCategories = await getAllRecipeTypesApi('c');
      const myAreas = await getAllRecipeTypesApi('a');
      const myIngredients = await getAllRecipeTypesApi('i');
      setCategories(myCategories);
      setAreas(myAreas);
      setIngredients(myIngredients);

      const myDrinkCategories = await getAllDrinkTypesApi('c');
      const myAlcoholic = await getAllDrinkTypesApi('a');
      const myDrinkIngredients = await getAllDrinkTypesApi('i');
      const myGlasses = await getAllDrinkTypesApi('g');
      const myDrinksAlcoholic = await getDrinksAlcoholic();
      setDrinkCategories(myDrinkCategories);
      setAlcoholic(myAlcoholic);
      setDrinkIngredients(myDrinkIngredients);
      setGlasses(myGlasses);
      setDrinksAlcoholic(myDrinksAlcoholic);

      // Cria Local storage de Receitas Feitas
      if (localStorage.getItem('doneRecipes') === null) {
        const newArrayDoneRecipes = [];
        localStorage.setItem('doneRecipes', JSON.stringify(newArrayDoneRecipes));
      }
      // Cria Local storage de Receitas Favoritas
      if (localStorage.getItem('favoriteRecipes') === null) {
        const newArrayFavorite = [];
        localStorage.setItem('favoriteRecipes', JSON.stringify(newArrayFavorite));
      }
      // Cria Local storage de Receitas em progresso
      if (localStorage.getItem('inProgressRecipes') === null) {
        const newObjectInProgress = { cocktails: {}, meals: {} };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newObjectInProgress));
      }
    }
    fetchALL();
  }, []);

  const contextValue = {
    categories,
    areas,
    ingredients,
    drinkCategories,
    alcoholic,
    drinkIngredients,
    glasses,
    disable,
    ingredientsExplorer,
    setDisable,
    user,
    setUser,
    showSearchBar,
    setSearchBar,
    recommendedMeals,
    setRecommendedMeals,
    recommendedDrinks,
    setRecommendedDrinks,
    getFilteredRecipesApi,
    getFilteredDrinksApi,
    cardsRecipe,
    setCardsRecipe,
    drinksAlcoholic,
    recipeMeal,
    setRecipeMeal,
    recipeDrink,
    setRecipeDrink,
    setIngredients,
    setDrinkIngredients,
    setIngredientsExplorer,
  };

  return (
    <mealsContext.Provider value={ contextValue }>
      {children}
    </mealsContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
