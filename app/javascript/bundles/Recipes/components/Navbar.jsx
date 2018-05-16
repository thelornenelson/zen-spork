import React from "react";
import Dropdown from "react-simple-dropdown";
import DropdownTrigger from "../../../../../node_modules/react-simple-dropdown/lib/components/DropdownTrigger.js";
import DropdownContent from "../../../../../node_modules/react-simple-dropdown/lib/components/DropdownContent.js";

export default class Navbar extends React.Component {
  render() {
    const firstInitial = this.props.current_user_name ? this.props.current_user_name.charAt(0) : "";
    const lastInitial = this.props.current_user_last_name ? this.props.current_user_last_name.charAt(0) : "";
    const userInitials = firstInitial + lastInitial;
    // Makes the button display either My Recipes or All recipes depending on the state
    const myRecipesToggleName = ((this.props.myRecipesView)
      ? (<button type="button" className="btn btn-primary" name="myRecipesView" onClick={this.props.toggleViews}>Viewing Your Recipes  <i className="fas fa-toggle-on"></i></button>)
      : (<button type="button" className="btn btn-primary" name="myRecipesView" onClick={this.props.toggleViews}>Viewing All Recipes  <i className="fas fa-toggle-off"></i></button>));

    const loginToggle = ((this.props.current_user)
      ?(<div className="login-buttons">
        <div className="btn btn-primary nav-user"><Dropdown><DropdownTrigger>{userInitials}</DropdownTrigger>
          <DropdownContent>
            {this.props.current_user_name} {this.props.current_user_last_name}<br /><br />
            Your total recipes: {this.props.user_recipes.length}<br /><br />
            <a href="/logout">Sign out</a>
          </DropdownContent>
        </Dropdown></div>
        <button type="button" className="btn btn-primary" name="createRecipe" onClick={this.props.toggleViews}>+</button>
        {myRecipesToggleName}
      </div>)
      : (<div className="login-buttons"><a href="/login" className="btn btn-primary">Log In</a>
        <a href="/signup" className="btn btn-primary">Sign Up</a></div>));

    return (
      <nav className="navbar">
        <button type="button" className="btn navbar-brand" name="recipeIndex" onClick={this.props.toggleViews}><img src="./spork_logo.png" alt="spork logo" name="recipeIndex"/></button>
        {loginToggle}
        <div className="notification">{this.props.notification}</div>
      </nav>
    );
  }
}