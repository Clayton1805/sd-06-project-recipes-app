import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import DrinkCard from './DrinkCard';
import '../css/Lists.css';

function DrinkList() {
  const {
    getDrinkAPI,
    drinkData,
    searchInput,
  } = useContext(RecipesContext);

  useEffect(() => {
    const { readyToSearch, filterType, query } = searchInput;

    if (readyToSearch) getDrinkAPI(filterType, query);
  }, [searchInput]);

  useEffect(() => {
    getDrinkAPI('name-filter', '');
  }, [])

  const handleDrinkData = () => {
    const maxSize = 12;
    const startIndex = 0;

    if (drinkData.length > maxSize) {
      return drinkData.slice(startIndex, maxSize).map((item, index) => (
        <DrinkCard
          index={ index }
          key={ `recipe${index}` }
          recipe={ item }
        />
      ));
    }

    if (drinkData.length === 1) {
      const { idDrink } = drinkData[startIndex];
      return <Redirect to={ `/bebidas/${idDrink}` } />;
    }

    return drinkData.map((item, index) => (
      <DrinkCard
        index={ index }
        key={ `recipe${index}` }
        recipe={ item }
      />
    ));
  };

  return (
    <section className="recipe-container">
      { handleDrinkData() }
    </section>
  );
}

export default DrinkList;
