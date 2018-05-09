import React from "react";
// importing components to render
import Navbar from "./Navbar.jsx";
import CreateRecipe from "./CreateRecipe.jsx";
import SingleRecipe from "./SingleRecipe.jsx";
import RecipeIndex from "./RecipeIndex.jsx";
import DetailedPopUp from "./DetailedPopup.jsx";
import "whatwg-fetch";

export default class Recipes extends React.Component {
  constructor(props) {
    super(props);
    // Boolean state for hiding components on clicks
    this.state = {
      detailView: false,
      cookingView: false,
      navbar: true,
      createRecipe: false,
      recipeIndex: true,
      recipes: []
    };
    this.toggleCreateRecipe = this.toggleCreateRecipe.bind(this);
    this.toggleCookingView = this.toggleCookingView.bind(this);
    this.toggleDetailView = this.toggleDetailView.bind(this);
  }

  componentDidMount() {
    console.log("Inside componentDidMount");
    this.getRecipes();
  }

  getRecipes() {
    console.log("Inside getRecipes");

    fetch("/recipes.json")
      .then((response) => {
        return response.json();
      })
      .then((recipes) => {
        console.log("Setting state with recipes");
        this.setState({ recipes: recipes });
      })
      .catch((ex) => {
        console.log("parsing failed", ex);
      });
  }

  toggleDetailView = () => {
    this.state.detailView ? this.setState({ detailView: false }) : this.setState({ detailView: true });
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
    const recipes = this.state.recipes.map((recipe) => {
      // console.log("RECIPE FROM MAP IN PARENT", recipe);
      return(
        <RecipeIndex key={recipe.id} recipe={recipe} toggleCookingView={this.toggleCookingView} toggleDetailView={this.toggleDetailView} />
      );
    });
    return (
      <div>
        {/* components are visible when their state boolean is true */}
        {this.state.cookingView && <SingleRecipe toggleCookingView={this.toggleCookingView} /> }
        {/*Passing down function to toggle recipe to navbar child  */}
        {this.state.navbar && <Navbar current_user={this.props.current_user} toggleCreateRecipe = {this.toggleCreateRecipe} />}

        <div className="container">
          {this.state.createRecipe && <CreateRecipe />}
          {/* <DetailedPopUp recipe={this.props.recipe} /> */}

          { this.state.recipeIndex && recipes }
        </div>
      </div>
    );
  }
}
