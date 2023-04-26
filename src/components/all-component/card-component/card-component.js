import { Component } from "react";
import { ReactComponent as Cart } from "../../../assets/cart.svg";
import { Link } from "react-router-dom";

import "./card-styles.css";

class Card extends Component {
  
  render() {
    return (
      <div
        className={`card-container ${
          !this.props.inStock && "out-of-stock-opecity"
        }`}
        id={this.props.id}
        onClick={this.props.updateProductId}
      >
        {!this.props.inStock && (
          <div className="out-of-stock">
            <h3 className="out-of-stock-text">OUT OF STOCK</h3>
          </div>
        )}
        <Link to="/item-object" className="card-link-wrapper">
          <div className="image-container">
            <img
              src={this.props.gallery[0]}
              alt={this.props.name}
              className="card-image"
            />
          </div>
          {this.props.inStock && (
            <div
              id={this.props.id}
              className="cart-icon-container1"
              onClick={this.props.incrementItemCount}
            >
              <Cart className="cart-icon1" />
            </div>
          )}
          <div className="card-info">
            <h3 className="card-name">
              {this.props.brand} {this.props.name}
            </h3>
            <h3 className="card-price">
              {parseFloat(this.props.prices[this.props.priceId].amount).toFixed(
                2
              )}{" "}
              {this.props.prices[this.props.priceId].currency.symbol}
            </h3>
          </div>
        </Link>
      </div>
    );
  }
}

export default Card;
