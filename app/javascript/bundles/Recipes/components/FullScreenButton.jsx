import React from "react";
import Fullscreen from "react-full-screen";
import FullScreenView from "./FullScreenView.jsx";

export default class FullScreenButton extends React.Component {
  constructor(props) {
    super();

    this.state = {
      isFull: false,
    };
  };

  goFull = () => {
    this.setState({ isFull: true });
  }

  render() {
    return (
      <div className="App">
        <button type="button" className={"btn btn-primary"} onClick={this.goFull}>
          <i className="fas fa-expand-arrows-alt"></i> Cook Now
        </button>
        <Fullscreen enabled={this.state.isFull} onChange={isFull => this.setState({ isFull })}>
          <div className="full-screenable-node">
            {this.state.isFull && <FullScreenView recipe={ this.props.recipe } multi={this.props.multi} />}
          </div>
        </Fullscreen>
      </div>
    );
  }
}