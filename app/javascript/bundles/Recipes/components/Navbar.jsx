import React from "react";

export default class Navbar extends React.Component {
  render() {
    const loginToggle = ((this.props.current_user)
      ? (<div><a href='/logout' className="btn nav-button">Logout</a><div className="nav-user">{this.props.current_user}</div></div>)
      : (<div><a href='/login' className="btn nav-button">Login</a></div>));

    const myRecipesToggle = ((this.props.isMyRecipesView)
      ? (<button type="button" className="btn nav-button" onClick={this.props.toggleMyRecipesView}>All Recipes</button>)
      : (<button type="button" className="btn nav-button" onClick={this.props.toggleMyRecipesView}>My Recipes</button>));

    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">SPORK</a>
        {myRecipesToggle}
        <button type="button" className="btn nav-button" onClick={this.props.toggleCreateRecipe}>New Recipe</button>
        {loginToggle}
      </nav>
      //make my recipes and new recipes only visble when logged in
    );
  }
}