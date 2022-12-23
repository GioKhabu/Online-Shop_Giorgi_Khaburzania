import { Component } from "react";
import './currency-styles.css'

class Currency extends Component {
  onOutsideClick1 = (event) => {
    event.stopPropagation();
    event.target === event.currentTarget && this.props.onCklickOutside();
  };

  render() {
    return (
      <div className="currency-component-wrapper" onClick={this.onOutsideClick1}>
        <div className="currency-component-container">
          <div className="currency-item-group">
            {this.props.prices.map((item, index) => {
              let selectclass = "";
              if (Number(index) === Number(this.props.priceId)) {
                selectclass = "selected-currency";
              } else {
                selectclass = "";
              }
              return (
                <div
                  className={`currency-value ${selectclass}`}
                  key={index}
                  id={index}
                  onClick={this.props.changeCurrency}
                >
                  <span>
                    {`${item.currency.symbol} ${item.currency.label}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Currency