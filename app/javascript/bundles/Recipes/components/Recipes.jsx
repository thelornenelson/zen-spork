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
      response.status;     //=> number 100–599
      response.statusText; //=> String
      response.headers;    //=> Headers
      response.url;        //=> String
      if (response.status === 201 || response.status === 200) {
        this.returnToIndexView();
        this.showNotification("Spork Created!");
      }
      return response.text();
    }, function (error) {
      error.message; //=> String
    });
  }

  showNotification = (notification) =>{
    this.setState({
      notification: notification,
    });
    setTimeout(() => {
      this.setState({
        notification: "",
      });
    }, 3000);
  }

  render() {
    let recipes = [];

    if (this.state.myRecipesView === false) {

      // maps recipe index cards
      recipes = this.state.recipes.map((recipe) => {
        return(
          <RecipeIndex key={recipe.id} recipe={recipe} toggleCookingView={this.toggleCookingView} editRecipe={this.editRecipe} sporkRecipe={this.sporkRecipe}/>
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
        <Navbar current_user={this.props.current_user}
          toggleCreateRecipe={this.toggleCreateRecipe}
          toggleMyRecipesView={this.toggleMyRecipesView}
          isMyRecipesView={this.state.myRecipesView}
          notification={this.state.notification}/>
        {/* components are visible when their state boolean is true */}
        {this.state.cookingView && <FullScreenView toggleCookingView={this.toggleCookingView} /> }
        <div className="container">

          {this.state.createRecipe && <CreateRecipe returnToIndexView={this.returnToIndexView} showNotification={this.showNotification}/>}
          {this.state.editRecipe && <CreateRecipe returnToIndexView={this.returnToIndexView} currentEditRecipe={this.state.currentEditRecipe} editRecipeView={this.state.editRecipe} showNotification={this.showNotification}/>}
          {this.state.recipeIndex && recipes}
        </div>
      </div>
    );
  }
}