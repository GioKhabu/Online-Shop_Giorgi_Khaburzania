import { Component } from "react";
import "./cart-styles.css";
import CartItem from "./cart-item-component/cart-item-component";
import { Link } from "react-router-dom";

class Cart extends Component {
  onOutsideClick1 = async (event) => {
    event.stopPropagation();
    event.target === event.currentTarget && this.props.onCklickOutside();
  };

  incrementItemCount = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const index = event.currentTarget.id;
    const countItems = [...this.props.cartProducts];
    countItems[index] = {
      ...countItems[index],
      count: countItems[index].count + 1,
    };
    this.props.incrementSameItemCountFromItem(countItems);
  };

render() {
    return (
      <div className="cart-dropdown-overlap" onClick={this.onOutsideClick1}>
        <div className="cart-dropdown-container">
          <div className="cart-dropdown-subcontainer">
            <div className="cart-header">
              <h3 className="cart-header-title">My Bag,</h3>
              <h4 className="cart-header-item-sum">
                {this.props.itemCount}{" "}
                {this.props.itemCount === 1 ? "item" : "items"}
              </h4>
            </div>
            <div className="cart-items-group">
              {this.props.cartProducts.map((item, index) => {
                return (
                  <CartItem
                    key={index}
                    id={item.id}
                    index={index}
                    gallery={item.gallery[0]}
                    name={item.name}
                    inStock={item.inStock}
                    count={item.count}
                    prices={item.prices}
                    attributes={item.attributes}
                    incrementItemCount={this.incrementItemCount}
                    // incrementCartItemCount={this.props.incrementCartItemCount}
                    decrementItemCount={this.props.decrementItemCount}
                    priceId={this.props.priceId}
                  />
                );
              })}
            </div>
            <div className="cart-total-container">
              <h3 className="cart-total-name">Total</h3>
              <h4 className="cart-total-sum">
                {
                  this.props.cartProducts[0].prices[this.props.priceId].currency
                    .symbol
                }
                {this.props.totalCost}
              </h4>
            </div>
            <div className="cart-button-container">
              <Link to="/checkout" className="cart-checkout-button">
                <button
                  className="view-bag-button"
                  onClick={this.props.onCklickOutside}
                >
                  VIEW BAG
                </button>
              </Link>
              <button className="check-out-button">CHECK OUT</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
