import React from "react";


export default class Step extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <div className="step-title">Step {this.props.stepIndex + 1}
              {this.props.stepIndex > 0 && <button className="btn btn-danger" onClick={(e) => this.props.deleteStep(this.props.stepIndex, e)}><i className="fas fa-trash-alt"></i></button>}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <label htmlFor="InputStepIngredients">Ingredients</label>
              <textarea type="text" className="form-control step-textarea" id="InputStepIngredients"
                placeholder="Put each ingredient on a new line&#10;1/2 tsp Thyme&#10;1 1/2 cups Balsamic Vinegar..." value={this.props.step.ingredients} onChange={(event) => { this.props.changeStep(this.props.stepIndex, false, event.target.value); }} />
            </div>
          </div>
          <div className="col-lg-6">
            {/* puts required field star only on first step */}
            <div className={this.props.stepIndex === 0 ? "form-group required" : "form-group"}>
              <label htmlFor="InputStepInstructions">Instructions</label>
              <textarea type="text" className="form-control step-textarea" id="InputStepInstructions" placeholder="Step Instructions" value={this.props.step.instructions} onChange={(event) => { this.props.changeStep(this.props.stepIndex, true, event.target.value); }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}