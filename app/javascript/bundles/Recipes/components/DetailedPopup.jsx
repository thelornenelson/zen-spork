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
      <section>
        <h5 className="modal-title" id="exampleModalCenterTitle">{title}</h5>
        {/* either renders photo from db is it exists or placeholder photo */}
        <img className="modal-img-top" src={photo_url || photoPlaceholder} style={{ width: "20%" }} alt="Delicious Food" />
        <div className="modal-body">
          Intro: {intro}
          Gear: {gear}
          Warnings: {warnings}
          Prep-time: {prep_time}
          Cook-Time: {cook_time}
          Servings: {servings}
          Ingredients: {steps}
        </div>
        <div className="modal-footer">
          <FullScreenButton recipe={this.props.recipe} />
          <button type="button" className={"btn btn-secondary"} data-dismiss="modal">Spork</button>
        </div>
      </section>
    );
  }
}
