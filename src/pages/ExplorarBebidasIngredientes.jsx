import React from 'react';
import { Link } from 'react-router-dom';

import profile from '../images/profileIcon.svg';
import Footer from '../components/Footer';

function ExplorarBebidasIngredientes() {
  return (
    <div>
      <title data-testid="page-title">Explorar Ingredientes</title>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ profile } alt="" />
      </Link>
      <Footer />
    </div>
  );
}

export default ExplorarBebidasIngredientes;
