import React from "react";
import Popup from "reactjs-popup";
import DetailedPopup from "./DetailedPopup.jsx";


export default class LearnMore extends React.Component {


  render() {
    return (
      <section>
        {/* <button type="button" className={"btn learn-more"} onClick={this.toggleDetailView} >
          Learn More
        </button> */}
        
        <Popup trigger={<button type="button" className={"btn learn-more"}>
          Learn More
        </button>}>
          <div><DetailedPopup recipe={this.props.recipe} /></div>
        </Popup>

        
      </section>
    );
  }
}
