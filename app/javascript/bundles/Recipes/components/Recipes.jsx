import React from "react"
// importing components to render
import Navbar from "./Navbar.jsx"
import CreateRecipe from "./CreateRecipe.jsx"
import SingleRecipe from "./SingleRecipe.jsx"
// import RecipeIndex from "./RecipeIndex.jsx"
// importing full screen module
import Fullscreen from "react-full-screen"


export default class Recipes extends React.Component {
  constructor(props) {
    super(props)
    // Boolean state for hiding components on clicks
    this.state = {
      isFull: false,
      cookingView: false,
      navbar: true,
      createRecipe: false,
    }
    this.toggleCreateRecipe = this.toggleCreateRecipe.bind(this)
  }

  // Called whenever we want to go to full screen
  goFull = () => {
    this.setState({ isFull : true })
  }

  // if statement prevents infinite loop. Only updates state if isFull is false and cookingView is true
  exitCookingView = () => {
    if (!this.state.isFull && this.state.cookingView) {
      this.setState({ cookingView : false, navbar : true })
    }  
  }

  // called to toggle the create recipe componenet
  toggleCreateRecipe = () => {
    this.state.createRecipe ? this.setState({ createRecipe: false }) : this.setState({ createRecipe : true })
  }

  // monitors virtural DOM for changes and runs on every change
  componentDidUpdate() {
    this.exitCookingView()
  }

  render() {
    return (
      <div>
        {/* Ternary statements hide/reveal recipes based on boolean state */}
        { this.state.cookingView ? <SingleRecipe /> : null } 
        {/*Passing down function to toggle recipe to navbar child  */}
        { this.state.navbar ? <Navbar toggleCreateRecipe = { this.toggleCreateRecipe } /> : null }

        <div className="container">

          { this.state.createRecipe ? <CreateRecipe /> : null }
          
          <div className="recipe-card card border-dark">
            <img className="card-img-top" src="/recipe/salmon.jpg" alt="Card image cap"/>
            <div className="card-body">
              <p className={"card-title h3 text-center"}>Salmon Teriyaki Dinner</p>
              <button type="button" className={"btn learn-more"} data-toggle="modal" data-target="#exampleModalCenter">
              Learn More
              </button>
            </div>
          </div>
          <div className="modal" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className={"modal-dialog modal-dialog-centered modal-lg"} role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalCenterTitle">Salmon Teriyaki Dinner</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>

                </div>
                <img className="modal-img-top" src="/recipe/salmon.jpg" style={{width: "90%"}}alt="Card image cap"/>
                <div className="modal-body">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </div>
                <div className="modal-footer">
                  {/* button for going to cooking view */}
                  <button type="button" className={"btn btn-secondary"} data-dismiss="modal" onClick={this.goFull}>Cook Me</button>
                  <button type="button" className={"btn btn-secondary"} data-dismiss="modal">Spork</button>
                  {/*  magically necessary to make the browser fullscreen from yarn package react-full-screen */}
                  <Fullscreen 
                    enabled={this.state.isFull} 
                    // sets boolean states to full screen mode
                    onChange={isFull => this.setState({ isFull, cookingView : true, navbar : false })} >
                  </Fullscreen>
                </div>
              </div>
            </div>
          </div>
          <div className={"recipe-card card"}>
            <img className="card-img-top" src="/recipe/salmon.jpg" alt="Card image cap"/>
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
          <div className={"recipe-card card"}>
            <img className="card-img-top" src="/recipe/salmon.jpg" alt="Card image cap"/>
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
          <div className={"recipe-card card"}>
            <img className="card-img-top" src="/recipe/salmon.jpg" alt="Card image cap"/>
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
          <div className={"recipe-card card"}>
            <img className="card-img-top" src="/recipe/salmon.jpg" alt="Card image cap"/>
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
          <div className={"recipe-card card"}>
            <img className="card-img-top" src="/recipe/salmon.jpg" alt="Card image cap"/>
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}