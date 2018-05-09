import React from "react";
import Step from "./Step.jsx";


export default class NewRecipeSteps extends React.Component {

  render() {

    const steps = this.props.steps.map((step, index) => {
      return (<Step
        key={index}
        step={step}
        addIngredient={this.props.addIngredient}
        deleteIngredient={this.props.deleteIngredient}
        stepIndex={index}
        changeInstructions={this.props.changeInstructions}
        changeIngredient={this.props.changeIngredient}
        deleteStep={this.props.deleteStep}
      />);
    });
    return (
      <div className="steps-area">
        <div className="row">
          <div className="col">
            <div className="create-title">Directions And Ingredients</div>
          </div>
        </div>
        {steps}
        <div className="row">
          <div className="col">
            <button className="btn btn-secondary btn-block add-step-button" onClick={this.props.addStep}>Add Step</button>
          </div>
        </div>
      </div>
    );
  }
}
