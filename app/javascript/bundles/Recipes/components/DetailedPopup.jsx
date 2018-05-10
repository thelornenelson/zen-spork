import React from "react";
import FullScreenButton from "./FullScreenButton.jsx";

export default class DetailedPopup extends React.Component {

  render() {
    const { title, photo_url, content: { intro, gear, warnings, prep_time, cook_time, servings } } = this.props.recipe;
    // declares our placeholder photo
    const photoPlaceholder = "https://thumbs.dreamstime.com/b/black-plastic-spork-14551333.jpg";
    const recipe = this.props.recipe;
    const steps = recipe.content.steps.map((step) => {
      const ingredients = step.ingredients.map((ingredient) => {
        return (
          <div key={ingredient.name}>
            {ingredient.qty} {ingredient.unit}: {ingredient.name}
          </div>);
      });
      return (
        <div key={Math.random()}>
          {ingredients}
        </div>);
    });

    return (
      <article className="DPU-main-container">
        <div className="container">
          <div className="row">
            <div className="DPU-left col-5">
              <h1 className="DPU-title">{title}</h1><br />
              {/* either renders photo from db is it exists or placeholder photo */}
              <img className="DPU-image" src={photo_url || photoPlaceholder} alt="Delicious Food" />
              Prep-time | Cook-Time | Servings <br />
              {prep_time} | {cook_time} | {servings} <br />
              <div className="modal-footer DPU-buttons">
                <FullScreenButton recipe={this.props.recipe} />
                <button type="button" className={"btn btn-secondary"} data-dismiss="modal">Spork</button>
                <button type="button" className={"btn btn-secondary"} data-dismiss="modal" onClick={(e) => { this.props.editRecipe(this.props.recipe, e); }}>Edit</button>
              </div>
            </div>
            <div className="DPU-right col-7">
              <strong>Intro:</strong> {intro}<br/><br/>
              <strong>Gear:</strong> {gear}<br/><br/>
              <strong>Ingredients:</strong> {steps}<br/>
              Warnings: {warnings}
            </div>
          </div>
        </div>
      </article>
    );
  }
}