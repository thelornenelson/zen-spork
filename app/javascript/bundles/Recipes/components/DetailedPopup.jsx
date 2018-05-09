import React from "react";
import FullScreenButton from "./FullScreenButton.jsx";

export default class DetailedPopup extends React.Component {

  render() {
    const { title, content: { steps, intro } } = this.props.recipe;
    return (
      <section>
        <h5 className="modal-title" id="exampleModalCenterTitle">{title}</h5>
        <img className="modal-img-top" src="/recipe/salmon.jpg" style={{ width: "20%" }} alt="Delicious Food" />
        <div className="modal-body">
          {intro}
        </div>
        <div className="modal-footer">
          <FullScreenButton recipe={this.props.recipe} />
          <button type="button" className={"btn btn-secondary"} data-dismiss="modal">Spork</button>
        </div>
      </section>
    );
  }
}