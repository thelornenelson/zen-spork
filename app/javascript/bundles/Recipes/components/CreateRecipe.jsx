import React from "react";
import NewRecipeSteps from "./NewRecipeSteps.jsx";
import "whatwg-fetch";

export default class CreateRecipe extends React.Component {

  constructor(){
    super();

    this.state = {
      statusEdit: false,
      editRecipe: {},
      title: "",
      photo: "",
      description: "",
      prepTime: "",
      cookTime: "",
      servings: "",
      steps: [{
        instructions: "",
        ingredients: "",
      }],
      reference_url: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.dir(this.state);

    // this seems a bit clumsy, but I want to avoid just posting this.state without whitelisting the keys.
    const { title, photo, description, prepTime, cookTime, servings, steps, reference_url } = this.state;
    console.log("steps ", steps, " Ingredients: ", steps.ingredients);
    steps.forEach((step)=> {
      step.ingredients = step.ingredients.trim().split("\n");
    });
    // Also allows renaming the camel case keys to snake case, to match expectations on back end.
    const recipeData = { recipe: { title, photo_url: photo, content: { intro: description, prep_time: prepTime, cook_time: cookTime, servings, steps }, reference_url}};

    fetch((this.state.statusEdit)?("/recipes/" + this.props.currentEditRecipe.id):("/recipes"),{
      method: ((this.state.statusEdit)?("PUT"):("POST")),
      body: JSON.stringify(recipeData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    }).then((response) => {
      if (response.status === 201 || response.status === 200 ){
        this.props.returnToIndexView();
        this.props.showNotification((this.state.statusEdit)?("Recipe Edited!"):("Recipe Created!"));
      }
      return response.text();
    }, function(error) {
      error.message; //=> String
    });
  }

  addStep = (e) => {
    e.preventDefault();
    const newSteps = this.state.steps.concat([{ instructions: "", ingredients: "" }]);
    this.setState({ steps: newSteps });
  }

  deleteStep = (stepIndex, e) => {
    e.preventDefault();
    //makes a copy of the steps array so we can change it
    const newSteps = this.state.steps.slice();
    //removes the step we don't want
    newSteps.splice(stepIndex, 1);
    this.setState({ steps: newSteps });
  }

  changeInstructions = (stepIndex, newInstructions, stepIngredients) => {
    const newSteps = this.state.steps.slice(0);
    if(newInstructions){
      newSteps[stepIndex].instructions = newInstructions;
    } else {
      newSteps[stepIndex].ingredients = stepIngredients;
    }
    this.setState({ steps: newSteps });
  }

  // changeIngredient = (stepIndex, stepIngredients) => {
  //   const newSteps = this.state.steps.slice(0);
  //   newSteps[stepIndex].ingredients = stepIngredients;
  //   this.setState({ steps: newSteps });
  // }

  fillEditRecipeForm = (e) => {
    if(e){e.preventDefault();}
    let recipe = this.props.currentEditRecipe;
    const recipeSteps = [];
    recipe.content.steps.forEach((step) =>{
      let ingredientsForStep = "";
      step.ingredients.forEach((ingredient) => {
        ingredientsForStep += (ingredient.qty + "  " + ingredient.unit + "  " + ingredient.name + "\n");
      });
      const currentStep = {
        instructions: step.instructions,
        ingredients: ingredientsForStep.slice(0, ingredientsForStep.length - 1),
      };
      recipeSteps.push(currentStep);
    });
    this.setState({
      title: recipe.title,
      photo: recipe.photo_url,
      description: recipe.content.intro,
      prepTime: recipe.content.prep_time,
      cookTime: recipe.content.cook_time,
      servings: recipe.content.servings,
      steps: recipeSteps,
      reference_url: recipe.reference_url,
    });
  }

  componentDidMount() {
    if(this.props.editRecipeView){
      this.setState({
        statusEdit: true
      });
      this.fillEditRecipeForm();
    }
  }

  render() {
    // checks that required fields have some input to enable the save button
    const isEnabled = this.state.title && this.state.steps[0].instructions;
    // const title = (this.state.statusEdit) ? (<div className="create-title">Edit Recipe</div>): (<div className="create-title">Create A New Recipe</div>);
    const pageTitle = (this.state.statusEdit) ? (<div className="create-title">Edit Recipe</div>): (<div className="create-title">Create A New Recipe</div>);
    return (
      <div className="new-recipe">
        <button type="button" name="recipeIndex" className="close" aria-label="Close" onClick={this.props.toggleViews}>&times;</button>
        {pageTitle}
        <form onSubmit={this.onSubmit}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg">
                <div className="form-group required">
                  <label htmlFor="InputRecipeTitle">Title</label>
                  <input type="text" className="form-control" name="title" id="InputRecipeTitle" placeholder="Enter Title" maxLength="30" value={this.state.title} onChange={this.handleChange}/>
                </div>
              </div>
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputPhoto">Photo</label>
                  <input type="text" className="form-control" name="photo" id="InputPhoto" placeholder="Add A Photo Url" value={this.state.photo} onChange={this.handleChange}/>
                </div>
              </div>
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="ReferenceUrl">Reference Link</label>
                  <input type="text" className="form-control" name="reference_url" id="ReferenceUrl" placeholder="Link to External Recipe" value={this.state.reference_url} onChange={this.handleChange}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputPrepTime">Prep Time</label>
                  <input type="text" className="form-control" name="prepTime" id="InputPrepTime" placeholder="Prep Time" value={this.state.prepTime} onChange={this.handleChange}/>
                </div>
              </div>
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputCookTime">Cook Time</label>
                  <input type="text" className="form-control" name="cookTime" d="InputCookTime" placeholder="Cook Time" value={this.state.cookTime} onChange={this.handleChange}/>
                </div>
              </div>
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputServings">Servings</label>
                  <input type="text" className="form-control" name="servings" id="InputServings" placeholder="Servings" value={this.state.servings} onChange={this.handleChange}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputDescription">Description</label>
                  <textarea type="text" className="form-control" name="description" id="InputDescription" placeholder="Description" value={this.state.description} onChange={this.handleChange} />
                </div>
              </div>
            </div>
            <NewRecipeSteps addStep={this.addStep}
              deleteStep={this.deleteStep}
              addIngredient={this.addIngredient}
              deleteIngredient={this.deleteIngredient}
              steps={this.state.steps}
              changeInstructions={this.changeInstructions}
              changeIngredient={this.changeIngredient}/>
            <div className="row">
              {/* required className and label for marking required fields */}
              <div className="col-lg required">
                <label>Required fields</label>
                <button className="btn btn-primary" name="recipeIndex" onClick={this.props.toggleViews}>Cancel</button>
                {this.state.statusEdit && <button className="btn btn-primary" onClick={this.fillEditRecipeForm}>Reset</button>}
                {/* disables save button if required fields aren't true */}
                <button type="submit" className="btn btn-primary" disabled={!isEnabled}>Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
