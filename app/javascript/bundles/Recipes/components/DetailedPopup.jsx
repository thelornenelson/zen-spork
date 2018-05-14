import React from "react";
import FullScreenButton from "./FullScreenButton.jsx";
import {adjustIngredientQuantity} from "./../../../functions/adjustIngredientQuantity"

export default class DetailedPopup extends React.Component {

   constructor(props) {
    super(props);
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
    const { title, photo_url, sporks_count, reference_url, content: { intro, gear, warnings, prep_time, cook_time, servings } } = this.props.recipe;
    // declares our placeholder photo
    const photoPlaceholder = "https://drive.google.com/uc?id=1FuOo9zc5O50ZPjvA8xqh40VCN81nakeu";
    const recipe = this.props.recipe;
    // maps recipe json to extract just the list of ingredients to render
    const gearArr = {gear}.gear;
    const listIngredients = recipe.content.steps.map((step) => {
      const ingredients = step.ingredients.map((ingredient) => {
        return (
          <div key={ingredient.name}>
            {/* only renders : if there is there is a qty or a unit  */}
            {adjustIngredientQuantity(ingredient.qty, this.state.servingMultiplier)} {ingredient.unit}{adjustIngredientQuantity(ingredient.qty, this.state.servingMultiplier) || ingredient.unit ? ":" : ""} {ingredient.name}
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
              <div className="DPU-centered-title">
                <h1 className="DPU-title">{title}</h1>
              Cooked x times<br />
              Sporked {sporks_count} time{sporks_count === 1 ? "" : "s"}<br />
                {/* either renders photo from db is it exists or placeholder photo */}
                <img className="DPU-image" src={photo_url || photoPlaceholder} alt="Delicious Food" /><br />
                <strong>Ingredients:</strong><br />
              </div>
              <div className="DPU-ingredients">
                {listIngredients}<br />
              </div>
              {/* hides prep, cook, serving table if the inputs are blank */}
              {(!prep_time && !cook_time && !servings) ? "" :
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
                </table> }
              <div className="modal-footer DPU-buttons">
                <FullScreenButton recipe={this.props.recipe} multi={this.state.servingMultiplier} />
                {/* Hide spork button if not logged in, or it's your recipe you're viewing */}
                {this.props.current_user_id !== recipe.user_id && this.props.current_user_id && <button type="button" className={"btn btn-primary"} onClick={(e) => { this.props.sporkRecipe(this.props.recipe, e); this.props.onClose(); }}><i className="fas fa-clone"></i> Spork</button>}
                {this.props.current_user_id === recipe.user_id && <button type="button" name="editRecipe" className={"btn btn-primary"} onClick={(e) => {this.props.toggleViews(e, this.props.recipe);}}><i className="fas fa-edit"></i> Edit</button>}
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
            <div className="DPU-right col-7 ">
              <strong>Intro:</strong> {intro}<br/><br/>
              {/* only renders gear on detail page if there are some in the recipe and in a comma separated list */}
              {gear ? <div><strong>Gear:</strong> {gearArr.join(", ")} <br /><br /></div> : ""}
              {/* <strong>Gear:</strong> {gear}<br/><br/>       */}
              <strong>Instructions:</strong> {listInstructions}<br />
              {/* only renders warnings on detail page if there are some in the recipe */}
              {warnings ? <div><strong>Warning:</strong> {warnings} <br /><br /></div> : ""}
              {/* only renders reference url if one exists */}
              {reference_url ? <strong><a target="_blank" href={reference_url}>Click here to get the whole story from the source</a></strong> : ""}
            </div>
          </div>
        </div>
      </article>
    );
  }
}