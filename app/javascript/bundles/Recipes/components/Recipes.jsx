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
      recipes: []
    };
    this.toggleCreateRecipe = this.toggleCreateRecipe.bind(this);
    this.toggleCookingView = this.toggleCookingView.bind(this);
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
    const recipes = this.state.recipes.map((recipe) => {
      return(
        <RecipeIndex key={recipe.id} recipe={recipe} toggleCookingView={this.toggleCookingView} />
      );
    });
    return (
      <div>
        {/* components are visible when their state boolean is true */}
        {this.state.cookingView && <SingleRecipe toggleCookingView={this.toggleCookingView} /> }
        <Navbar current_user={this.props.current_user} toggleCreateRecipe = {this.toggleCreateRecipe} />
        <div className="container">
          {this.state.createRecipe && <CreateRecipe />}
          { this.state.recipeIndex && recipes }
        </div>
      </div>
    );
  }
}