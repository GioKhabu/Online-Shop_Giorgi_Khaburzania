import { Component } from "react";
import { ReactComponent as Cart } from "../../../assets/cart.svg";

import "./card-styles.css";

class Card extends Component {
  render() {
    return (
      <div className="card-container">
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
            {this.props.prices[0].amount} {this.props.prices[0].currency.symbol}
          </h3>
        </div>
      </div>
    );
  }
}

export default Card;