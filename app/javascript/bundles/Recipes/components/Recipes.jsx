import React from 'react';
import Navbar from './Navbar.jsx'
import CreateRecipe from './CreateRecipe.jsx'

export default class Recipes extends React.Component {

    render() {
    return (
      <div>
        <Navbar />
        <div className="container">
        <CreateRecipe />
          <div className="recipe-card card border-dark">
            <img className="card-img-top" src="/recipe/salmon.jpg" alt="Card image cap"/>
            <div className="card-body">
              <p className="card-title h3 text-center">Salmon Teriyaki Dinner</p>
            </div>
          </div>
          <div className="recipe-card card">
            <img className="card-img-top" src="/recipe/salmon.jpg" alt="Card image cap"/>
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
          <div className="recipe-card card">
            <img className="card-img-top" src="/recipe/salmon.jpg" alt="Card image cap"/>
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
           <div className="recipe-card card">
            <img className="card-img-top" src="/recipe/salmon.jpg" alt="Card image cap"/>
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
          <div className="recipe-card card">
            <img className="card-img-top" src="/recipe/salmon.jpg" alt="Card image cap"/>
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
          <div className="recipe-card card">
            <img className="card-img-top" src="/recipe/salmon.jpg" alt="Card image cap"/>
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}