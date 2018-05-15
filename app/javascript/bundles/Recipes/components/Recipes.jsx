import React from "react";
import Navbar from "./Navbar.jsx";
import CreateRecipe from "./CreateRecipe.jsx";
import RecipeIndex from "./RecipeIndex.jsx";
import "whatwg-fetch";

export default class Recipes extends React.Component {
  constructor(props) {
    super(props);
    // Boolean state for hiding components on clicks
    // And recipes array from database
    this.state = {
      createRecipe: false,
      editRecipe: false,
      recipeIndex: true,
      myRecipesView: false,
      currentEditRecipe: {},
      recipes: [],
      notification: "",
    };
  }

  // calls get recipe after virtual DOM is loaded
  componentDidMount() {
    this.getRecipes();
  }

  // gets recipes, sets to state and returns a console error on problem
  getRecipes() {
    fetch("/recipes.json")
      .then((response) => {
        return response.json();
      })
      .then((recipes) => {
        this.setState({ recipes: recipes });
      })
      .catch((ex) => {
        console.log("parsing failed", ex);
      });
  }

  toggleViews = (e, currentRecipe) => {
    e.preventDefault();
    let newState = {
      createRecipe: false,
      editRecipe: false,
      recipeIndex: false,
      myRecipesView: false,
    };
    if(this.state[e.target.name]){
      newState.recipeIndex = true;
    } else if (e.target.name === "myRecipesView"){
      newState[e.target.name] = true;
      newState.recipeIndex = true;
    } else if (currentRecipe){
      this.setState({
        currentEditRecipe: currentRecipe
      });
      newState.editRecipe = true;
    } else {
      newState[e.target.name] = true;
    }
    this.setState(newState);
    this.getRecipes();
  }

  returnToIndexView = () => {
    this.getRecipes();
    this.setState({createRecipe: false, editRecipe: false, recipeIndex: true, myRecipesView: false,});
  }

  sporkRecipe = (currentRecipe, e) => {
    e.preventDefault();
    const recipeData = currentRecipe;
    fetch(("/recipes/" + recipeData.id + "/sporks"), {
      method: "POST",
      body: JSON.stringify(recipeData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    }).then((response) => {
      if (response.status === 201 || response.status === 200) {
        this.returnToIndexView();
        this.showNotification("Spork Created!");
      }
      return response.text();
    }, function (error) {
      console.log("Error:", error.message);
    });
  }

  showNotification = (newNotification) =>{
    this.setState({ notification: newNotification });
    setTimeout(() => {
      this.setState({ notification: "" });
    }, 3000);
  }

  render() {
    // makes a variable of all the recipes that match the logged in user
    const userRecipes = this.state.recipes.filter(recipe => recipe.user_id === this.props.current_user_id);
    const recipes = this.state.recipes.map((recipe) => {
      return ((this.state.myRecipesView)?
        (this.props.current_user_id === recipe.user_id && <RecipeIndex key={recipe.id} recipe={recipe} toggleViews={this.toggleViews} sporkRecipe={this.sporkRecipe} current_user_id={this.props.current_user_id}/>):
        (<RecipeIndex key={recipe.id} recipe={recipe} toggleViews={this.toggleViews} sporkRecipe={this.sporkRecipe} current_user_id={this.props.current_user_id}/>)
      );
    });
    return (
      <div>
        <Navbar user_recipes={userRecipes} current_user_last_name={this.props.current_user_last_name} current_user_name={this.props.current_user_name} current_user={this.props.current_user} notification={this.state.notification} toggleViews={this.toggleViews} myRecipesView={this.state.myRecipesView}/>
        <div className="container">
          {this.state.createRecipe && <CreateRecipe returnToIndexView={this.returnToIndexView} toggleViews={this.toggleViews} showNotification={this.showNotification}/>}
          {this.state.editRecipe && <CreateRecipe returnToIndexView={this.returnToIndexView} toggleViews={this.toggleViews} currentEditRecipe={this.state.currentEditRecipe} editRecipeView={this.state.editRecipe} showNotification={this.showNotification}/>}
          {this.state.recipeIndex && recipes}
        </div>
      </div>
    );
  }
}