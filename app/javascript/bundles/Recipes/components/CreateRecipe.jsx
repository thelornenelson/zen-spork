import React from "react";
import NewRecipeSteps from "./NewRecipeSteps.jsx";
import "whatwg-fetch";

export default class CreateRecipe extends React.Component {

  constructor(){
    super();

    this.state = {
      statusEdit: false,
      title: "",
      photo: "",
      description: "",
      // gear: "",
      // warnings: "",
      prepTime: "",
      cookTime: "",
      servings: "",
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
    this.resetCreateRecipeForm = this.resetCreateRecipeForm.bind(this);
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
    }).then((response) => {
      response.status;     //=> number 100–599
      response.statusText; //=> String
      response.headers;    //=> Headers
      response.url;        //=> String
      if(response.status === 201){
        this.resetCreateRecipeForm();
      }
      return response.text();
    }, function(error) {
      error.message; //=> String
    });

  }

  resetCreateRecipeForm(){
    this.setState({
      title: "",
      photo: "",
      description: "",
      // gear: "",
      // warnings: "",
      prepTime: "",
      cookTime: "",
      servings: "",
      steps: [
        {
          instructions: "",
          ingredients: [""]
        }
      ]
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

  fillEditRecipeForm(recipe){
    const recipeSteps = [];
    recipe.content.steps.forEach((step) =>{
      const ingredientsForStep = [];
      step.ingredients.forEach((ingredient) => {
        const currentIngredient = (ingredient.qty + "  " + ingredient.unit + "  " + ingredient.name);
        ingredientsForStep.push(currentIngredient);
      });
      const currentStep = {
        instructions: step.instructions,
        ingredients: ingredientsForStep,
      };
      recipeSteps.push(currentStep);
    });
    this.setState({
      title: recipe.title,
      photo: recipe.photo_url,
      description: recipe.content.intro,
      // gear: "",
      // warnings: "",
      prepTime: recipe.content.prep_time,
      cookTime: recipe.content.cook_time,
      servings: recipe.content.servings,
      steps: recipeSteps,
    });
  }

  componentDidMount() {
    const recipe = {
      "id": 1,
      "user_id": 1,
      "title": "Scotch eggs",
      "content": {
        "intro": "Scotch eggs Try-hard cornhole drinking next level selfies mixtape tousled.",
        "gear": [
          "seitan",
          "dolore",
          "quam"
        ],
        "warnings": "Synth jean shorts waistcoat deep v roof schlitz.",
        "prep_time": "26 minutes",
        "cook_time": "40 minutes",
        "servings": "serves 4",
        "steps": [
          {
            "instructions": "Whatever plaid shabby chic put a bird on it crucifix.",
            "ingredients": [
              {
                "qty": "1/2",
                "unit": "teaspoon",
                "name": "Lychees"
              },
              {
                "qty": "1/2",
                "unit": "quart",
                "name": "Peaches"
              },
              {
                "qty": "1",
                "unit": "quart",
                "name": "Peppercorns"
              },
              {
                "qty": "1/2",
                "unit": "tablespoon",
                "name": "Wholegrain Bread"
              },
              {
                "qty": "2",
                "unit": "quart",
                "name": "Raspberry"
              },
              {
                "qty": "1/2",
                "unit": "teaspoon",
                "name": "Wattleseed"
              }
            ]
          },
          {
            "instructions": "Portland yuccie craft beer hoodie slow-carb pinterest. Salvia selfies readymade shoreditch phlogiston street. Vinyl viral beard fixie.",
            "ingredients": [
              {
                "qty": "2",
                "unit": "quart",
                "name": "Lemon"
              },
              {
                "qty": "3",
                "unit": "pint",
                "name": "SoyFlour"
              },
              {
                "qty": "1/3",
                "unit": "cup",
                "name": "Honeydew melon"
              }
            ]
          },
          {
            "instructions": "Biodiesel drinking messenger bag chicharrones next level truffaut lomo. Meh thundercats fanny pack church-key humblebrag migas. Whatever retro mustache.",
            "ingredients": [
              {
                "qty": "1",
                "unit": "gallon",
                "name": "Asian Greens"
              },
              {
                "qty": "1/3",
                "unit": "teaspoon",
                "name": "Sultanas"
              },
              {
                "qty": "1",
                "unit": "teaspoon",
                "name": "Spring Onions"
              }
            ]
          },
          {
            "instructions": "Swag banh mi kogi typewriter chia selfies celiac. Tumblr iphone chillwave pour-over plaid echo.",
            "ingredients": [
              {
                "qty": "1",
                "unit": "tablespoon",
                "name": "Passionfruit"
              },
              {
                "qty": "1",
                "unit": "gallon",
                "name": "Monkfish"
              },
              {
                "qty": "1/3",
                "unit": "pint",
                "name": "Soymilk"
              },
              {
                "qty": "3",
                "unit": "cup",
                "name": "SwedeSweet Chilli Sauce"
              },
              {
                "qty": "1/3",
                "unit": "gallon",
                "name": "Star Anise"
              },
              {
                "qty": "1/4",
                "unit": "tablespoon",
                "name": "Kiwiberries"
              }
            ]
          }
        ]
      },
      "note": null,
      "photo_url": "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&h=350",
      "created_at": "2018-05-09T22:44:12.368Z",
      "updated_at": "2018-05-09T22:44:12.368Z"
    };

    this.fillEditRecipeForm(recipe);
  }

  render() {
    const title = (this.state.statusEdit) ? (<div className="create-title">Edit Recipe</div>): (<div className="create-title">Create A New Recipe</div>);
    return (

      <div className="new-recipe">
        <button type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        {title}
        <form onSubmit={this.onSubmit}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputRecipeTitle">Recipe Title</label>
                  <input type="text" className="form-control" id="InputRecipeTitle" placeholder="Enter Title" value={this.state.title} onInput={this.onTitleInput}/>
                </div>
              </div>
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputPhoto">Photo</label>
                  <input type="text" className="form-control" id="InputPhoto" placeholder="Add A Photo Url" value={this.state.photo} onInput={this.onPhotoInput}/>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputDescription">Description</label>
                  <textarea type="text" className="form-control" id="InputDescription" placeholder="Description" value={this.state.description} onInput={this.onDescriptionInput}/>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputPrepTime">Prep Time</label>
                  <input type="text" className="form-control" id="InputPrepTime" placeholder="Prep Time" value={this.state.prepTime} onInput={this.onPrepTimeInput}/>
                </div>
              </div>
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputCookTime">Cook Time</label>
                  <input type="text" className="form-control" id="InputCookTime" placeholder="Cook Time" value={this.state.cookTime} onInput={this.onCookTimeInput}/>
                </div>
              </div>
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="InputServings">Servings</label>
                  <input type="text" className="form-control" id="InputServings" placeholder="Servings" value={this.state.servings} onInput={this.onServingsInput}/>
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
