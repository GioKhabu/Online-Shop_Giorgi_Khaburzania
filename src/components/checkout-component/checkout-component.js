import { Component } from "react";

import "./checkout-style.css";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      galleryItemIndex: Number(0),
    };
  }

  render() {
    return (
      <div className="checkout-component-wrapper">
        <div className="checkout-items-group">
          <h2 className="checkout-cart-name">CART</h2>
          <div className="checkout-items-group-wrapper">
            {this.props.cartProducts.map((products) => {
              return (
                <div className="checkout-items-wrapper" key={products.id}>
                  <div className="checkout-item" id={products.id}>
                    <div className="checkout-item-details">
                      <h3 className="checkout-item-brand">{products.brand}</h3>
                      <h4 className="checkout-item-name">{products.name}</h4>
                      <h3 className="checkout-item-price">
                        {products.prices[this.props.priceId].amount}{" "}
                        {products.prices[this.props.priceId].currency.symbol}
                      </h3>
                      {products.attributes.map((item, index) => {
                        return (
                          <div key={index} id={index}>
                            <h4 className="checkout-item-attribute-type">
                              {item.name}
                            </h4>
                            <div className="checkout-item-attributes-container">
                              {item.items.map((attItem, index) => {
                                let colorStyles = {};
                                let classforActiveColor = "";
                                let classForStyles = "";
                                if (item.name === "Color") {
                                  colorStyles = {
                                    background: attItem.value,
                                  };
                                  classForStyles = "checkout-color-styles";
                                } else {
                                  classForStyles = "checkout-normal-styles";
                                }

                                if (attItem.isActive && item.name === "Color") {
                                  classforActiveColor = "checkout-color-active";
                                } else if (attItem.isActive) {
                                  classforActiveColor =
                                    "checkout-normal-active";
                                }
                                return (
                                  <div
                                    className={`${classForStyles} ${classforActiveColor}`}
                                    style={colorStyles}
                                    key={attItem.value}
                                    id={attItem.value}
                                    onClick={this.props.selectAttribute}
                                  >
                                    {item.name !== "Color" && attItem.value}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="checkout-item-count">
                      <span
                        className="checkout-plus"
                        id={products.id}
                        onClick={this.props.incrementItemCount}
                      >
                        +
                      </span>
                      <span className="checkout-item-amount">
                        {products.count}
                      </span>
                      <span
                        className="checkout-minus"
                        id={products.id}
                        onClick={this.props.decrementItemCount}
                      >
                        -
                      </span>
                    </div>
                    <div className="checkout-item-image-container">
                      <img
                        className="checkout-item-image"
                        src={products.gallery[products.galleryIndex]}
                        alt={products.name}
                      />
                      <div className="checkout-image-arrows">
                        <ul className="checkout-arrow-wraper">
                          <li
                            onClick={this.props.changeGalleryImageBack}
                            id={products.id}
                          >
                            <span className="checkout-arrow arrow-right"></span>
                          </li>
                          <li
                            id={products.id}
                            onClick={this.props.changeGalleryImage}
                          >
                            <span className="checkout-arrow arrow-left"></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <h3 className="checkout-sum">
            Tax 21%:{" "}
            <span>
              {
                this.props.allProducts[0].prices[this.props.priceId].currency
                  .symbol
              }{parseFloat((this.props.totalCost * 21) / 100).toFixed(2)}
            </span>
          </h3>
          <h3 className="checkout-sum">
            Quantity: <span>{this.props.itemCount}</span>
          </h3>
          <h3 className="checkout-sum">
            Total:{" "}
            <span>
              {
                this.props.allProducts[0].prices[this.props.priceId].currency
                  .symbol
              }{parseFloat(this.props.totalCost).toFixed(2)}
            </span>
          </h3>
          <button className="order-button">Order</button>
        </div>
      </div>
    );
  }
}

export default Checkout;
