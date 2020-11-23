import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import useRequestFood from '../hooks/useRequestFood';

function Food() {
  const { setHeader, options, setOptions } = useContext(AppContext);
  const [apiResponse, setFilter] = useRequestFood();
  const maxShow = 12;

  useEffect(() => {
    setHeader({ page: 'Comidas', search: true });
    return () => setOptions({ text: '', option: '' });
  }, []);

  useEffect(() => {
    setFilter(options);
  }, [options]);

  return (
    <div>
      <Header />
      <div className="bodier">
        {apiResponse.length === 1
          ? <Redirect to={ `/comidas/${apiResponse[0].idMeal}` } />
          : apiResponse.filter((e, index) => e && index < maxShow).map((meal, index) => (
            <div
              className="card"
              data-testid={ `${index}-recipe-card` }
              key={ meal.idMeal }
            >
              <h4
                className="text"
                data-testid={ `${index}-card-name` }
              >
                {meal.strMeal}
              </h4>
              <img
                className="picture"
                data-testid={ `${index}-card-img` }
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default Food;
