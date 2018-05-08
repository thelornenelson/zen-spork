import React from "react";

export default class SingleRecipe extends React.Component {
  render() {
    const recipe = this.props.recipe;
    return (
      <div className="cooking-view">
        <h1>{ JSON.stringify(recipe) }</h1>
      </div>
    );
  }
}
