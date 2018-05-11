import React from "react";
import Ingredient from "./Ingredient.jsx";

export default class Step extends React.Component {
  render() {
    const ingredients = this.props.step.ingredients.map((ingredient, index) => {
      return (<Ingredient
        key={index}
        changeIngredient={this.props.changeIngredient}
        ingredientIndex={index}
        stepIndex={this.props.stepIndex}
        ingredientName={ingredient}
        deleteIngredient={this.props.deleteIngredient}/>);
    });
    return (
      <div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="InputStepInstructions">Step {this.props.stepIndex + 1}
                {this.props.stepIndex > 0 && <button className="btn btn-danger" onClick={(e) => this.props.deleteStep(this.props.stepIndex, e)}><i className="fas fa-trash-alt"></i></button>}
              </label>
              <textarea type="text" className="form-control" id="InputStepInstruciton" placeholder="Step Instructions" value={this.props.step.instructions} onChange={(event) => { this.props.changeInstructions(this.props.stepIndex, event.target.value); }} />
            </div>
          </div>
        </div>
        {ingredients}
        <div className="row">
          <div className="col-lg">
            <button className="btn btn-primary" onClick={(e) => { this.props.addIngredient(this.props.stepIndex, e); }}><i className="fas fa-plus"></i> Ingredient</button>
          </div>
        </div>
      </div>
    );
  }
}
