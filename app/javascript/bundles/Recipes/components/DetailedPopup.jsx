import React from "react";
import FullScreenButton from "./FullScreenButton.jsx";
import {adjustIngredientQuantity} from "./../../../functions/adjustIngredientQuantity"

export default class DetailedPopup extends React.Component {

   constructor(props) {
    super(props);
    // Boolean state for hiding components on clicks
    // And recipes array from database
    this.state = {
      servingMultiplier: 1
    };

    this.adjustServingSize = this.adjustServingSize.bind(this);
  }

  adjustTotalServings(servings) {
    let output = "";
    let numericValue = parseInt(servings);
    let newTotal = numericValue * this.state.servingMultiplier;

    output = output + newTotal + servings.slice(numericValue.toString().length, servings.length);

    return output;
  }

  adjustServingSize(e) {
    e.preventDefault();
    let size = Number(e.target.value)
    if (size === NaN) {
      this.setState({servingMultiplier: 1});
    }
    else {
      this.setState({servingMultiplier: size});
    }
  }

  render() {
    const { title, photo_url, content: { intro, gear, warnings, prep_time, cook_time, servings } } = this.props.recipe;
    // declares our placeholder photo
    const photoPlaceholder = "https://thumbs.dreamstime.com/b/black-plastic-spork-14551333.jpg";
    const recipe = this.props.recipe;

    // maps recipe json to extract just the list of ingredients to render
    const listIngredients = recipe.content.steps.map((step) => {
      const ingredients = step.ingredients.map((ingredient) => {
        return (
          <div key={ingredient.name}>
            {adjustIngredientQuantity(ingredient.qty, this.state.servingMultiplier)} {ingredient.unit}: {ingredient.name}
          </div>);
      });
      return (
        <div key={Math.random()}>
          {ingredients}
        </div>);
    });

    // maps out numbered directions for making the recipe
    const listInstructions = recipe.content.steps.map((instruction, index) => {
      return (
        <div key={Math.random()}>
          <strong>{index + 1}.</strong> {instruction.instructions}
        </div>
      );
    });

    return (
      <article className="DPU-main-container">
        <div className="container">
          <div className="row">
            <div className="DPU-left col-5">
              <h1 className="DPU-title">{title}</h1><br />
              {/* either renders photo from db is it exists or placeholder photo */}
              <img className="DPU-image" src={photo_url || photoPlaceholder} alt="Delicious Food" /><br />
              <strong>Ingredients:</strong><br />
              <div className="DPU-ingredients">
                {listIngredients}<br />
              </div>
              <table className="DPU-table">
                <thead>
                  <tr>
                    <th>Prep-time  </th>
                    <th>Cook-time  </th>
                    <th>Servings  </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{prep_time}</td>
                    <td>{cook_time}</td>
                    <td>{this.adjustTotalServings(servings)}</td>
                  </tr>
                </tbody>
              </table>
              <div className="modal-footer DPU-buttons">
                <FullScreenButton recipe={this.props.recipe} multi={this.state.servingMultiplier} />
                <button type="button" className={"btn btn-secondary"} data-dismiss="modal" onClick={(e) => { this.props.sporkRecipe(this.props.recipe, e); this.props.onClose();}}>Spork</button>
                <button type="button" className={"btn btn-secondary"} data-dismiss="modal" onClick={(e) => { this.props.editRecipe(this.props.recipe, e); }}>Edit</button>
                <br/>
                <form>
                  <label>
                    Adjust Servings:
                  <select value={this.state.servingMultiplier} onChange={this.adjustServingSize}>
                    <option value="0.5">Half</option>
                    <option value="1">Original</option>
                    <option value="2">Double</option>
                    <option value="4">Quadruple</option>
                  </select>
                  </label>
                </form>
              </div>
            </div>
            <div className="DPU-right col-7 col-centered">
              <strong>Intro:</strong> {intro}<br/><br/>
              <strong>Gear:</strong> {gear}<br/><br/>

              <strong>Instructions:</strong> {listInstructions}<br />
              {/* Warnings: {warnings} */}
            </div>
          </div>
        </div>
      </article>
    );
  }
}