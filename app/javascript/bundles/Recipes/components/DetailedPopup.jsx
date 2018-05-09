import React from "react";
import FullScreenButton from "./FullScreenButton.jsx";

export default class DetailedPopup extends React.Component {

  render() {
    const { title, photo_url, content: { steps, intro } } = this.props.recipe;
    // declares our placeholder photo
    const photoPlaceholder = "https://thumbs.dreamstime.com/b/black-plastic-spork-14551333.jpg";
    return (
      <section>
        <h5 className="modal-title" id="exampleModalCenterTitle">{title}</h5>
        {/* either renders photo from db is it exists or placeholder photo */}
        <img className="modal-img-top" src={photo_url || photoPlaceholder} style={{ width: "20%" }} alt="Delicious Food" />
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