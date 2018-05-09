import React from "react";
import Fullscreen from "react-full-screen";
import SingleRecipe from "./SingleRecipe.jsx";

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
        <button type="button" className={"btn btn-secondary"} onClick={this.goFull}>
            Cook Now
        </button>
        <Fullscreen enabled={this.state.isFull} onChange={isFull => this.setState({ isFull })}>
          <div className="full-screenable-node">
            {this.state.isFull && <SingleRecipe recipe={ this.props.recipe }/>}
          </div>
        </Fullscreen>
      </div>
    );
  }
}