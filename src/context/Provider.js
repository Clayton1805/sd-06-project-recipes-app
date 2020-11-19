import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from './ContextRecipes';

function Provider({ children }) {
  const [btnDisable, setBtnDisable] = useState(true);
  const [user, setUser] = useState({ email: '' });

  const contextValue = {
    btnDisable,
    setBtnDisable,
    user,
    setUser,
  };

  return (
    <ContextRecipes.Provider value={contextValue}>
      {children}
    </ContextRecipes.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
