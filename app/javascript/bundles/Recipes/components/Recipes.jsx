import React from "react";
// importing components to render
import Navbar from "./Navbar.jsx";
import CreateRecipe from "./CreateRecipe.jsx";
import SingleRecipe from "./SingleRecipe.jsx";
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
      recipeIndex: true,
      myRecipesView: false,
      recipes: []
    };
    this.toggleCreateRecipe = this.toggleCreateRecipe.bind(this);
    this.toggleCookingView = this.toggleCookingView.bind(this);
    this.toggleMyRecipesView = this.toggleMyRecipesView.bind(this);
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

  toggleMyRecipesView = () => {
    this.state.myRecipesView ? this.setState({ myRecipesView: false}) : this.setState({ myRecipesView: true});
  }

  // called to toggle cooking view of recipe with full screen
  toggleCookingView = () => {
    this.state.cookingView ? this.setState({ cookingView: false, recipeIndex: true }) : this.setState({cookingView : true, recipeIndex : false});
  }

  // called to toggle the create recipe componenet
  toggleCreateRecipe = () => {
    this.state.createRecipe ? this.setState({ createRecipe: false, recipeIndex: true }) : this.setState({ createRecipe: true, recipeIndex: false });
  }

  render() {
    // maps recipe index cards

    let recipes = [];
    const myRecipesViewToggle = ((this.state.myRecipesView)
      ? (<div className="myRecipesBox"> My Recipes </div>)
      : (<div className="myRecipesBox"> All Recipes </div>));

    if (this.state.myRecipesView === false) {

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
      recipes = myRecipesArray.map((recipe) => {
        return(
          <RecipeIndex key={recipe.id} recipe={recipe} toggleCookingView={this.toggleCookingView} />
        );
      });
    }
    return (
      <div>
        {/* components are visible when their state boolean is true */}
        {this.state.cookingView && <SingleRecipe toggleCookingView={this.toggleCookingView} /> }
        <Navbar current_user={this.props.current_user} toggleCreateRecipe = {this.toggleCreateRecipe} toggleMyRecipesView={this.toggleMyRecipesView} isMyRecipesView={this.state.myRecipesView} />
        {myRecipesViewToggle}
        <div className="container">
          {this.state.createRecipe && <CreateRecipe />}
          { this.state.recipeIndex && recipes }
        </div>
      </div>
    );
  }
}