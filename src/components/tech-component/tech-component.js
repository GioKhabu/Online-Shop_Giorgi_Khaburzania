import { Component } from "react";

import Card from "../../components/all-component/card-component/card-component";

class Tech extends Component {
  render() {
    return (
      <div className="all-container">
        <div className="all-group-container">
          <h2 className="header">Tech</h2>
          <div className="cards-container">
            {this.props.allProducts
              .filter((product) => {
                return product.category === "tech";
              })
              .map((item) => {
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

export default Tech;
