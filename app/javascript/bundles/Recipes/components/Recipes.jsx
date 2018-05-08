import React from "react"
// importing components to render
import Navbar from "./Navbar.jsx"
import CreateRecipe from "./CreateRecipe.jsx"
import SingleRecipe from "./SingleRecipe.jsx"
import RecipeIndex from "./RecipeIndex.jsx"

export default class Recipes extends React.Component {
  constructor(props) {
    super(props)
    // Boolean state for hiding components on clicks
    this.state = {
      CookingView: false,
      navbar: true,
      createRecipe: false,
      recipeIndex: true,
    }
    this.toggleCreateRecipe = this.toggleCreateRecipe.bind(this)
    this.toggleCookingView = this.toggleCookingView.bind(this)
  }

  // called to toggle cooking view of recipe with full screen
  toggleCookingView = () => {
    this.state.CookingView ? this.setState({ CookingView: false, recipeIndex: true }) : this.setState({CookingView : true, recipeIndex : false})

  }

  // called to toggle the create recipe componenet
  toggleCreateRecipe = () => {
    this.state.createRecipe ? this.setState({ createRecipe: false }) : this.setState({ createRecipe : true })
  }

  render() {
    return (
      <div>
        {/* components are visible when their state boolean is true */}
        {this.state.CookingView && <SingleRecipe toggleCookingView={this.toggleCookingView} /> } 
        {/*Passing down function to toggle recipe to navbar child  */}
        { this.state.navbar && <Navbar toggleCreateRecipe = { this.toggleCreateRecipe } /> }

        <div className="container">
          { this.state.createRecipe && <CreateRecipe /> }

          { this.state.recipeIndex && <RecipeIndex toggleCookingView = {this.toggleCookingView} /> }
          {this.state.recipeIndex && <RecipeIndex toggleCookingView={this.toggleCookingView} />}
          {this.state.recipeIndex && <RecipeIndex toggleCookingView={this.toggleCookingView} />}
          {this.state.recipeIndex && <RecipeIndex toggleCookingView={this.toggleCookingView} />}
          {this.state.recipeIndex && <RecipeIndex toggleCookingView={this.toggleCookingView} />}
        </div>
      </div>        
    )
  }
}