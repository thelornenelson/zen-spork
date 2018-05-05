import React from 'react';

export default class Navbar extends React.Component {

    render() {
    return (
        <nav className="navbar">
          <a href="/" className="navbar-brand">Spork</a>
          <div className="my-recipes">
            My Recipes
          </div>
          <div className="my-recipes">
            Login
          </div>
          <div className="my-recipes">
            New Recipe
          </div>
        </nav>
    );
  }
}