import React from "react";

export default class Ingredient extends React.Component {

  render() {
    return (
      <div class="form-group row">
        <label htmlFor="InputIngredient" className="col-sm-auto col-form-label">Ingredient</label>
        <div class="col-sm-9">
          <input type="text" className="form-control" id="InputIngredient" placeholder="Ingredient" name="ingredient" value={this.props.ingredientName} onChange={(event) => { this.props.changeIngredient(this.props.stepIndex, this.props.ingredientIndex, event.target.value); }} />
        </div>
        <div class="col-md-1">
          <button className="btn btn-danger" onClick={() => this.props.deleteIngredient(this.props.stepIndex, this.props.ingredientIndex)}>Delete</button>
        </div>
      </div>
    );
  }
}