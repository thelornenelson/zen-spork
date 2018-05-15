import React, { Component } from "react";

export default class RecipeVariations extends Component {

  render() {
    const recipeVariations = [];
    for(let i = 0; i < this.props.variationsCount; i++){
      // const active = (i === this.props.displayIndex) ? 'active' : '';
      recipeVariations.push(<li key={ i } className={"page-item" + ((i === this.props.displayIndex) ? " active" : "") }>
        <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); this.props.showVariation(i); }}>{ i + 1 }</a>
      </li>);
    }
    return (
      <nav aria-label="Recipe Variations">
        <ul className="pagination">
          <li key="prev" className="page-item">
            <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); this.props.showVariation("previous"); }}><i className="fas fa-arrow-alt-circle-left" /></a>
          </li>
          { recipeVariations }
          <li key="next" className="page-item">
            <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); this.props.showVariation("next"); }}><i className="fas fa-arrow-alt-circle-right" /></a>
          </li>
        </ul>
      </nav>
    );


  }

}
