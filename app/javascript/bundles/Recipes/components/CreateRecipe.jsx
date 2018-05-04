import React from 'react';

export default class CreateRecipe extends React.Component {

    render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Spork</a>
          <div className="my-recipes">
            My Recipes
          </div>
          <div className="my-recipes">
            Login
          </div>
        </nav>

        <h1>CREATE A NEW RECIPE!</h1>
      </div>
    );
  }
}