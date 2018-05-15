import React from "react";

export default class Navbar extends React.Component {
  render() {
    const firstInitial = this.props.current_user_name ? this.props.current_user_name.charAt(0) : "";
    const lastInitial = this.props.current_user_last_name ? this.props.current_user_last_name.charAt(0) : "";
    const userInitials = firstInitial + lastInitial;
    // Makes the button display either My Recipes or All recipes depending on the state
    const myRecipesToggleName = ((this.props.myRecipesView)
      ? (<button type="button" className="btn btn-primary" name="myRecipesView" onClick={this.props.toggleViews}>All Recipes</button>)
      : (<button type="button" className="btn btn-primary" name="myRecipesView" onClick={this.props.toggleViews}>My Recipes</button>));

    const loginToggle = ((this.props.current_user)
      ?(<div className="login-buttons">
        <div className="nav-user">{userInitials}</div>
        {myRecipesToggleName}
        <button type="button" className="btn btn-primary" name="createRecipe" onClick={this.props.toggleViews}>New Recipe</button>
        <a href="/logout" className="btn btn-primary">Sign Out</a>
      </div>)
      : (<div className="login-buttons"><a href="/login" className="btn btn-primary">Log In</a>
        <a href="/signup" className="btn btn-primary">Sign Up</a></div>));

    return (
      <nav className="navbar">
        <button type="button" className="btn navbar-brand" name="recipeIndex" onClick={this.props.toggleViews}><img src="./spork_logo.png" alt="spork logo" /></button>
        {loginToggle}
        <div className="notification">{this.props.notification}</div>
      </nav>
    );
  }
}