import { Component } from "react";
import { ReactComponent as Cart } from "../../../assets/cart.svg";
import {  Link } from "react-router-dom";



import "./card-styles.css";

class Card extends Component {

  render() {
    return (
      <div
        className="card-container"
        id={this.props.id}
        onClick={this.props.updateProductId}
      >
        <Link to="/item-object">
          <div className="image-container">
            <img
              src={this.props.gallery[0]}
              alt={this.props.name}
              className="card-image"
            />
          </div>
          <div
            id={this.props.id}
            className="cart-icon-container1"
            onClick={this.props.incrementItemCount}
          >
            <Cart className="cart-icon1" />
          </div>
          <div className="card-info">
            <h3 className="name">{this.props.name}</h3>
            <h3 className="price">
              {this.props.prices[this.props.priceId].amount}{" "}
              {this.props.prices[this.props.priceId].currency.symbol}
            </h3>
          </div>
        </Link>
      </div>
    );
  }
}

export default Card;