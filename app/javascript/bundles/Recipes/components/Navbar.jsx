import React from "react";

export default class Navbar extends React.Component {
  render() {
    const loginToggle = ((this.props.current_user)
      ? (<div>{this.props.current_user} <a href='/logout' className="btn nav-button">Logout</a></div>)
      : (<div><a href='/login' className="btn nav-button">Login</a></div>));

    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">SPORK</a>
        <a className="btn nav-button">My Recipes</a>
        {loginToggle}
        <button type="button" className="btn nav-button" onClick={this.props.toggleCreateRecipe}>New Recipe</button>
      </nav>
      //make my recipes and new recipes only visble when logged in
    );
  }
}