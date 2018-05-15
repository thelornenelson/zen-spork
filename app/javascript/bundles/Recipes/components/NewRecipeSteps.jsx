import React from "react";
import Step from "./Step.jsx";


export default class NewRecipeSteps extends React.Component {

  render() {

    const steps = this.props.steps.map((step, index) => {
      return (<Step
        key={index}
        step={step}
        stepIndex={index}
        changeStep={this.props.changeStep}
        deleteStep={this.props.deleteStep}
      />);
    });
    return (
      <div>
        {steps}
        <div className="row">
          <div className="col">
            <button className="btn btn-primary btn-block add-step-button" onClick={this.props.addStep}>Add Step</button>
          </div>
        </div>
      </div>
    );
  }
}
