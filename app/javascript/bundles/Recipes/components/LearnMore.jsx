import React from "react";
import Modal from "react-responsive-modal";
import DetailedPopup from "./DetailedPopup.jsx";

// this whole component is made to allow a responsive modal popup button
export default class LearnMore extends React.Component {
  state = {
    open: false,
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <button type="button" className={"btn learn-more"} onClick={this.onOpenModal}>Learn More</button>
        <Modal open={open} onClose={this.onCloseModal} center>
          {/* on open, it renders DetailedPopup component in the modal window */}
          <div><DetailedPopup recipe={this.props.recipe} toggleViews={this.props.toggleViews} editRecipe={this.props.editRecipe} sporkRecipe={this.props.sporkRecipe} onClose={this.onCloseModal} current_user_id={this.props.current_user_id}/></div>
        </Modal>
      </div>
    );
  }
}