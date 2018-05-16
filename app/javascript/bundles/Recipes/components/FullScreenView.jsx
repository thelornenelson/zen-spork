import React from "react";
import {adjustIngredientQuantity} from "./../../../functions/adjustIngredientQuantity";

export default class FullScreenView extends React.Component {
  constructor() {
    super();

    this.state = {
      layoutToggle: true,
    };
  }

  toggleLayout = (e) => {
    e.preventDefault();
    this.setState({
      layoutToggle: !this.state.layoutToggle,
    });
  }

  render() {
    const recipe = this.props.recipe;

    const ingredientsAndStepsSeperated = recipe.content.steps.map((step, stepIndex) => {
      const ingredients = step.ingredients.map((ingredient, ingredientIndex) => {
        return (
          <div key={ingredientIndex} className="row">
            <div className="col-5">{adjustIngredientQuantity(ingredient.qty, this.props.multi)} {ingredient.unit}</div>
            <div className="col-7">{ingredient.name}</div>
          </div>);
      });
      return (
        <div className="row step-row" key={stepIndex}>
          <div className="col-xl-4 step-col" style={{ paddingLeft: 40 }}>{ingredients}</div>
          <div className="col-xl-8" style={{ paddingLeft: 40 }}>{stepIndex + 1}. {step.instructions}</div>
        </div>);
    });

    const allIngredients = recipe.content.steps.map((step, stepIndex) => {
      return step.ingredients.map((ingredient, ingredientIndex) => {
        return (
          <div key={ingredientIndex} className="row">
            <div className="col-5">{adjustIngredientQuantity(ingredient.qty, this.props.multi)} {ingredient.unit}</div>
            <div className="col-7">{ingredient.name}</div>
          </div>);
      });
    });
    const allInstructions = recipe.content.steps.map((step, stepIndex) => {
      return (
        <div className="row" key={stepIndex}>
          <div className="col-xl-12" >{stepIndex + 1}. {step.instructions}</div>
        </div>);
    });

    const allIngredientsAndStepsGrouped = (
      <div className="row step-row">
        <div className="col-xl-4 step-col" style={{ paddingLeft: 40 }}>{allIngredients}</div>
        <div className="col-xl-8" style={{ paddingLeft: 40 }}>{allInstructions}</div>
      </div>
    );

    return (
      <div className="cooking-view">
        <div className="container-fluid steps-ingredients-container">
          <div className="row">
            <div className="col-xl text-center"><h4>{recipe.title}</h4></div>
            <button type="button" className="btn switch-button" onClick={this.toggleLayout}><i className="fas fa-exchange-alt fa-md"></i> Switch Layout</button>
          </div>
          <div className="row step-row">
            <div className="col-xl-4 step-col" style={{paddingLeft: 40 }}><h4>Ingredients:</h4></div>
            <div className="col-xl-8" style={{paddingLeft: 40}}><h4>Steps:</h4></div>
          </div>
          {(this.state.layoutToggle)?(allIngredientsAndStepsGrouped):(ingredientsAndStepsSeperated)}
        </div>
      </div>
    );
  }
}
