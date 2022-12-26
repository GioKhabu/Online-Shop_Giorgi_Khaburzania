import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { Routes, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

import Navigation from "./routes/navigation/navigation-component";
import All from "./components/all-component/all-component";
import Tech from "./components/tech-component/tech-component";
import Clothe from "./components/clothe-component/clothe-component";
import ItemPage from "./components/item-page-component/item-page-component";
import Checkout from "./components/checkout-component/checkout-component";

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
      cartProducts: [],
      routIndex: 0,
      itemCount: 0,
      totalCost: 0,
      pricesType: [],
      priceId: 0,
      cartisActive: false,
      productItemId: "ps-5",
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
          pricesType: res.data.categories[0].products[0].prices,
        });
      });
      
  }

  changeCurrency = (event) => {
    const currentPriceId = event.currentTarget.id;
    if (this.state.priceId !== currentPriceId) {
      this.setState({ priceId: currentPriceId });
    }
    this.forceUpdate();
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.itemCount > prevState.itemCount ||
      this.state.priceId !== prevState.priceId
    ) {
      const sum = this.state.cartProducts.reduce((accumulator, object) => {
        return (
          accumulator +
          parseFloat(object.prices[this.state.priceId].amount) * object.count
        );
      }, 0);
      this.setState({
        totalCost: parseFloat(sum).toFixed(2),
      });

    }
  }

  incrementItemCount = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const newCartItem = this.state.allProducts.filter((item) => {
      const filtered = item.id === event.currentTarget.id;
      return filtered;
    });
    const findItem = this.state.cartProducts.some(
      (item) => item.id === newCartItem[0].id
    );
    if (!findItem) {
      newCartItem[0].count = 1;
      this.setState({
        cartProducts: [...this.state.cartProducts, newCartItem[0]],
        itemCount: this.state.itemCount + 1,
      });
    } else {
      const incrementCount = () => {
        const idx = this.state.cartProducts.findIndex(
          (countItem) => countItem.id === newCartItem[0].id
        );
        const countItems = [...this.state.cartProducts];
        countItems[idx] = {
          ...countItems[idx],
          count: countItems[idx].count++,
        };
        this.setState(countItems);
        this.setState({ itemCount: this.state.itemCount + 1 });
      };
      incrementCount();
    }
    this.addAtt();
  };

  decrementItemCount = (event) => {
    const idx = this.state.cartProducts.findIndex(
      (countItem) => countItem.id === event.currentTarget.id
    );
    if (this.state.cartProducts[idx].count <= 1) {
      const removeCartItem = this.state.cartProducts.filter((item) => {
        const filtered = item.id !== event.currentTarget.id;
        return filtered;
      });
      let currentPrice =
        this.state.cartProducts[idx].prices[this.state.priceId].amount;
      this.setState({
        cartProducts: [...removeCartItem],
      });
      this.setState({
        itemCount: this.state.itemCount - 1,
        totalCost: parseFloat(this.state.totalCost - currentPrice).toFixed(2),
      });
    } else {
      const decrementCount = () => {
        const countItems = [...this.state.cartProducts];
        countItems[idx] = {
          ...countItems[idx],
          count: countItems[idx].count--,
        };
        this.setState(countItems);
        this.setState({
          itemCount: this.state.itemCount - 1,
          totalCost: parseFloat(
            this.state.totalCost -
              this.state.cartProducts[idx].prices[this.state.priceId].amount
          ).toFixed(2),
        });
      };
      decrementCount();
    }
  };

  addAtt = () => {
    if (this.state.itemCount === 0) {
      this.state.allProducts.forEach((item) => {
        item.galleryIndex = 0;
        item.attributes.forEach((att) =>
          att.items.forEach((attItem) => (attItem.isActive = false))
        );
      });
    }
  };

  updateProductId = (event) => {
    event.stopPropagation();

    if (event.currentTarget.id) {
      this.setState({
        productItemId: event.currentTarget.id,
      });
    }
  };

  changeGalleryImage = (event) => {
    const idx = this.state.cartProducts.findIndex(
      (countItem) => countItem.id === event.currentTarget.id
    );

    if (
      Number(this.state.cartProducts[idx].gallery.length - 1) >
      this.state.cartProducts[idx].galleryIndex
    ) {
      this.state.cartProducts[idx].galleryIndex++;
    } else {
      this.state.cartProducts[idx].galleryIndex = 0;
    }
    this.forceUpdate();
  };

  changeGalleryImageBack = (event) => {
        const idx = this.state.cartProducts.findIndex(
          (countItem) => countItem.id === event.currentTarget.id
        );
        if (this.state.cartProducts[idx].galleryIndex !== 0) {
          this.state.cartProducts[idx].galleryIndex--;
        } else {
          this.state.cartProducts[idx].galleryIndex =
            this.state.cartProducts[idx].gallery.length - 1;
        }
    this.forceUpdate();
  };

  selectAttribute = (event) => {
    const itemId =
      event.currentTarget.parentNode.parentNode.parentNode.parentNode.id;
    const attId = event.currentTarget.parentNode.parentNode.id;
    const id = event.currentTarget.id;

    this.state.allProducts.forEach((item) => {
      if (item.id === itemId) {
        item.attributes.forEach((att, index) => {
          if (index === Number(attId)) {
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
      }
    });
    this.forceUpdate();
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Routes>
          <Route
            path="/"
            element={
              <Navigation
                cartProducts={this.state.cartProducts}
                prices={this.state.pricesType}
                incrementItemCount={this.incrementItemCount}
                decrementItemCount={this.decrementItemCount}
                selectAttribute={this.selectAttribute}
                itemCount={this.state.itemCount}
                totalCost={this.state.totalCost}
                changeCurrency={this.changeCurrency}
                priceId={this.state.priceId}
                cartisActive={this.state.cartisActive}
              />
            }
          >
            <Route
              index
              element={
                <All
                  allProducts={this.state.allProducts}
                  incrementItemCount={this.incrementItemCount}
                  priceId={this.state.priceId}
                  updateProductId={this.updateProductId}
                />
              }
            />
            <Route
              path="/tech"
              element={
                <Tech
                  allProducts={this.state.allProducts}
                  incrementItemCount={this.incrementItemCount}
                  priceId={this.state.priceId}
                  updateProductId={this.updateProductId}
                />
              }
            />
            <Route
              path="/clothe"
              element={
                <Clothe
                  allProducts={this.state.allProducts}
                  incrementItemCount={this.incrementItemCount}
                  priceId={this.state.priceId}
                  updateProductId={this.updateProductId}
                />
              }
            />
            <Route
              path="/item-object"
              element={
                this.state.allProducts.length && (
                  <ItemPage
                    allProducts={this.state.allProducts}
                    productItemId={this.state.productItemId}
                    incrementItemCount={this.incrementItemCount}
                    selectAttribute={this.selectAttribute}
                    priceId={this.state.priceId}
                  />
                )
              }
            />
            <Route
              path="/checkout"
              element={
                this.state.allProducts.length && (
                  <Checkout
                    cartProducts={this.state.cartProducts}
                    allProducts={this.state.allProducts}
                    productItemId={this.state.productItemId}
                    incrementItemCount={this.incrementItemCount}
                    decrementItemCount={this.decrementItemCount}
                    selectAttribute={this.selectAttribute}
                    priceId={this.state.priceId}
                    itemCount={this.state.itemCount}
                    totalCost={this.state.totalCost}
                    changeGalleryImage={this.changeGalleryImage}
                    changeGalleryImageBack={this.changeGalleryImageBack}
                  />
                )
              }
            />
          </Route>
        </Routes>
      </ApolloProvider>
    );
  }
}

export default App;
