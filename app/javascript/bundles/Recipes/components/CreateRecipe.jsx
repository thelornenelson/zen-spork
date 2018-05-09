import React from "react";
import NewRecipeSteps from "./NewRecipeSteps.jsx";
import "whatwg-fetch";

export default class CreateRecipe extends React.Component {

  constructor(){
    super();

    this.state = {
      title: "",
      photo: "",
      description: "",
      // gear: "",
      // warnings: "",
      prepTime: 0,
      cookTime: 0,
      servings: 0,
      steps: [
        {
          instructions: "",
          ingredients: [""]
        }
      ]
    };

    this.onTitleInput = this.onTitleInput.bind(this);
    this.onPhotoInput = this.onPhotoInput.bind(this);
    this.onDescriptionInput = this.onDescriptionInput.bind(this);
    // this.onGearInput = this.onGearInput.bind(this);
    // this.onWarningsInput = this.onWarningsInput.bind(this);
    this.onPrepTimeInput = this.onPrepTimeInput.bind(this);
    this.onCookTimeInput = this.onCookTimeInput.bind(this);
    this.onServingsInput = this.onServingsInput.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.addStep = this.addStep.bind(this);
    this.deleteStep = this.deleteStep.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);
    this.changeInstructions = this.changeInstructions.bind(this);
    this.changeIngredient = this.changeIngredient.bind(this);
  }

  onTitleInput (e) {
    this.setState({
      title: e.target.value
    });
  }

  onPhotoInput (e) {
    this.setState({
      photo: e.target.value
    });
  }

  onDescriptionInput (e) {
    this.setState({
      description: e.target.value
    });
  }

  // onGearInput (e) {
  //   this.setState({
  //     gear: e.target.value
  //   });
  // }

  // onWarningsInput (e) {
  //   this.setState({
  //     warnings: e.target.value
  //   });
  // }

  onPrepTimeInput (e) {
    this.setState({
      prepTime: e.target.value
    });
  }

  onCookTimeInput (e) {
    this.setState({
      cookTime: e.target.value
    });
  }

  onServingsInput (e) {
    this.setState({
      servings: e.target.value
    });
  }

  onSubmit(e) {

    e.preventDefault();
    console.dir(this.state);

    // this seems a bit clumsy, but I want to avoid just posting this.state without whitelisting the keys.
    const { title, photo, description, prepTime, cookTime, servings, steps } = this.state;

    // Also allows renaming the camel case keys to snake case, to match expectations on back end.
    const recipeData = { recipe: { title, photo_url: photo, content: { intro: description, prep_time: prepTime, cook_time: cookTime, servings, steps }}};

    fetch("/recipes", {
      method: "POST",
      body: JSON.stringify(recipeData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    }).then(function(response) {
      response.status;     //=> number 100–599
      response.statusText; //=> String
      response.headers;    //=> Headers
      response.url;        //=> String

      return response.text();
    }, function(error) {
      error.message; //=> String
    });

  }

  addStep(e) {
    e.preventDefault();
    const newSteps = this.state.steps.concat([{ instructions: "", ingredients: [""] }]);
    this.setState({ steps: newSteps });
  }

  deleteStep(stepIndex, e) {
    e.preventDefault();
    //makes a copy of the steps array so we can change it
    const newSteps = this.state.steps.slice();
    //removes the step we don't want
    newSteps.splice(stepIndex, 1);
    this.setState({ steps: newSteps });
  }

  addIngredient(stepIndex, e) {
    e.preventDefault();
    console.log(`stepIndex = ${stepIndex}`);
    const newSteps = this.state.steps.slice(0);
    newSteps[stepIndex].ingredients.push("");
    this.setState({ steps: newSteps });
  }

  deleteIngredient(stepIndex, ingredientIndex, e) {
    e.preventDefault();
    const newSteps = this.state.steps.slice(0);
    newSteps[stepIndex].ingredients.splice(ingredientIndex, 1);
    this.setState({ steps: newSteps });
  }

  changeInstructions(stepIndex, newInstructions) {
    const newSteps = this.state.steps.slice(0);
    newSteps[stepIndex].instructions = newInstructions;
    this.setState({ steps: newSteps });
  }

  changeIngredient(stepIndex, ingredientIndex, newIngredient) {
    const newSteps = this.state.steps.slice(0);
    newSteps[stepIndex].ingredients[ingredientIndex] = newIngredient;
    this.setState({ steps: newSteps });
  }

  render() {
    return (
      <div className="new-recipe">
        <button type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="create-title">Create A New Recipe</div>

        <form onSubmit={this.onSubmit}>

          <div className="container-fluid">
            <div className="row">
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputRecipeTitle">Recipe Title</label>
                  <input type="text" className="form-control" id="InputRecipeTitle" placeholder="Enter Title" onInput={this.onTitleInput}/>
                </div>
              </div>
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputPhoto">Photo</label>
                  <input type="text" className="form-control" id="InputPhoto" placeholder="Add A Photo Url" onInput={this.onPhotoInput}/>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputDescription">Description</label>
                  <textarea type="text" className="form-control" id="InputDescription" placeholder="Description" onInput={this.onDescriptionInput}/>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputPrepTime">Prep Time</label>
                  <input type="text" className="form-control" id="InputPrepTime" placeholder="Prep Time" onInput={this.onPrepTimeInput}/>
                </div>
              </div>
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputCookTime">Cook Time</label>
                  <input type="text" className="form-control" id="InputCookTime" placeholder="Cook Time" onInput={this.onCookTimeInput}/>
                </div>
              </div>
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputServings">Servings</label>
                  <input type="text" className="form-control" id="InputServings" placeholder="Servings" onInput={this.onServingsInput}/>
                </div>
              </div>
            </div>
            <NewRecipeSteps addStep={this.addStep}
              deleteStep={this.deleteStep}
              addIngredient={this.addIngredient}
              deleteIngredient={this.deleteIngredient}
              steps={this.state.steps}
              changeInstructions={this.changeInstructions}
              changeIngredient={this.changeIngredient}
            />
            <div className="row">
              <div className="col-lg">
                <button className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-secondary">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
