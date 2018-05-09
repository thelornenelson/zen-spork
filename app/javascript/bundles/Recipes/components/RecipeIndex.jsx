import React from "react";
import LearnMore from "./LearnMore.jsx";

// The recipe cards that show up on the homepage view
export default class RecipeIndex extends React.Component {
  render() {
    const title = this.props.recipe.title;
    const photo = this.props.recipe.photo_url;
    console.log("RECIPE", this.props.recipe);
    console.log("PHOTO CONST", photo);
    return (
      <article>
        <div className="recipe-card card border-dark">
          <img className="card-img-top" src={photo} alt="food porn of cooked dish" />
          <div className="card-body">
            <p className={"card-title h3 text-center"}>{ title }</p>
            <LearnMore recipe={this.props.recipe} toggleDetailView={this.props.toggleDetailView}/>     
          </div>
        </div>
      </article>
    );
  }
}