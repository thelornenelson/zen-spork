
import React from "react";
import NewRecipeSteps from "./NewRecipeSteps.jsx";

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
          description: "",
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
    this.changeDescription = this.changeDescription.bind(this);
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
    console.log("Hello State: " + this.state);
  }

  addStep() {
    const newSteps = this.state.steps.concat([{ description: "", ingredients: [""] }]);
    this.setState({ steps: newSteps });
  }

  deleteStep(stepIndex) {
    //makes a copy of the steps array so we can change it
    const newSteps = this.state.steps.slice();
    //removes the step we don't want
    newSteps.splice(stepIndex, 1);
    this.setState({ steps: newSteps });
  }

  addIngredient(stepIndex) {
    console.log(`stepIndex = ${stepIndex}`);
    const newSteps = this.state.steps.slice(0);
    newSteps[stepIndex].ingredients.push("");
    this.setState({ steps: newSteps });
  }

  deleteIngredient(stepIndex, ingredientIndex) {
    const newSteps = this.state.steps.slice(0);
    newSteps[stepIndex].ingredients.splice(ingredientIndex, 1);
    this.setState({ steps: newSteps });
  }

  changeDescription(stepIndex, newDescription) {
    const newSteps = this.state.steps.slice(0);
    newSteps[stepIndex].description = newDescription;
    this.setState({ steps: newSteps });
  }

  changeIngredient(stepIndex, ingredientIndex, newIngredient) {
    const newSteps = this.state.steps.slice(0);
    newSteps[stepIndex].ingredients[ingredientIndex] = newIngredient;
    this.setState({ steps: newSteps });
  }


  render() {
    const steps = this.state.steps.map((step) => {
      const ingredients = step.ingredients.map((ingredient) => {
        return(<li>{ ingredient }</li>);
      });
      return (<article><p>{ step.description }</p>
        <ul>{ ingredients }</ul></article>);
    });


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
              changeDescription={this.changeDescription}
              changeIngredient={this.changeIngredient}
            />
            {steps}
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