import { Component } from "react";
import Parser from "html-react-parser";

import "./item-page-styles.css";

function cloneDeep(object) {
  return !object ? {} : JSON.parse(JSON.stringify(object));
}


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

  onSelectAttribute = (event) => {
    const attId = event.currentTarget.parentNode.parentNode.id;
    const id = event.currentTarget.id;

    const newItems = { ...this.props.clickedItem };
    newItems.attributes.forEach((att, index) => {
      if (Number(index) === Number(attId)) {
        att.items.forEach((attItem) => {
          if (attItem.value === id) {
            attItem.isActive = true;
          }
          if (attItem.value !== id) {
            attItem.isActive = false;
          }
        });
      }
    });
    this.props.selectAttribute(newItems);
  };

  onIncrementItemCountFromItem = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const newCartItem = cloneDeep(this.props.clickedItem);

    const findAtt = this.props.cartProducts
      .filter((category) => {
        return category.id === event.currentTarget.id;
      })
      .some((item) => {
        return (
          JSON.stringify(item.attributes) ===
          JSON.stringify(newCartItem.attributes)
        );
      });

    const findItem =
      this.props.cartProducts.length !== 0 &&
      this.props.cartProducts.some((item) => item.id === newCartItem.id);

    const checkKey =
      newCartItem.attributes[0].items[0].hasOwnProperty("isActive");

    if ((!findItem || findAtt === false) & checkKey) {
      newCartItem.count = 1;
      this.props.incrementItemCountFromItem(newCartItem)
    } else if (checkKey) {
      const incrementCount = () => {
        const getIdentical = this.props.cartProducts.findIndex((products) => {
          return (
            (products.id === newCartItem.id) &
            (JSON.stringify(products.attributes) ===
              JSON.stringify(newCartItem.attributes))
          );
        });
        const countItems = [...this.props.cartProducts];
        countItems[getIdentical] = {
          ...countItems[getIdentical],
          count: countItems[getIdentical].count + 1,
        };
      this.props.incrementSameItemCountFromItem(countItems);
      };
      incrementCount();
    } else {
      alert("Select one of the Properties");
    }
  };

  render() {
    return (
      <div className="item-page-wrapper">
        {Object.keys(this.props.clickedItem || {}).length !== 0 && (
          <div className="item-container">
            <div className="item-photo-container">
              <div className="item-main-image-container">
                <img
                  src={
                    this.props.clickedItem.gallery[this.state.itemImageIndex]
                  }
                  alt={this.props.clickedItem.name}
                  className="item-main-image"
                />
              </div>
              <div className="item-gallery">
                {this.props.clickedItem.gallery.map((item, index) => {
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
                        alt={this.props.clickedItem.name}
                        className="item-gallery-image"
                        onClick={this.changeMainImage}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="item-info-container" id={this.props.clickedItem.id}>
              <div className="item-title-container">
                <h2 className="item-object-brand">
                  {this.props.clickedItem.brand}
                </h2>
                <h3 className="item-object-name">
                  {this.props.clickedItem.name}
                </h3>
              </div>
              <div className="item-attribute-container">
                {this.props.clickedItem.attributes.map((item, index) => {
                  return (
                    <div key={index} id={index}>
                      <h4 className="item-attribute-type-name">
                        {`${item.name}:`}
                      </h4>
                      <div className="cart-item-attributes-container">
                        {item.items.map((attItem, index) => {
                          let itemColorStyles = {};
                          let classforItemActiveColor = "";
                          let classForItemStyles = "";
                          if (item.name === "Color") {
                            itemColorStyles = {
                              background: attItem.value,
                            };
                            classForItemStyles = "item-color-styles";
                          } else {
                            classForItemStyles = "item-normal-styles";
                          }
                          if (attItem.isActive && item.name === "Color") {
                            classforItemActiveColor = "item-color-active";
                          } else if (attItem.isActive) {
                            classforItemActiveColor = "item-normal-active";
                          }
                          return (
                            <div
                              className={`${classForItemStyles} ${classforItemActiveColor}`}
                              style={itemColorStyles}
                              key={attItem.value}
                              id={attItem.value}
                              onClick={this.onSelectAttribute}
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
                  {parseFloat(
                    this.props.clickedItem.prices[this.props.priceId].amount
                  ).toFixed(2)}{" "}
                  {
                    this.props.clickedItem.prices[this.props.priceId].currency
                      .symbol
                  }
                </h4>
              </div>
              <button
                className="Add-to-Cart-button"
                id={this.props.clickedItem.id}
                onClick={this.onIncrementItemCountFromItem}
              >
                ADD TO CART
              </button>
              <div className="item-object-description">
                {Parser(this.props.clickedItem.description)}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ItemPage;
