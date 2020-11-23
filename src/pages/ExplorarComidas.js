import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchRandomMeal } from '../service/foodApi';

const ExplorarComidas = () => {
  const [randomMealID, setRandomMeal] = useState();

  useEffect(() => {
    fetchRandomMeal().then((response) => {
      setRandomMeal(response.idMeal);
    });
  }, []);

  return (
    <div>
      <Header />
      <Link to="/explorar/comidas/ingredientes">
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button data-testid="explore-by-area" type="button"> Por Local de Origem</button>
      </Link>
      <Link to={ `/comidas/${randomMealID}` }>
        <button data-testid="explore-surprise" type="button">Me Surpreenda!</button>
      </Link>
      <Footer />
    </div>
  );
};

export default ExplorarComidas;
