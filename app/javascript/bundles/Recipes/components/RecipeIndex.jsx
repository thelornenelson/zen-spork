import React from "react";
import LearnMore from "./LearnMore.jsx";

export default class RecipeIndex extends React.Component {
  render() {
    const title = this.props.recipe.title;
    console.log("RECIPE =", this.props.recipe);
    return (
      <article>
        <div className="recipe-card card border-dark">
          <img className="card-img-top" src="/recipe/salmon.jpg" alt="salmon" />
          <div className="card-body">
            <p className={"card-title h3 text-center"}>{ title }</p>
            <LearnMore recipe={this.props.recipe} toggleDetailView={this.props.toggleDetailView}/>     
          </div>
        </div>
      </article>
    );
  }
}