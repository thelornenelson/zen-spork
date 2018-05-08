import React from "react";
import FullScreenButton from "./FullScreenButton.jsx";

export default class RecipeIndex extends React.Component {
  render() {
    const { title, content: { steps, intro } } = this.props.recipe;
    return (
      <article>
        <div className="recipe-card card border-dark">
          <img className="card-img-top" src="/recipe/salmon.jpg" alt="salmon" />
          <div className="card-body">
            <p className={"card-title h3 text-center"}>{ title }</p>
            <button type="button" className={"btn learn-more"} data-toggle="modal" data-target="#exampleModalCenter">
            Learn More
            </button>
          </div>
        </div>
        <div className="modal" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className={"modal-dialog modal-dialog-centered modal-lg"} role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">{ title }</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>

              </div>
              <img className="modal-img-top" src="/recipe/salmon.jpg" style={{ width: "90%" }} alt="Delicious Food" />
              <div className="modal-body">
                { intro }
              </div>
              <div className="modal-footer">
                {/* button for going to cooking view */}
                <FullScreenButton recipe={ this.props.recipe } />
                <button type="button" className={"btn btn-secondary"} data-dismiss="modal">Spork</button>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}
