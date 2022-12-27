import { Component } from "react";
import Parser from "html-react-parser";

import "./item-page-styles.css";

class ItemPage extends Component {
  constructor() {
    super();

    this.state = {
      itemImageIndex: 0,
    };
  }

  changeMainImage = (event) => {
    this.setState({
      itemImageIndex: Number(event.currentTarget.id),
    });
  };

  render() {
    const filteredItem = this.props.allProducts.find((item) => {
      return item.id === this.props.productItemId;
    });
    return (
      <div className="item-page-wrapper">
        <div className="item-container">
          <div className="item-photo-container">
            <div className="item-main-image-container">
              <img
                src={filteredItem.gallery[this.state.itemImageIndex]}
                alt={filteredItem.name}
                className="item-main-image"
              />
            </div>
            <div className="item-gallery">
              {filteredItem.gallery.map((item, index) => {
                return (
                  <div
                    id={index}
                    key={index}
                    className="item-gallery-image-wrapper"
                  >
                    <img
                      id={index}
                      key={index}
                      src={item}
                      alt={filteredItem.name}
                      className="item-gallery-image"
                      onClick={this.changeMainImage}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="item-info-container" id={filteredItem.id}>
            <div className="item-title-container">
              <h2 className="item-object-brand">{filteredItem.brand}</h2>
              <h3 className="item-object-name">{filteredItem.name}</h3>
            </div>
            <div className="item-attribute-container">
              {filteredItem.attributes.map((item, index) => {
                return (
                  <div key={index} id={index}>
                    <h4 className="item-attribute-type-name">
                      {`${item.name}:`}
                    </h4>
                    <div className="cart-item-attributes-container">
                      {item.items.map((attItem, index) => {
                        let colorStyles = {};
                        let classforItemActiveColor = "";
                        let classForStyles = "";
                        if (item.name === "Color") {
                          colorStyles = {
                            background: attItem.value,
                          };
                          classForStyles = "item-color-styles";
                        } else {
                          classForStyles = "item-normal-styles";
                        }
                        if (attItem.isActive && item.name === "Color") {
                          classforItemActiveColor = "item-color-active";
                        } else if (attItem.isActive) {
                          classforItemActiveColor = "item-normal-active";
                        }
                        return (
                          <div
                            className={`${classForStyles} ${classforItemActiveColor}`}
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
            <div className="item-price-container">
              <h3 className="item-attribute-type-name">PRICE:</h3>
              <h4 className="item-object-price">
                {filteredItem.prices[this.props.priceId].amount}{" "}
                {filteredItem.prices[this.props.priceId].currency.symbol}
              </h4>
            </div>
            <button
              className="Add-to-Cart-button"
              id={filteredItem.id}
              onClick={this.props.incrementItemCount}
            >
              ADD TO CART
            </button>
            <div className="item-object-description">
              {Parser(filteredItem.description)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemPage;
