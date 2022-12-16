import { Component } from "react";
 import "./cart-styles.css"
 import CartItem from "./cart-item-component/cart-item-component";

class Cart extends Component {

  onOutsideClick1 = (event) => {
    event.stopPropagation()
    event.target === event.currentTarget && this.props.onCklickOutside();
  };





  render() {

    return (
      <div className="cart-dropdown-overlap" onClick={this.onOutsideClick1}>
        <div className="cart-dropdown-container">
          <div className="cart-dropdown-subcontainer">
            <div className="cart-header">
              <h3 className="cart-header-title">My Bag,</h3>
              <h4 className="cart-header-item-sum">
                {this.props.itemCount} items
              </h4>
            </div>
            {this.props.cartProducts.map((item) => {
              return (
                <CartItem
                  key={item.id}
                  id={item.id}
                  gallery={item.gallery[0]}
                  name={item.name}
                  inStock={item.inStock}
                  prices={item.prices}
                  attributes={item.attributes}
                  cartItemsCount={this.props.cartItemsCount}
                  incrementItemCount={this.props.incrementItemCount}
                />
              );
            })}
            <div className="cart-total-container">
              <h3 className="cart-total-name">Total</h3>
              <h4 className="cart-total-sum">{this.props.totalCost}</h4>
            </div>
            <div className="cart-button-container">
              <button className="view-bag-button">VIEW BAG</button>
              <button className="check-out-button">CHECK OUT</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart