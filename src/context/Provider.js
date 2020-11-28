import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import Context from './Context';
import fetchMeal from '../services/fetchMeal';
import fetchDrink from '../services/fetchDrink';

function RecipesAppProvider({ children }) {
  const [details, setDetails] = useState('');
  const [recommended, setRecommended] = useState('');
  const [random, setRandom] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [fav, setFav] = useState([]);
  const [heart, setHeart] = useState('');
  const [copied, setCopied] = useState('');

  const isFavorite = (id) => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!local) return setHeart('white');
    const match = local.filter((item) => item.id === id);
    return (match.length >= 1 ? setHeart('black') : setHeart('white'));
  };

  const favorite = (recipe, path, id) => {
    const ZERO = 0;
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const one = local ? local.filter((item) => item.id === id) : '';
    const compare = path.includes('comida');
    const newFav = {
      id: compare ? recipe.idMeal : recipe.idDrink,
      type: compare ? 'comida' : 'bebida',
      area: compare ? recipe.strArea : '',
      category: recipe.strCategory,
      alcoholicOrNot: compare ? '' : recipe.strAlcoholic,
      name: compare ? recipe.strMeal : recipe.strDrink,
      image: compare ? recipe.strMealThumb : recipe.strDrinkThumb,
    };

    const localFavorite = one.length > ZERO
      ? local.filter((item) => item.id !== id)
      : [
        ...(!local ? '' : local),
        newFav,
      ];

    setFav([
      ...fav,
      newFav,
    ]);

    localStorage.setItem('favoriteRecipes', JSON.stringify(localFavorite));
  };

  const share = (url) => {
    const time = 3000;
    copy(`http://localhost:3000${url}`);
    setCopied('copy');
    setTimeout(() => setCopied(false), time);
  };

  const recipesToRender = async (type) => {
    let fetchedRecipes = await (type === 'meal'
      ? fetchMeal('name')
      : fetchDrink('name')
    );
    const first = 0;
    const twelfth = 12;

    fetchedRecipes = fetchedRecipes.slice(first, twelfth);
    setRecipes(fetchedRecipes);
  };

  const categoriesToRender = async (type) => {
    let categoriesList = await (type === 'meal'
      ? fetchMeal('allCategories')
      : fetchDrink('allCategories')
    );
    const first = 0;
    const fifth = 5;

    categoriesList = categoriesList.slice(first, fifth);
    setCategories(categoriesList);
  };

  const recipesToRenderByCategory = async (type, searchTerm) => {
    let fetchedRecipes = await (type === 'meal'
      ? fetchMeal('category', searchTerm)
      : fetchDrink('category', searchTerm)
    );
    const first = 0;
    const twelfth = 12;

    fetchedRecipes = fetchedRecipes.slice(first, twelfth);
    setRecipes(fetchedRecipes);
  };

  const getMealDetail = async (id) => {
    const api = await fetchMeal('details', id);
    setDetails(api);
  };

  const getDrinkDetail = async (id) => {
    const api = await fetchDrink('details', id);
    setDetails(api);
  };

  const getRecommendedDrink = async () => {
    const api = await fetchDrink('name', '');
    setRecommended(api);
  };

  const getRecommendedMeal = async () => {
    const api = await fetchMeal('name', '');
    setRecommended(api);
  };

  const getRandomDrink = async () => {
    const api = await fetchDrink();
    setRandom(api);
  };

  const getRandomMeal = async () => {
    const api = await fetchMeal();
    setRandom(api);
  };

  const contextValue = {
    getMealDetail,
    getDrinkDetail,
    getRecommendedDrink,
    getRecommendedMeal,
    getRandomDrink,
    getRandomMeal,
    favorite,
    isFavorite,
    share,
    copied,
    fav,
    heart,
    details,
    recommended,
    random,
    recipes,
    recipesToRender,
    categories,
    categoriesToRender,
    recipesToRenderByCategory,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

RecipesAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipesAppProvider;
