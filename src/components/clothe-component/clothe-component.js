import { Component } from "react";

import Card from "../../components/all-component/card-component/card-component";

class Clothe extends Component {
  render() {
    return (
      <div className="all-container">
        <div className="all-group-container">
          <h2 className="header">Clothes</h2>
          <div className="cards-container">
            {this.props.allProducts.filter(product => {
              return product.category === "clothes";
            }).map((item) => {
              return (
                <Card
                  key={item.id}
                  gallery={item.gallery}
                  id={item.id}
                  name={item.name}
                  inStock={item.inStock}
                  prices={item.prices}
                  incrementItemCount={this.props.incrementItemCount}
                  priceId={this.props.priceId}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Clothe;
