import React from "react"
import Step from "./Step.jsx"
export default class CreateRecipe extends React.Component {


  constructor(){
    super()

    this.state = {
      title: "",
      photo: "",
      description: "",
      gear: "",
      warnings: "",
      prepTime: 0,
      cookTime: 0,
      servings: 0,
      numberOfSteps: 1,
      steps: [{ id: 1, directions: "", ingredients: [{id: 1, qty: "", unit: "", name: ""}]}],
      stepDirections: "",
      ingredientName: "",
      unit: "",
      quantity: "",
      ingredients: {}
      // need some way to track the ingredients for each step
    }

    this.onTitleInput = this.onTitleInput.bind(this);
    this.onPhotoInput = this.onPhotoInput.bind(this);
    this.onDescriptionInput = this.onDescriptionInput.bind(this);
    this.onGearInput = this.onGearInput.bind(this);
    this.onWarningsInput = this.onWarningsInput.bind(this);
    this.onPrepTimeInput = this.onPrepTimeInput.bind(this);
    this.onCookTimeInput = this.onCookTimeInput.bind(this);
    this.onServingsInput = this.onServingsInput.bind(this);
    this.onStepDirectionsInput = this.onStepDirectionsInput.bind(this);
    this.onIngredientNameInput = this.onIngredientNameInput.bind(this);
    this.onUnitInput = this.onUnitInput.bind(this);
    this.onQuantityInput = this.onQuantityInput.bind(this);
    this.onAddStep = this.onAddStep.bind(this);
    this.onDeleteStep = this.onDeleteStep.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onGearInput (e) {
    this.setState({
      gear: e.target.value
    });
  }

  onWarningsInput (e) {
    this.setState({
      warnings: e.target.value
    });
  }

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

  onStepDirectionsInput (e) {
    this.setState({
      stepDirections: e.target.value
    });
  }

  onIngredientNameInput (e) {
    this.setState({
      ingredientName: e.target.value
    });
  }

  onUnitInput (e) {
    this.setState({
      unit: e.target.value
    });
  }

  onQuantityInput (e) {
    this.setState({
      quantity: e.target.value
    });
  }


  onAddStep(e) {
    e.preventDefault();
    this.setState(prevState => ({
      numberOfSteps: prevState.numberOfSteps + 1,
    }))
    this.setState(prevState => ({
      steps: prevState.steps.concat([{ id: prevState.numberOfSteps, directions: "" }])
    }))
    //create a new area to add ingredients
  }

  onDeleteStep(id, e) {
    e.preventDefault();
    const stepIndex = this.state.steps.findIndex(function findStepIndex(step){
      return step.id = id
    });
    //makes a copy of the steps array so we can change it
    let newarray = this.state.steps.slice();
    //removes the step we don't want
    newarray.splice(stepIndex, 1);
    console.log(newarray)
    if(this.state.numberOfSteps > 1){
      this.setState(prevState => ({
        numberOfSteps: prevState.numberOfSteps - 1,
        steps: newarray
      }))
    };
  }

  onSubmit(e) {
    e.preventDefault();
    console.log('Hello State: ' + this.state)
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
                <label htmlFor="InputGear">Gear</label>
                <input type="text" className="form-control" id="InputGear" placeholder="Gear" onInput={this.onGearInput}/>
              </div>
              </div>
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputWarnings">Warnings</label>
                  <input type="text" className="form-control" id="InputWarnings" placeholder="Warnings" onInput={this.onWarningsInput}/>
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

            <Step steps={this.state.steps} onAddStep={this.onAddStep} onDeleteStep={this.onDeleteStep}/>

            <div className="row">
              <div className="col-lg">
                <button className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-secondary">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}