import React from "react";

export default class SingleRecipe extends React.Component {
  render() {
    const recipe = this.props.recipe;
    const steps = recipe.content.steps.map((step) => {
      const ingredients = step.ingredients.map((ingredient) => {
        return (
          <div className="row" key={ingredient.name}>
            <div className="col-2">{ingredient.qty}</div>
            <div className="col-4">{ingredient.unit}</div>
            <div className="col-6">{ingredient.name}</div>
          </div>);
      });

      return (
        <div className="row step-row" key={Math.random()}>
          <div className="col-xl-4 step-col" style={{paddingLeft: 60}}>{ingredients}</div>
          <div className="col-xl-8" style={{paddingLeft: 40}}>{step.instructions}</div>
        </div>);
    });

    return (
      <div className="cooking-view">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl text-center"><h1>{recipe.title}</h1></div>
          </div>
          <div className="row step-row">
            <div className="col-xl-4 step-col" style={{paddingLeft: 60}}><h3>Ingredients:</h3></div>
            <div className="col-xl-8" style={{paddingLeft: 40}}><h3>Steps:</h3></div>
          </div>
          { steps }
        </div>
      </div>
    );
  }
}
