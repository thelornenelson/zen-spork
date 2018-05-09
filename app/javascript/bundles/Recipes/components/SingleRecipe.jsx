import React from "react";

export default class SingleRecipe extends React.Component {
  render() {
    const recipe = this.props.recipe;
    const steps = recipe.content.steps.map((step, stepIndex) => {
      const ingredients = step.ingredients.map((ingredient, ingredientIndex) => {
        return (
          <div key={ingredientIndex} className="row">
            <div className="col-2">{ingredient.qty}</div>
            <div className="col-4">{ingredient.unit}</div>
            <div className="col-6">{ingredient.name}</div>
          </div>);
      });

      return (
        <div key={stepIndex} className="row step-row">
          <div className="col-xl-4 step-col" style={{paddingLeft: 60}}>{ingredients}</div>
          <div className="col-xl-8" style={{paddingLeft: 40}}>{step.instructions}</div>
        </div>);
    });

    return (
      <div className="cooking-view">
        <div className="container-fluid steps-ingredients-container">
          <div className="row">
            <div className="col-xl text-center"><h4>{recipe.title}</h4></div>
          </div>
          <div className="row step-row">
            <div className="col-xl-4 step-col" style={{paddingLeft: 60}}><h4>Ingredients:</h4></div>
            <div className="col-xl-8" style={{paddingLeft: 40}}><h4>Steps:</h4></div>
          </div>
          { steps }
        </div>
      </div>
    );
  }
}
