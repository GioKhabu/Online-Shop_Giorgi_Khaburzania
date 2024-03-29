import React, { Component } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { PRODUCT_QUERY, POSTS_QUERYS, CATEGORIES_QUERY } from './gqlQueries/gqlQueries';

import Navigation from './routes/navigation/navigation-component';
import All from './components/all-component/all-component';
import ItemPage from './components/item-page-component/item-page-component';
import Checkout from './components/checkout-component/checkout-component';

import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      allProducts: [],
      cartProducts: [],
      clickedItem: {},
      categoryRouteName: 'all',
      itemCount: 0,
      totalCost: 0,
      pricesType: [],
      priceId: 0,
      cartisActive: false,
      productItemId: '',
    };
  }

  updateCategoryRouteName = (id) => {
    this.setState({ categoryRouteName: id });
  };

  componentDidMount() {
    this.state.allProducts.length === 0 &&
      client
        .query({
          query: POSTS_QUERYS,
          variables: {
            input: { title: `${this.state.categoryRouteName}` },
          },
        })
        .then((res) => {
          const newItems = [...res.data.category.products];
          newItems.forEach((item) => {
            item.galleryIndex = 0;
            item.attributes.forEach((att) => {
              att.items.forEach((attItem) => (attItem.isActive = false));
              att.items[0].isActive = true;
            });
          });
          this.setState({
            allProducts: newItems,
            pricesType: res.data.category.products[0].prices,
          });
        });
    client.query({ query: CATEGORIES_QUERY }).then((category) => {
      this.setState({
        categories: category.data.categories,
      });
    });

    this.setState({
      productItemId: JSON.parse(localStorage.getItem('productItemId')),
      priceId: Number(JSON.parse(localStorage.getItem('priceId'))),
      clickedItem: JSON.parse(localStorage.getItem('clickedItem')),
    });
    JSON.parse(localStorage.getItem('cartProducts')) !== null &&
      this.setState({
        cartProducts: JSON.parse(localStorage.getItem('cartProducts')),
        itemCount: JSON.parse(localStorage.getItem('itemCount')),
      });
  }

  updateProductId = (event) => {
    client
      .query({
        query: PRODUCT_QUERY,
        variables: {
          id: event.currentTarget.id,
        },
      })
      .then((res) => {
        localStorage.setItem('clickedItem', JSON.stringify(res.data.product));
        this.setState({
          clickedItem: { ...res.data.product },
        });
      });
  };

  changeCurrency = (event) => {
    const currentPriceId = event.currentTarget.id;
    if (this.state.priceId !== currentPriceId) {
      this.setState({ priceId: currentPriceId });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.categoryRouteName !== prevState.categoryRouteName) {
      this.state.categoryRouteName.length !== 0 &&
        client
          .query({
            query: POSTS_QUERYS,
            variables: {
              input: { title: `${this.state.categoryRouteName}` },
            },
          })
          .then((res) => {
            const newItems = [...res.data.category.products];
            newItems.forEach((item) => {
              item.galleryIndex = 0;
              item.attributes.forEach((att) => {
                att.items.forEach((attItem) => (attItem.isActive = false));
                att.items[0].isActive = true;
              });
            });
            this.setState({ allProducts: newItems });
          });
    }
    if (this.state.itemCount !== prevState.itemCount) {
      const sum = this.state.cartProducts.reduce((accumulator, object) => {
        return accumulator + parseFloat(object.prices[this.state.priceId].amount) * object.count;
      }, 0);
      this.setState({
        totalCost: parseFloat(sum).toFixed(2),
      });
    }

    localStorage.setItem('productItemId', JSON.stringify(this.state.productItemId));

    localStorage.setItem('priceId', JSON.stringify(this.state.priceId));

    if (this.state.cartProducts !== prevState.cartProducts) {
      localStorage.setItem('cartProducts', JSON.stringify(this.state.cartProducts));
      localStorage.setItem('itemCount', JSON.stringify(this.state.itemCount));
    }
  }

  incrementItemCount = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const idIsChars = /[A-Z]/gi.test(event.currentTarget.id);

    if (idIsChars) {
      const productIndex = this.state.allProducts.findIndex(
        (item) => item.id === event.currentTarget.id
      );
      const cartProductIndex = this.state.cartProducts
        .findIndex((item) => {
          return (
            JSON.stringify(item.attributes) ===
            JSON.stringify(this.state.allProducts[productIndex].attributes)
          );
        });
        const hasAtt = this.state.allProducts[productIndex].attributes.length;
      if (cartProductIndex !== -1 && hasAtt) {
        const newProducts = [...this.state.cartProducts];
        newProducts[cartProductIndex].count += 1;
        this.setState({
          cartProducts: [...newProducts],
          itemCount: this.state.itemCount + 1,
        });
      } else {
        const product = this.state.allProducts[productIndex];
        product.count = 1;
        const products = [...this.state.cartProducts, product];
        this.setState({
          cartProducts: [...products],
          itemCount: this.state.itemCount + 1,
        });
      }
    } else {
        const newProducts = [...this.state.cartProducts];
        newProducts[event.currentTarget.id].count += 1;
        this.setState({
          cartProducts: [...newProducts],
          itemCount: this.state.itemCount + 1,
        });
    }
  };

  decrementItemCount = (event) => {
    const selectIndex = Number(event.currentTarget.id);
    const itemToReduce = this.state.cartProducts[selectIndex];
    if (itemToReduce.count >= 2) {
      const newProducts = [...this.state.cartProducts];
      newProducts[selectIndex].count -= 1;
      this.setState({
        cartProducts: [...newProducts],
        itemCount: this.state.itemCount - 1,
      });
    } else {
      const newProducts1 = this.state.cartProducts.filter((_, index) => {
        return index !== selectIndex;
      });
      this.setState({
        cartProducts: [...newProducts1],
        itemCount: this.state.itemCount - 1,
      });
    }
  };

  incrementItemCountFromItem = (newCartItem) => {
    this.setState({
      cartProducts: [...this.state.cartProducts, newCartItem],
      itemCount: this.state.itemCount + 1,
    });
  };

  incrementSameItemCountFromItem = (countItems) => {
    this.setState({ cartProducts: [...countItems] });
    this.setState({ itemCount: this.state.itemCount + 1 });
  };

  changeGalleryImageIndex = (newItems) => {
    this.setState({ cartPruducts: newItems });
  };

  selectAttribute = (newClickedItem) => {
    this.setState({ clickedItem: newClickedItem });
  };

  render() {
    const Wrapper = (props) => {
      const params = useParams();
      return (
        <All
          {...{ ...props, match: { params } }}
          params={{ match: { params } }}
          allProducts={this.state.allProducts}
          incrementItemCount={this.incrementItemCount}
          priceId={this.state.priceId}
          updateProductId={this.updateProductId}
          changeCategoryRoute={this.changeCategoryRoute}
          changeCategoryIndex={this.changeCategoryIndex}
          client={client}
          routNickName={this.state.routeNickName}
          updateCategoryRouteName={this.updateCategoryRouteName}
          categoryRouteName={this.state.categoryRouteName}
        />
      );
    };
    return (
      <ApolloProvider client={client}>
        <Routes>
          <Route
            path="/"
            element={
              this.state.allProducts.length ? (
                <Navigation
                  categories={this.state.categories}
                  changeCategoryIndex={this.changeCategoryIndex}
                  cartProducts={this.state.cartProducts}
                  prices={this.state.pricesType}
                  incrementItemCount={this.incrementItemCount}
                  decrementItemCount={this.decrementItemCount}
                  itemCount={this.state.itemCount}
                  totalCost={this.state.totalCost}
                  changeCurrency={this.changeCurrency}
                  priceId={this.state.priceId}
                  cartisActive={this.state.cartisActive}
                  incrementSameItemCountFromItem={this.incrementSameItemCountFromItem}
                />
              ) : null
            }
          >
            <Route path="/:category" element={<Wrapper />} />
            <Route path="/" element={<Wrapper />} />
            {this.state.allProducts.length !== 0 && (
              <Route
                path="/item-object"
                element={
                  this.state.allProducts.length && (
                    <ItemPage
                      allProducts={this.state.allProducts}
                      cartProducts={this.state.cartProducts}
                      clickedItem={this.state.clickedItem}
                      productItemId={this.state.productItemId}
                      incrementItemCountFromItem={this.incrementItemCountFromItem}
                      incrementSameItemCountFromItem={this.incrementSameItemCountFromItem}
                      selectAttribute={this.selectAttribute}
                      priceId={this.state.priceId}
                    />
                  )
                }
              />
            )}
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
                    incrementSameItemCountFromItem={this.incrementSameItemCountFromItem}
                    priceId={this.state.priceId}
                    itemCount={this.state.itemCount}
                    totalCost={this.state.totalCost}
                    changeGalleryImageIndex={this.changeGalleryImageIndex}
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
