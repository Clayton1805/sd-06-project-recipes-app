import { Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import Header from '../components/Header';

function Explorar({ requestAPI }) {
  const { setDisabledSearchIcon,
    setTitleHeader, setShowSearchBar,
  } = useContext(ReceitasContext);

  useEffect(() => {
    setDisabledSearchIcon(true);
    setTitleHeader('Explorar');
    setShowSearchBar(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header
        requestAPI={ requestAPI }
      />
      <Link data-testid="explore-food" to="/explorar/comidas">Explorar Comidas</Link>
      <Link data-testid="explore-drinks" to="/explorar/bebidas">Explorar Bebidas</Link>
    </div>
  );
}

Explorar.defaultProps = {
  requestAPI: () => null,
};

Explorar.propTypes = {
  requestAPI: propTypes.func,
};

export default Explorar;
