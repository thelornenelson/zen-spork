import React from "react";
// import DetailedPopup from "./DetailedPopup.jsx";
import LearnMore from "./LearnMore.jsx";
// import FullScreenButton from "./FullScreenButton.jsx";
// import FullScreenButton from "./FullScreenButton.jsx";


export default class RecipeIndex extends React.Component {
  render() {
    // const { title, content: { steps, intro } } = this.props.recipe;
    const title = this.props.recipe.title;
    // console.log("RECIPE PROPS", this.recipe);
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
