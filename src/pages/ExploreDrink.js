import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Footer from '../components/Footer';
import Header from '../components/Header';
import ButtonsExploreRecipes from '../components/ButtonsExploreRecipes';
import { addRecipes, addDrinkRecipes } from '../redux/actions/searchRecipes';

function ExploreDrink(props) {
  const { history: { location: { pathname } }, pageConfig,
    drinkRecipes, isLoading, dispatchInitialRecipes, dispatchRecipes } = props;
  const { header, className } = pageConfig;
  const { title } = header;

  useEffect(() => {
    const zero = 0;
    const recipes = JSON.parse(localStorage.getItem('drinkRecipes'));
    if (recipes !== null && drinkRecipes.length === zero) {
      dispatchRecipes(recipes);
    } else if (!drinkRecipes || drinkRecipes.length === zero) {
      dispatchInitialRecipes();
    }
  }, []);

  return (
    <div className="explorar__container-page">
      <Header pathname={ pathname } componentConfig={ header } />
      { !isLoading ? <ButtonsExploreRecipes
        className={ className }
        pathname={ pathname }
        title={ title }
        recipes={ drinkRecipes }
        idType="idDrink"
      /> : null}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  pageConfig: state.sitemap.explorarBebidas,
  drinkRecipes: state.searchRecipes.recipes.drinks,
  isLoading: state.searchRecipes.isRecipesFetching,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchInitialRecipes: () => dispatch(addDrinkRecipes()),
  dispatchRecipes: (recipes) => dispatch(addRecipes(recipes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreDrink);

ExploreDrink.propTypes = {
  pageConfig: PropTypes.shape({
    header: PropTypes.shape({
      title: PropTypes.string.isRequired,
      profileButton: PropTypes.bool.isRequired,
      searchButton: PropTypes.bool.isRequired,
    }),
    className: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  dispatchInitialRecipes: PropTypes.func.isRequired,
  dispatchRecipes: PropTypes.func.isRequired,
  drinkRecipes: PropTypes.arrayOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
