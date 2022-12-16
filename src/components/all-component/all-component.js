import { Component } from "react";

import Card from "./card-component/card-component";

import "./all-styles.css";


class All extends Component {
  
  render() {
    return (
      <div className="all-container">
        <div className="all-group-container">
          <h2 className="header">All</h2>
          <div className="cards-container">
            {this.props.allProducts.map((item) => {
              return (
                <Card
                  key={item.id}
                  id={item.id}
                  gallery={item.gallery}
                  name={item.name}
                  inStock={item.inStock}
                  prices={item.prices}
                  incrementItemCount={this.props.incrementItemCount}
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
