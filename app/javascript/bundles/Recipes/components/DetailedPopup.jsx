import React from "react";
import FullScreenButton from "./FullScreenButton.jsx";

export default class DetailedPopup extends React.Component {

  render() {
    const { title, content: { steps, intro } } = this.props.recipe;
    return (
      // <section id="detailedPopup">
      //   <h1> Title {title} </h1><br />
      //   <h2> Intro {intro} </h2>
      //   <FullScreenButton recipe={this.props.recipe} />
      // </section>
     
      <section>

        <div className={"modal-dialog modal-dialog-centered modal-lg"} role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">{title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <img className="modal-img-top" src="/recipe/salmon.jpg" style={{ width: "90%" }} alt="Delicious Food" />
            <div className="modal-body">
              {intro}
            </div>
            <div className="modal-footer">




              <FullScreenButton recipe={this.props.recipe} />






              <button type="button" className={"btn btn-secondary"} data-dismiss="modal">Spork</button>
            </div>
          </div>
        </div>
      </section>

    );
  }
}





// <section>

//   <div className={"modal-dialog modal-dialog-centered modal-lg"} role="document">
//     <div className="modal-content">
//       <div className="modal-header">
//         <h5 className="modal-title" id="exampleModalCenterTitle">{title}</h5>
//         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       {/* <img className="modal-img-top" src="/recipe/salmon.jpg" style={{ width: "90%" }} alt="Delicious Food" /> */}
//       <div className="modal-body">
//         {intro}
//       </div>
//       <div className="modal-footer">




//         <FullScreenButton recipe={this.props.recipe} />






//         <button type="button" className={"btn btn-secondary"} data-dismiss="modal">Spork</button>
//       </div>
//     </div>
//   </div>
// </section>;