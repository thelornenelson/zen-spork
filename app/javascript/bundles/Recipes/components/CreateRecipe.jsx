import React from 'react';

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
      steps: 1,
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
    this.onRemoveStep = this.onRemoveStep.bind(this);
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
    this.setState({
      steps: this.state.steps + 1
    });
    //create a new area to add ingredients
  }

  onRemoveStep(e) {
    e.preventDefault();
    if(this.state.steps > 1){
      this.setState({
        steps: this.state.steps - 1
      });
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
        <h4 id="create-recipe-title">Create A New Recipe</h4>

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
            <div className="row">
              <div className="col-lg-10">
                <div className="form-group">
                  <label htmlFor="InputStepInstructions">Step {this.state.steps}</label>
                  <textarea type="text" className="form-control" id="InputStepInstruciton" placeholder="Step Directions" onInput={this.onStepDirectionsInput}/>
                </div>
              </div>
              <div className="col-lg-2 float-right">
                <button className="btn btn-secondary" onClick={this.onAddStep}>Add Step</button>
              </div>
            </div>
              <div className="row">
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputIngredient">Ingredient</label>
                  <input type="text" className="form-control" id="InputIngredient" placeholder="Ingredient's Name" onInput={this.onIngredientNameInput}/>
                </div>
              </div>
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputUnit">Unit</label>
                  <input type="text" className="form-control" id="InputUnit" placeholder="Unit" onInput={this.onUnitInput}/>
                </div>
              </div>
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputQuantity">Quantity</label>
                  <input type="text" className="form-control" id="InputQuantity" placeholder="Quantity" onInput={this.onQuantityInput}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg">
                <button className="btn btn-secondary">Add Ingredient</button>
              </div>
            </div>

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