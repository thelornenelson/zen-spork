import React from "react";

export default class Navbar extends React.Component {
  render() {
    const loginToggle = ((this.props.current_user)
      ? (<div><a href='/logout' className="btn nav-button">Logout</a><div className="nav-user">{this.props.current_user_name}</div></div>)
      : (<div><a href='/login' className="btn nav-button">Login / Register</a></div>));

    // Makes the button display either My Recipes or All recipes depending on the state
    const myRecipesToggle = ((this.props.isMyRecipesView)
      ? (<button type="button" className="btn nav-button" onClick={this.props.toggleMyRecipesView}>All Recipes</button>)
      : (<button type="button" className="btn nav-button" onClick={this.props.toggleMyRecipesView}>My Recipes</button>));

    // return the correct nav bar depending on whether user is logged in
    if (this.props.current_user) {

      return (
        <nav className="navbar">
          <a href="/" className="navbar-brand"><img src="./spork_logo.png" alt="spork logo" /></a>
          {myRecipesToggle}
          <button type="button" className="btn nav-button" onClick={this.props.toggleCreateRecipe}>New Recipe</button>
          {loginToggle}
          <div className="notification">{this.props.notification}</div>
        </nav>
      );
    } else {

      return (
        <nav className="navbar">
          <a href="/" className="navbar-brand">SPORK</a>
          {loginToggle}
        </nav>
      );
    }
  }
}