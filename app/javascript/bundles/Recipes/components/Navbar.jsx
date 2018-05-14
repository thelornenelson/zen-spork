import React from "react";

export default class Navbar extends React.Component {
  render() {
    // Makes the button display either My Recipes or All recipes depending on the state
    const myRecipesToggleName = ((this.props.myRecipesView)
      ? (<button type="button" className="btn nav-button" name="myRecipesView" onClick={this.props.toggleViews}>All Recipes</button>)
      : (<button type="button" className="btn nav-button" name="myRecipesView" onClick={this.props.toggleViews}>My Recipes</button>));

    const loginToggle = ((this.props.current_user)
      ?(<div>{myRecipesToggleName}
        <button type="button" className="btn nav-button" name="createRecipe" onClick={this.props.toggleViews}>New Recipe</button>
        <a href="/logout" className="btn nav-button">Sign Out</a>
        <div className="nav-user">{this.props.current_user}</div></div>)
      : (<div><a href="/signup" className="btn nav-button">Sign Up</a>
        <a href="/login" className="btn nav-button">Sign In</a></div>));

    return (
      <nav className="navbar">
        <button type="button" className="btn navbar-brand" name="recipeIndex" onClick={this.props.toggleViews}><img src="./spork_logo.png" alt="spork logo" /></button>
        {loginToggle}
        <div className="notification">{this.props.notification}</div>
      </nav>
    );
  }
}