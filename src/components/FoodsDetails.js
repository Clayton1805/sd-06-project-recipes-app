import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import searchRecipe from '../hooks/searchRecipe';

import '../css/itemDetails.css';

export default function FoodsDetails(props) {
  const [recipe, recipeId, setRecipeId] = searchRecipe();
  const [recipeDetails, setRecipeDetails] = useState([]);

  useEffect(() => {
    if (recipeId === '') {
      setRecipeId(props.match.params.id);
    }
  }, [recipeId]);

  useEffect(() => {
    if (recipe.meals) {
      const currRecipe = { ...recipe.meals[0] };
      const array = [];
      const maxLength = 20;
      for (let counter = 1; counter <= maxLength; counter += 1) {
        array.push(counter);
      }
      const recipeArray = array.map((number) => (
        (currRecipe[`strIngredient${number}`] !== ''
          || currRecipe[`strIngredient${number}`])
          ? [currRecipe[`strIngredient${number}`], currRecipe[`strMeasure${number}`]]
          : ''
      ));
      setRecipeDetails(recipeArray);
    }
  }, [recipe]);

  function renderIngredients() {
    const empty = 0;
    if (recipeDetails.length > empty) {
      return (
        <div>
          { recipeDetails.filter((ingredient) => ingredient !== '')
            .map((ingredient, index) => (
              <p
                key={ ingredient[0] }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient[0]}: ${ingredient[1]}`}
              </p>
            )) }
        </div>
      );
    }
  }

  if (recipe.meals) {
    const item = recipe.meals[0];
    return (
      <div>
        <div key={ item }>
          <img
            data-testid="recipe-photo"
            alt="Foto da receita"
            src={ item.strMealThumb }
            className="item-img"
          />
          <p data-testid="recipe-title">{item.strMeal}</p>
          <input type="button" data-testid="share-btn" value="Share" />
          <input type="button" data-testid="favorite-btn" value="favorite" />
          <p data-testid="recipe-category">{item.strCategory}</p>
          <p data-testid="instructions">{item.strInstructions}</p>
          {renderIngredients()}
          <p data-testid="video">{item.strYoutube}</p>
          <div data-testid="0-recomendation-card"> recomendação</div>
          <input type="button" data-testid="start-recipe-btn" value="Começar receita" />
        </div>
      </div>
    );
  }
  return (
    <div>aló</div>
  );
}

FoodsDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
