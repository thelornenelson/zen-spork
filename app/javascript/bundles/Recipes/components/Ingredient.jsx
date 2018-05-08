import React from "react"

export default class Ingredient extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="col-lg">
          <div className="form-group">
            <label htmlFor="InputIngredient">Ingredient</label>
            <input type="text" className="form-control" id="InputIngredient" placeholder="Ingredient" name="ingredient" value={this.props.ingredientName} onChange={(event) => { this.props.changeIngredient(this.props.stepIndex, this.props.ingredientIndex, event.target.value) }} />
          </div>
        </div>
      </div>
    )
  }
}