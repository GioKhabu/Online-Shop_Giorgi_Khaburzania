import { Component } from 'react';

class CartItem extends Component {
  render() {
    return (
      <div className="cart-item" id={this.props.id}>
        <div className="cart-item-details">
          <h4 className="cart-item-name">{this.props.name}</h4>
          <h3 className="cart-item-price">
            {parseFloat(this.props.prices[this.props.priceId].amount).toFixed(2)}{' '}
            {this.props.prices[this.props.priceId].currency.symbol}
          </h3>
          {this.props.attributes.map((item, index) => {
            return (
              <div key={index} id={index}>
                <h4 className="cart-item-attribute-type">{item.name}</h4>
                <div className="cart-item-attributes-container">
                  {item.items.map((attItem, index) => {
                    let colorStyles = {};
                    let classforActiveColor = '';
                    let classForStyles = '';
                    if (item.name === 'Color') {
                      colorStyles = {
                        background: attItem.value,
                      };
                      classForStyles = 'cart-color-styles';
                    } else {
                      classForStyles = 'cart-normal-styles';
                    }

                    if (attItem.isActive && item.name === 'Color') {
                      classforActiveColor = 'cart-color-active';
                    } else if (attItem.isActive) {
                      classforActiveColor = 'cart-normal-active';
                    }

                    return (
                      <div
                        className={`${classForStyles} ${classforActiveColor}`}
                        style={colorStyles}
                        key={attItem.value}
                        id={attItem.value}
                      >
                        {item.name !== 'Color' && attItem.value}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="cart-item-count">
          <span className="cart-plus" id={this.props.index} onClick={this.props.incrementItemCount}>
            +
          </span>
          <span className="cart-item-amount">{this.props.count}</span>
          <span
            className="cart-minus"
            id={this.props.index}
            onClick={this.props.decrementItemCount}
          >
            -
          </span>
        </div>
        <div className="cart-item-image-container">
          <img className="cart-item-image" src={this.props.gallery} alt={this.props.name} />
        </div>
      </div>
    );
  }
}

export default CartItem;
