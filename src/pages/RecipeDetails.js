import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Cards from '../components/Cards';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetails(props) {
  const {
    getMealDetail,
    getDrinkDetail,
    getRandomDrink,
    getRandomMeal,
    details,
    random,
  } = useContext(Context);
  const { match: { path, params } } = props;
  const [fav, setFav] = useState('white');

  useEffect(() => {
    if (path === '/comidas/:id') {
      getMealDetail(params.id);
      getRandomDrink();
    } else {
      getDrinkDetail(params.id);
      getRandomMeal();
    }
  }, [params.id]);

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
            />
            <input
              type="image"
              src={ fav === 'white' ? whiteHeartIcon : blackHeartIcon }
              data-testid="favorite-btn"
              alt={ fav === 'white' ? 'whiteHeartIcon' : 'blackHeartIcon' }
              onClick={ () => (fav === 'white' ? setFav('black') : setFav('white')) }
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
            { !random ? <p>LOADING...</p>
              : random.slice(0, 6).map((info, index) => (
                <div data-testid={ `${index}-recomendation-card` }>
                  <Cards
                    key={ index }
                    recipe={ path === '/comidas/:id' ? 'bebidas' : 'comidas' }
                    info={ info }
                    index={ index }
                  />
                </div>
                ))}
            <button
              type="button"
              data-testid="start-recipe-btn"
            >
              Iniciar Receita
            </button>
          </div>))}
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default RecipeDetails;
