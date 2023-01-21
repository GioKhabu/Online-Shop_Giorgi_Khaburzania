import { Component } from "react";

import Card from "./card-component/card-component";

import "./all-styles.css";

class All extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let id = this.props.match.params.category;
    (id !== this.props.categoryRouteName) & (id !== undefined) &&
      this.props.updateCategoryRouteName(id);
  }

  componentDidUpdate(prevState, prevProps) {
    let id = this.props.match.params.category;
    if (id === undefined) {
      this.props.updateCategoryRouteName("all");
    }
    if (prevProps.id !== id) {
      this.props.updateCategoryRouteName(id);
    }
  }

  render() {

    return (
      <div className="all-container">
        <div className="all-group-container">
          <h2 className="header">{this.props.categoryRouteName}</h2>
          <div
            className="cards-container"
          >
            {this.props.allProducts.map((item) => {
              return (
                <Card
                  key={item.id}
                  id={item.id}
                  gallery={item.gallery}
                  name={item.name}
                  brand={item.brand}
                  inStock={item.inStock}
                  prices={item.prices}
                  incrementItemCount={this.props.incrementItemCount}
                  priceId={this.props.priceId}
                  productItemId={this.props.productItemId}
                  updateProductId={this.props.updateProductId}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default All;
