import React from 'react';

export default class Navbar extends React.Component {

    render() {
    const loginToggle = ((this.props.current_user) ?
      (<div>{this.props.current_user} <a href='/logout'>Logout</a></div>)
         : (<div><a href='/login'>Login</a></div>)
      )
    return (
        <nav className="navbar">
          <a href="/" className="navbar-brand">Spork</a>
          <div className="my-recipes">
            My Recipes
          </div>
          <div className="my-recipes">
            {loginToggle}
          </div>
          <div className="my-recipes">
            New Recipe
          </div>
        </nav>
    );
  }
}