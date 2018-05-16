import React from "react";
import LearnMore from "./LearnMore.jsx";

// The recipe cards that show up on the homepage view
export default class RecipeIndex extends React.Component {
  render() {

    return (
      <div className="logo">
        <img className="spork-logo-full" src="./spork_full.png" alt="Spork"/>
        <div className="catchphrase">
          <button className="begin-button" name="splashPage" onClick={this.props.toggleViews}>Your Culinary Destiny Starts Here <i class="fas fa-angle-right fa-lg"></i></button>
        </div>
      </div>
    );
  }
}