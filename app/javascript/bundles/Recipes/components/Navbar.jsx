import React from "react";

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
          <button type="button" className={"btn btn-secondary"} onClick={this.props.toggleCreateRecipe} > New Recipe</button>
        </div>
      </nav>
    );
  }
}