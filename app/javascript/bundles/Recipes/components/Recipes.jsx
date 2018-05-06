import React from "react"
import Navbar from "./Navbar.jsx"
import CreateRecipe from "./CreateRecipe.jsx"
// Full screen module
import Fullscreen from "react-full-screen"
// Single recipe component, for cooking view
import SingleRecipe from "./SingleRecipe.jsx"

export default class Recipes extends React.Component {
  constructor(props) {
    super(props)
    // Boolean state for hiding components on clicks
    this.state = {
      isFull: false,
      cookingView: false,
    }
  }

  // Called whenever we want to go to full screen
  goFull = () => {
    this.setState({ isFull: true })
  }

  mirrorGoFullFalse = () => {
    if (this.state.isFull && this.state.cookingView) {
      console.log("FULL SCREEN")
    } 
    if (!this.state.isFull && this.state.cookingView) {
      this.setState({ cookingView: false }) && console.log("FALSE")
      console.log("FALSE")
    }  
  }

  // // method for pressing escape and logging how handsome I am
  // escFunction(event) {
  //   if (event.keyCode === 27) {
  //     this.setState({ cookingView: false })
  //     console.log("hi handsome")
  //   }
  // }

  // mounting and unmounting escape method after DOM rendered
  // componentDidMount() {
  //   document.addEventListener("keydown", this.escFunction, false)
  // }
  // componentWillUnmount() {
  //   document.removeEventListener("keydown", this.escFunction, false)
  // }
  componentDidUpdate() {
    this.mirrorGoFullFalse()
  }


  render() {
    return (
      <div>
        {/* Boolean to hide/reveal recipe when button clicked */}
        { this.state.cookingView ? <SingleRecipe /> : null }
       
        <Navbar />
        <div className="container">
          <CreateRecipe />
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
                  <button type="button" className={"btn btn-secondary"} data-dismiss="modal" onClick={this.goFull}>Spork</button>
                  {/*  magically necessary to make the browser fullscreen */}
                  <Fullscreen 
                    enabled={this.state.isFull} 
                    onChange={isFull => this.setState({ isFull, cookingView : true })} >
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