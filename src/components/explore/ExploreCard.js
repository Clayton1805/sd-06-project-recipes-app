import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesAppContext from '../../context/RecipesAppContext';
import { fetchMealAPIByIngredient, fetchDrinkAPIByIngredient } from '../../services';
// import { Link } from 'react-router-dom';

function ExploreCard({ name, index, type }) {
  const { setFilteredRecipes } = useContext(RecipesAppContext);
  const history = useHistory();

  const imgURL = (type === 'comidas')
    ? `https://www.themealdb.com/images/ingredients/${name}-Small.png`
    : `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`;

  const handleClick = async () => {
    const recipes = (type === 'comidas')
      ? await fetchMealAPIByIngredient(name)
      : await fetchDrinkAPIByIngredient(name);
    setFilteredRecipes(recipes);
    console.log(name);
    history.push(`/${type}`);
  };

  return (
    <div
      data-testid={ `${index}-ingredient-card` }
      onClick={ () => handleClick() }
    >
      <img
        src={ imgURL }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <h6 data-testid={ `${index}-card-name` }>{ name }</h6>
    </div>
  );
}

ExploreCard.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default ExploreCard;
