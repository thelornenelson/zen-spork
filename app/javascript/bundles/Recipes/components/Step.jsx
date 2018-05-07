import React from "react"

export default class Step extends React.Component {


  constructor(){
    super()

    // this.state = {
    //   title: "",
    //   photo: "",
    //   description: "",
    //   gear: "",
    //   warnings: "",
    //   prepTime: 0,
    //   cookTime: 0,
    //   servings: 0,
    //   numberOfSteps: 1,
    //   steps: [1],
    //   stepDirections: "",
    //   ingredientName: "",
    //   unit: "",
    //   quantity: "",
    //   ingredients: {}
      // need some way to track the ingredients for each step
    // }

    // this.onTitleInput = this.onTitleInput.bind(this);
    // this.onPhotoInput = this.onPhotoInput.bind(this);
    // this.onDescriptionInput = this.onDescriptionInput.bind(this);
    // this.onGearInput = this.onGearInput.bind(this);
    // this.onWarningsInput = this.onWarningsInput.bind(this);
    // this.onPrepTimeInput = this.onPrepTimeInput.bind(this);
    // this.onCookTimeInput = this.onCookTimeInput.bind(this);
    // this.onServingsInput = this.onServingsInput.bind(this);
    // this.onStepDirectionsInput = this.onStepDirectionsInput.bind(this);
    // this.onIngredientNameInput = this.onIngredientNameInput.bind(this);
    // this.onUnitInput = this.onUnitInput.bind(this);
    // this.onQuantityInput = this.onQuantityInput.bind(this);
    // this.onAddStep = this.onAddStep.bind(this);
    // this.onRemoveStep = this.onRemoveStep.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  // onTitleInput (e) {
  //   this.setState({
  //     title: e.target.value
  //   });
  // }

  // onPhotoInput (e) {
  //   this.setState({
  //     photo: e.target.value
  //   });
  // }

  // onDescriptionInput (e) {
  //   this.setState({
  //     description: e.target.value
  //   });
  // }

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

  // onPrepTimeInput (e) {
  //   this.setState({
  //     prepTime: e.target.value
  //   });
  // }

  // onCookTimeInput (e) {
  //   this.setState({
  //     cookTime: e.target.value
  //   });
  // }

  // onServingsInput (e) {
  //   this.setState({
  //     servings: e.target.value
  //   });
  // }

  // onStepDirectionsInput (e) {
  //   this.setState({
  //     stepDirections: e.target.value
  //   });
  // }

  // onIngredientNameInput (e) {
  //   this.setState({
  //     ingredientName: e.target.value
  //   });
  // }

  // onUnitInput (e) {
  //   this.setState({
  //     unit: e.target.value
  //   });
  // }

  // onQuantityInput (e) {
  //   this.setState({
  //     quantity: e.target.value
  //   });
  // }


  // onAddStep(e) {
  //   e.preventDefault();
  //   console.log(typeof this.state.steps)
  //   // this.setState({
  //   //   steps: (this.state.steps).push(this.state.numberOfSteps + 1),
  //   // })
  //   this.setState({
  //     numberOfSteps: this.state.numberOfSteps + 1
  //   })


  //   console.log(this.state.steps);
  //   //create a new area to add ingredients
  // }

  // onRemoveStep(e) {
  //   e.preventDefault();
  //   if(this.state.numberOfSteps > 1){
  //     this.setState({
  //       numberOfSteps: this.state.numberOfSteps - 1
  //     });
  //   };

  // }

  // onSubmit(e) {
  //   e.preventDefault();
  //   console.log('Hello State: ' + this.state)
  // }s



  render() {

    return (
      <div className="steps-area">
        <div className="row">
          <div className="col">
            <div className="create-title">Directions And Ingredients</div>
            <button className="btn btn-secondary" onClick={this.props.onAddStep}>Add Step</button>
          </div>
        </div>

        <div>
        {this.props.steps.map((step, index) => (
          <div key={index}>
          <div className="row">
            <div className="col-lg-10">
              <div className="form-group">
                <label htmlFor="InputStepInstructions">Step {index + 1}</label>
                <textarea type="text" className="form-control" id="InputStepInstruciton" placeholder="Step Directions" onInput={this.onStepDirectionsInput}/>
              </div>
            </div>
            {index > 0 &&
              <div className="col-lg-2 float-right">
                <button className="btn btn-danger" onClick={(e) => this.props.onDeleteStep(step.id, e)}>Delete Step</button>
              </div>
            }
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
          </div>
        ))}
        </div>
      </div>
    )
  }
}