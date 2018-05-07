import React from "react"

export default class Step extends React.Component {

  render() {

    return (
      <div className="steps-area">
        <div className="row">
          <div className="col">
            <div className="create-title">Directions And Ingredients</div>
            <button className="btn btn-secondary" onClick={this.props.onAddStep}>Add Step</button>
          </div>
        </div>

        <div>
        {this.props.steps.map((step, index) => (
          <div key={index}>
          <div className="row">
            <div className="col-lg-10">
              <div className="form-group">
                <label htmlFor="InputStepInstructions">Step {index + 1}</label>
                <textarea type="text" className="form-control" id="InputStepInstruciton" placeholder="Step Directions" onInput={this.onStepDirectionsInput}/>
              </div>
            </div>
            {index > 0 &&
              <div className="col-lg-2 float-right">
                <button className="btn btn-danger" onClick={(e) => this.props.onDeleteStep(step.id, e)}>Delete Step</button>
              </div>
            }
          </div>
          <div className="row">
            <div className="col-lg">
              <div className="form-group">
                <label htmlFor="InputIngredient">Ingredient</label>
                <input type="text" className="form-control" id="InputIngredient" placeholder="Ingredient's Name" onInput={this.onIngredientNameInput}/>
              </div>
            </div>
            <div className="col-lg">
              <div className="form-group">
                <label htmlFor="InputUnit">Unit</label>
                <input type="text" className="form-control" id="InputUnit" placeholder="Unit" onInput={this.onUnitInput}/>
              </div>
            </div>
            <div className="col-lg">
              <div className="form-group">
                <label htmlFor="InputQuantity">Quantity</label>
                <input type="text" className="form-control" id="InputQuantity" placeholder="Quantity" onInput={this.onQuantityInput}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg">
              <button className="btn btn-secondary">Add Ingredient</button>
            </div>
          </div>
          </div>
        ))}
        </div>
      </div>
    )
  }
}