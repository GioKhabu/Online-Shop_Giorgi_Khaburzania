import { Component } from "react";

class CartItem extends Component {

  render() {
    const cartCount = this.props.cartItemsCount.find(item => {
        return item.id === this.props.id
      })

    return (
      <div className="cart-item">
        <div className="cart-item-details">
          <h4 className="cart-item-name">{this.props.name}</h4>
          <h3 className="cart-item-price">
            {this.props.prices[0].amount} {this.props.prices[0].currency.symbol}
          </h3>
          {this.props.attributes.map((item, index) => {
            return (
              <div key={index}>
                <h4 className="cart-item-attribute-type">{item.name}</h4>
                <div className="cart-item-attributes-container">
                  {item.items.map((attItem, index) => {
                    let colorStyles = {};
                    let classForStyles = "";
                    if (item.name === "Color") {
                      colorStyles = {
                        background: attItem.value,
                      };
                      classForStyles = "cart-color-styles";
                    } else {
                      classForStyles = "cart-normal-styles";
                    }
                    return (
                      <div
                        className={`${classForStyles}`}
                        style={colorStyles}
                        key={index}
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
        <div className="cart-item-count">
          <span
            className="cart-plus"
            id={this.props.id}
            onClick={this.props.incrementItemCount}
          >
            +
          </span>
          <span className="cart-item-amount">{cartCount.count}</span>
          <span className="cart-minus">-</span>
        </div>
        <div className="cart-item-image-container">
          <img
            className="cart-item-image"
            src={this.props.gallery}
            alt={this.props.name}
          />
        </div>
      </div>
    );
  }
}

export default CartItem;
