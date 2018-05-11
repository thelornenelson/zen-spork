import React from "react";
// importing components to render
import Navbar from "./Navbar.jsx";
import CreateRecipe from "./CreateRecipe.jsx";
import FullScreenView from "./FullScreenView";
import RecipeIndex from "./RecipeIndex.jsx";
import "whatwg-fetch";

export default class Recipes extends React.Component {
  constructor(props) {
    super(props);
    // Boolean state for hiding components on clicks
    // And recipes array from database
    this.state = {
      cookingView: false,
      createRecipe: false,
      editRecipe: false,
      currentEditRecipe: {},
      recipeIndex: true,
      myRecipesView: false,
      recipes: []
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

  // called to toggle between the myRecipes view and all recipes view
  toggleMyRecipesView = () => {
    this.state.myRecipesView ? this.setState({ myRecipesView: false}) : this.setState({ myRecipesView: true});
  }

  // called to toggle cooking view of recipe with full screen
  toggleCookingView = () => {
    this.state.cookingView ? this.setState({ cookingView: false, recipeIndex: true }) : this.setState({cookingView : true, recipeIndex : false});
  }

  // called to toggle the create recipe componenet
  toggleCreateRecipe = () => {
    this.state.createRecipe ? this.setState({ createRecipe: false, recipeIndex: true, editRecipe: false }) : this.setState({ createRecipe: true, recipeIndex: false, editRecipe: false});
  }

  editRecipe = (currentRecipe, e) => {
    e.preventDefault();
    this.state.editRecipe ? this.setState({ editRecipe: false, recipeIndex: true, createRecipe: false }) : this.setState({ editRecipe: true, recipeIndex: false, createRecipe: false });
    this.setState({
      currentEditRecipe: currentRecipe
    });
  }

  returnToIndexView = (e) => {
    if(e){
      e.preventDefault();
    }else{
      this.getRecipes();
    }
    this.setState({ editRecipe: false, recipeIndex: true, createRecipe: false });
  }

  render() {
    let recipes = [];

    if (this.state.myRecipesView === false) {

      // maps recipe index cards
      recipes = this.state.recipes.map((recipe) => {
        return(
          <RecipeIndex key={recipe.id} recipe={recipe} toggleCookingView={this.toggleCookingView} />
        );
      });
    } else {
      let myRecipesArray = [];
      for (let i = 0; i < this.state.recipes.length; i++) {
        if (this.state.recipes[i].user_id === this.props.current_user_id) {
          myRecipesArray.push(this.state.recipes[i]);
        }
      }

      //maps recipe index cards for just the logged in users recipes
      recipes = myRecipesArray.map((recipe) => {
        return(
          <RecipeIndex key={recipe.id} recipe={recipe} toggleCookingView={this.toggleCookingView} />
        );
      });
    }

    return (
      <div>
        <Navbar current_user={this.props.current_user} toggleCreateRecipe={this.toggleCreateRecipe} toggleMyRecipesView={this.toggleMyRecipesView} isMyRecipesView={this.state.myRecipesView} />
        {/* components are visible when their state boolean is true */}
        {this.state.cookingView && <FullScreenView toggleCookingView={this.toggleCookingView} /> }
        <div className="container">
          {this.state.createRecipe && <CreateRecipe returnToIndexView={this.returnToIndexView}/>}
          {this.state.editRecipe && <CreateRecipe returnToIndexView={this.returnToIndexView} currentEditRecipe={this.state.currentEditRecipe} editRecipeView={this.state.editRecipe}/>}
          {this.state.recipeIndex && recipes}
        </div>
      </div>
    );
  }
}