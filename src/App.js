import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { Routes, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

import Navigation from "./routes/navigation/navigation-component";
import All from "./components/all-component/all-component";
import Tech from "./components/tech-component/tech-component";
import Clothe from "./components/clothe-component/clothe-component";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

const POSTS_QUERY = gql`
  {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        brand
        category
        attributes {
          name
          type
          items {
            displayValue
            value
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

class App extends Component {
  constructor() {
    super();

    this.state = {
      allProducts: [],
      routIndex: 0,
      techProducts: [],
      clotheProducts: [],
      cartProducts: [],
      itemCount: 0,
      cartItemsCount: [],
      totalCost: 0,
    };
  }

  componentDidMount() {
    client
      .query({
        query: POSTS_QUERY,
      })
      .then((res) => {
        this.setState({
          allProducts: res.data.categories[this.state.routIndex].products,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState)
    if (this.state.itemCount !== prevState.itemCount) {
        const sum = this.state.cartItemsCount.reduce((accumulator, object) => {
          return accumulator + object.prices * object.count;
        }, 0);
     this.setState({ totalCost: sum });
    }
  }

  incrementItemCount = (event) => {
    const newCartItem = this.state.allProducts.filter((item) => {
      const filtered = item.id === event.currentTarget.id;
      return filtered;
    });
    const findItem = this.state.cartProducts.some(
      (item) => item.id === newCartItem[0].id
    );

    if (!findItem) {
      this.setState({
        cartProducts: [...this.state.cartProducts, newCartItem[0]],
        cartItemsCount: [
          ...this.state.cartItemsCount,
          {
            id: newCartItem[0].id,
            prices: newCartItem[0].prices[0].amount,
            count: +1,
          },
        ],
        itemCount: this.state.itemCount + 1,
      });
    } else {
      const incrementCount = () => {
        const idx = this.state.cartItemsCount.findIndex(
          (countItem) => countItem.id === newCartItem[0].id
        );

        const countItems = [...this.state.cartItemsCount];
        countItems[idx] = {
          ...countItems[idx],
          count: countItems[idx].count++,
        };
        this.setState(countItems);
        this.setState({ itemCount: this.state.itemCount + 1 });
      };
      incrementCount();
    }
    // const calculateTotalCost = () => {
    //   const sum = this.state.cartItemsCount.reduce((accumulator, object) => {
    //     return accumulator + object.prices * object.count;
    //   }, 0);
    //   // this.setState({ totalCost: sum });
    //   return sum;
    // };
    // const sum = calculateTotalCost();
    // this.setState({ totalCost: sum });
    // console.log(sum);
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Routes>
          <Route
            path="/"
            element={
              <Navigation
                productType={this.state.productType}
                cartProducts={this.state.cartProducts}
                cartItemsCount={this.state.cartItemsCount}
                incrementItemCount={this.incrementItemCount}
                itemCount={this.state.itemCount}
                totalCost={this.state.totalCost}
              />
            }
          >
            <Route
              index
              element={
                <All
                  allProducts={this.state.allProducts}
                  incrementItemCount={this.incrementItemCount}
                />
              }
            />
            <Route
              path="/tech"
              element={
                <Tech
                  allProducts={this.state.allProducts}
                  incrementItemCount={this.incrementItemCount}
                />
              }
            />
            <Route
              path="/clothe"
              element={
                <Clothe
                  allProducts={this.state.allProducts}
                  incrementItemCount={this.incrementItemCount}
                />
              }
            />
          </Route>
        </Routes>
      </ApolloProvider>
    );
  }
}

export default App;
