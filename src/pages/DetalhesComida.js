import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import ReceitasContext from '../context/ReceitasContext';
import DrinksCard from '../components/DrinksCard';
import Header from '../components/Header';
import { drinkAPI } from '../services/drinkAPI';
import { fetchFoodAPI } from '../services/foodAPI';
import '../style/Detalhes.css';

function DetalhesComida(props) {
  const {
    drinks, setDrinks, fetchById, setFetchById,
    beganRecipes, setBeganRecipes, doneRecipes,
  } = useContext(ReceitasContext);

  const [copied, setCopied] = useState(false);

  const { match: { params: { id } } } = props;

  const startedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const seis = 6;

  useEffect(() => {
    async function fetchDrink() {
      const responseFoodsAPI = await drinkAPI();
      const responseID = await fetchFoodAPI(id);

      setDrinks(responseFoodsAPI);
      setFetchById(responseID);
    }

    fetchDrink();
  }, []);

  const getIngredients = (obj, filter) => {
    const keys = [];

    Object.keys(obj).forEach((key) => {
      if (key && filter.test(key) && obj[key] !== '' && obj[key] !== null) {
        keys.push(obj[key]);
      }
    });
    return keys;
  };

  const startRecipe = (recipeName) => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...startedRecipes,
      meals: {
        [recipeName]: fetchById,
      },
    }));

    if (!beganRecipes.includes(recipeName)) {
      setBeganRecipes([...beganRecipes, recipeName]);
    }
  };

  const verifyState = (idMeal) => {
    if (!startedRecipes.meals) {
      return 'Iniciar Receita';
    }
    if (!startedRecipes.meals[idMeal]) {
      return 'Iniciar Receita';
    }
    return 'Continuar Receita';
  };

  const copyToCB = () => {
    const url = window.location.href;

    copy(url);
    setCopied(true);
  };

  return ((!fetchById)
    ? <div>carregando...</div>
    : (
      <section>
        <Header title="Detalhes Comidas" />
        {
          fetchById.map((meal, index) => (
            <div key={ index }>
              <img data-testid="recipe-photo" src={ meal.strMealThumb } alt="" />
              <h2 data-testid="recipe-title">{meal.strMeal}</h2>
              <div>
                <button
                  data-testid="share-btn"
                  type="button"
                  onClick={ copyToCB }
                >
                  Compartilhar
                </button>
                {copied ? 'Link copiado!' : null}
              </div>
              <button data-testid="favorite-btn" type="button">Favoritar</button>
              <p data-testid="recipe-category">{meal.strCategory}</p>
              {getIngredients(meal, /strIngredient/).map((item, indx) => {
                const measure = getIngredients(meal, /strMeasure/);
                return (
                  <p
                    key={ indx }
                    data-testid={ `${indx}-ingredient-name-and-measure` }
                  >
                    {`- ${item} - ${measure[indx]} `}
                  </p>
                );
              })}
              <p data-testid="instructions">{meal.strInstructions}</p>
              <iframe
                data-testid="video"
                src={ meal.strYoutube.replace('watch?v=', 'embed/') }
                title="frame"
              />
              <h2>Receitas Recomendadas</h2>
              <div className="carousel">
                {drinks
                  .filter((_, indx) => indx < seis)
                  .map((drink, i) => (
                    <div key={ i } data-testid={ `${i}-recomendation-card` }>
                      <div data-testid={ `${i}-recomendation-title` }>
                        <DrinksCard key={ drink } drink={ drink } index={ i } />
                      </div>
                    </div>
                  ))}
              </div>
              {!doneRecipes.includes(meal.idMeal) && (
                <Link to={ `/comidas/${meal.idMeal}/in-progress` }>
                  <button
                    className="start-recipe-btn"
                    data-testid="start-recipe-btn"
                    type="button"
                    onClick={ () => startRecipe(meal.idMeal) }
                  >
                    {!startedRecipes ? 'Iniciar Receita' : verifyState(meal.idMeal)}
                  </button>
                </Link>
              )}
            </div>
          ))
        }
      </section>
    ));
}

DetalhesComida.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default DetalhesComida;
