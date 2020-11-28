import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../App.css';
import Context from '../context/Context';
import Cards from '../components/Cards';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetails(props) {
  const {
    getMealDetail,
    getDrinkDetail,
    getRecommendedDrink,
    getRecommendedMeal,
    favorite,
    isFavorite,
    fav,
    heart,
    share,
    copied,
    details,
    recommended,
  } = useContext(Context);
  const { match: { path, params, url } } = props;

  const ZERO = 0;
  const SIX = 6;

  useEffect(() => {
    if (path === '/comidas/:id') {
      getMealDetail(params.id);
      getRecommendedDrink();
    } else {
      getDrinkDetail(params.id);
      getRecommendedMeal();
    }
    isFavorite(params.id);
  }, [params.id, fav]);

  const getIngredients = (obj, filter) => {
    const keys = [];
    Object.keys(obj).forEach((key) => {
      if (key && filter.test(key) && obj[key] !== '' && obj[key] !== null) {
        keys.push(obj[key]);
      }
    });
    return keys;
  };

  const getVideoId = (link) => link.split('=').pop();

  return (
    <div>
      <h1>Página de Details</h1>
      {!details ? <p>LOADING...</p>
        : details.map((recipe) => (
          <div key={ recipe }>
            <img
              src={ path === '/comidas/:id' ? recipe.strMealThumb : recipe.strDrinkThumb }
              alt="recipe_image"
              className="recipeImage"
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">
              {path === '/comidas/:id' ? recipe.strMeal : recipe.strDrink}
            </h1>
            <input
              type="image"
              src={ shareIcon }
              data-testid="share-btn"
              alt="share-icon"
              onClick={ () => share(url) }
            />
            { copied ? <span>Link copiado!</span> : '' }
            <input
              type="image"
              src={ heart === 'white' ? whiteHeartIcon : blackHeartIcon }
              data-testid="favorite-btn"
              alt={ heart === 'white' ? 'whiteHeartIcon' : 'blackHeartIcon' }
              onClick={ () => favorite(recipe, path, params.id) }
            />
            <p data-testid="recipe-category">
              {path === '/comidas/:id' ? recipe.strCategory : recipe.strAlcoholic}
            </p>
            <h2>Ingredients</h2>
            {getIngredients(recipe, /strIngredient/).map((item, index) => {
              const measure = getIngredients(recipe, /strMeasure/);
              return (
                <p
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`- ${item} - ${measure[index]} `}
                </p>
              );
            })}
            <h2>Intructions</h2>
            <p data-testid="instructions">{ recipe.strInstructions }</p>
            {recipe.strVideo === null || recipe.strYoutube === null
              ? <p />
              : (
                <div>
                  <h2>Video</h2>
                  <iframe
                    src={ `https://www.youtube.com/embed/${getVideoId(recipe.strYoutube)}` }
                    title="Recipe_video"
                    data-testid="video"
                  />
                </div>
              )}
            <h2>Recomendadas</h2>
            <div className="recomendation">
              { !recommended ? <p>LOADING...</p>
                : recommended.slice(ZERO, SIX).map((info, index) => (
                  <Cards
                    key={ index }
                    recipe={ path === '/comidas/:id' ? 'bebidas' : 'comidas' }
                    info={ info }
                    index={ index }
                    recomendation
                  />
                ))}
            </div>
            <Link to={ `${url}/in-progress` }>
              <button
                type="button"
                className="StartRecipe"
                data-testid="start-recipe-btn"
              >
                Iniciar Receita
              </button>
            </Link>
          </div>))}
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string }),
    url: PropTypes.string,
  }).isRequired,
};

export default RecipeDetails;
