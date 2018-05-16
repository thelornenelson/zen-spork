import React from "react";
import FullScreenButton from "./FullScreenButton.jsx";
import RecipeVariations from "./RecipeVariations.jsx";
import {adjustIngredientQuantity} from "./../../../functions/adjustIngredientQuantity";

export default class DetailedPopup extends React.Component {
  constructor(props) {
    super(props);

    // recipeVariations[0] is the original recipe, all other elements are sporked variations of the original with diffed data
    this.state = {
      recipeVariations: [this.props.recipe],
      displayIndex: 0,
      servingMultiplier: 1
    };

    this.getSporks();

    this.showVariation = this.showVariation.bind(this);
    this.adjustServingSize = this.adjustServingSize.bind(this);

  }

  getSporks(){
    fetch(`/recipes/${this.props.recipe.id}/sporks.json`)
      .then((response) => {
        return response.json();
      })
      .then((sporks) => {
        const newRecipeVariations = [this.props.recipe].concat(sporks.reduce((accumulator, spork) => {
          if(spork.similarity !== 1 || spork.user_id === this.props.current_user_id){
            // show sporks that aren't identical copies, unless the copy is owned by current user
            return accumulator.concat(spork.recipe_diffs);
          } else {
            return accumulator;
          }
        }, []));

        this.setState({ recipeVariations: newRecipeVariations });
      })
      .catch((ex) => {
        console.log("parsing failed", ex);
      });
  }

  showVariation(input){
    let newDisplayIndex;

    if(input === "next") {
      newDisplayIndex = this.state.displayIndex + 1;
    } else if(input === "previous") {
      newDisplayIndex = this.state.displayIndex - 1;
    } else {
      newDisplayIndex = input;
    }

    if(newDisplayIndex < 0) {
      newDisplayIndex = this.state.recipeVariations.length + newDisplayIndex;
    } else if(newDisplayIndex >= this.state.recipeVariations.length) {
      newDisplayIndex = newDisplayIndex - this.state.recipeVariations.length;
    }

    this.setState({ displayIndex: newDisplayIndex });

  }


  adjustTotalServings(servings) {
    let output = "";
    let numericValue = parseInt(servings);

    if (isNaN(numericValue)) {
      return servings;
    }

    let newTotal = numericValue * this.state.servingMultiplier;
    output = output + newTotal + servings.slice(numericValue.toString().length, servings.length);

    return output;
  }

  adjustServingSize(e) {
    e.preventDefault();
    let size = Number(e.target.value);
    if (size === NaN) {
      this.setState({servingMultiplier: 1});
    }
    else {
      this.setState({servingMultiplier: size});
    }
  }

  render() {
    const { title, photo_url, reference_url, content: { intro, gear, warnings, prep_time, cook_time, servings } } = this.state.recipeVariations[this.state.displayIndex];

    // not sure if we want this to display spork count of sporks, or only ever the original spork count, or what? Now will display spork count for the original recipe or 0 for any sporks.
    const sporks_count = this.state.recipeVariations[this.state.displayIndex].sporks_count || 0;
    // declares our placeholder photo

    const photoPlaceholder = "./no_spork_image.jpg";
    const recipe = this.state.recipeVariations[this.state.displayIndex];

    // maps recipe json to extract just the list of ingredients to render
    const gearArr = {gear}.gear;

    let allIngredients = recipe.content.steps.reduce((accumulator, step) => {
      // this is ugly but handles some weird null values that appear when steps are deleted.
      try {
        if(step.ingredients && step.ingredients.length > 0) {
          return accumulator.concat(step.ingredients);
        } else {
          return accumulator;
        }
      } catch (e) {
        return accumulator;
      }
    }, []);

    allIngredients = allIngredients.map((ingredient) => {
      const ingredientElements = [];

      const diff_operations = {
        add: "spork-diff-added",
        remove: "spork-diff-removed",
        none: ""
      };

      const generateElement = (className, qty=ingredient.qty, unit=ingredient.unit, name=ingredient.name) => {
        if(qty || unit || name){
          return (<li key={Math.random()} className={ className }>
            {/* only renders : if there is there is a qty or a unit  */}
            { adjustIngredientQuantity(qty, this.state.servingMultiplier) } {unit} {name}
          </li>);
        } else {
          return null;
        }
      };

      if("was" in ingredient){
        // if was key exists then this ingredient has a diff associated with it
        if(ingredient.was === null){
          // ingredient was previously null, so it is a new ingredient
          ingredientElements.push(generateElement(diff_operations["add"]));
        } else if (!ingredient.qty && !ingredient.unit && !ingredient.name){
          // ingredient has no values, only a was, so has been removed.
          ingredientElements.push(generateElement(diff_operations["remove"], ingredient.was.qty, ingredient.was.unit, ingredient.was.name));
        } else {
          // otherwise ingredient has been modified, so add a "removed" ingredient and an "Added" ingredient
          ingredientElements.push(generateElement(diff_operations["remove"], ingredient.was.qty, ingredient.was.unit, ingredient.was.name));
          ingredientElements.push(generateElement(diff_operations["add"], ingredient.qty, ingredient.unit, ingredient.name));
        }
      } else {
        ingredientElements.push(generateElement(diff_operations["none"]));
      }

      return ingredientElements;
    });

    // due to the mapping and the way diffs are handled, some of the elements are arrays. This flattens them.
    allIngredients = [].concat(allIngredients);

    // maps out numbered directions for making the recipe
    const listInstructions = recipe.content.steps.reduce((accumulator, step) => {
      // this is ugly but handles some weird null values that appear when steps are deleted.
      try {
        if(step.instructions){
          accumulator.push(
            <div key={Math.random()}>
              <li>{step.instructions}</li>
            </div>
          );
          return accumulator;
        } else {
          return accumulator;
        }
      } catch (e) {
        return accumulator;
      }
    }, []);

    return (
      <article className="DPU-main-container">
        <div className="DPU-centered-title">
          <h1 className="DPU-title">{title}</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="DPU-left col-5">
              {/* either renders photo from db is it exists or placeholder photo */}
              <img className="DPU-image" src={photo_url || photoPlaceholder} alt="Delicious Food" /><br />
              <div className="popup-buttons">
                <div className="row justify-content-center">
                  <FullScreenButton recipe={this.props.getRecipeById(recipe.id)} multi={this.state.servingMultiplier} />
                  {/* Hide spork button if not logged in, or it's your recipe you're viewing */}
                  {this.props.current_user_id !== recipe.user_id && this.props.current_user_id && <button type="button" className={"btn btn-primary"} onClick={(e) => { this.props.sporkRecipe(this.props.getRecipeById(recipe.id), e);}}><i className="fas fa-clone"></i> Spork</button>}
                  {this.props.current_user_id === recipe.user_id && <button type="button" name="editRecipe" className={"btn btn-primary"} onClick={(e) => {this.props.toggleViews(e, this.props.getRecipeById(recipe.id));}}><i className="fas fa-edit"></i> Edit</button>}
                </div>
                <div className="row justify-content-center">
                  <form>
                    <div className="serving-size">
                      <span>Serving Size </span>
                      <select className="form-control" id="adjustServing" value={this.state.servingMultiplier} onChange={this.adjustServingSize}>
                        <option value="0.5">Half</option>
                        <option value="1">Normal</option>
                        <option value="2">Double</option>
                        <option value="4">Quadruple</option>
                      </select>
                    </div>
                  </form>
                </div>
                <div className="row justify-content-center">
                  {(this.state.recipeVariations.length > 1) &&
                    (<RecipeVariations
                      showVariation={this.showVariation}
                      variationsCount={this.state.recipeVariations.length}
                      displayIndex={this.state.displayIndex}
                    />)
                  }
                </div>
              </div>
              <div className="DPU-centered-title">
                <strong>Ingredients:</strong><br />
              </div>
              <div className="DPU-ingredients">
                { allIngredients }<br />
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
                </table> }<br />




            </div>
            <div className="DPU-right col-7 ">
              <div className="vertically-centered">
                <strong>Intro:</strong> {intro}<br/><br/>
                {/* only renders gear on detail page if there are some in the recipe and in a comma separated list */}
                {gear ? <div><strong>Gear:</strong> {gearArr.join(", ")} <br /><br /></div> : ""}
                {/* <strong>Gear:</strong> {gear}<br/><br/>       */}
                <strong>Instructions:</strong> <ol>{listInstructions}</ol><br />
                {/* only renders warnings on detail page if there are some in the recipe */}
                {warnings ? <div><strong>Warning:</strong> {warnings} <br /><br /></div> : ""}
                {/* only renders reference url if one exists */}
                {reference_url ? <strong><a target="_blank" href={reference_url}>Click here to get the whole story from the source</a></strong> : ""}
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}
