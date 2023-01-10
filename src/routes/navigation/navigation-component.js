import { Component } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Arrow } from "../../assets/arrow-down.svg";
import { ReactComponent as CartIcon } from "../../assets/cart.svg";
import { Outlet, NavLink } from "react-router-dom";
import Cart from "../../components/cart-component/cart-component";
import Currency from "../../components/currency-component/currency-component";

import "./navigation-styles.css";



class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = { cartisActive: false, currencyIsActive: false };
  }

  closeCart = () => {
    this.state.cartisActive && this.setState({ cartisActive: false });
    this.state.currencyIsActive && this.setState({ currencyIsActive: false });
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.cartProducts && this.props.cartProducts.length !==
      prevProps.cartProducts.length
    ) {
      this.props.cartProducts.length < 1 &&
        this.setState({ cartisActive: false });
    }
  }

  openCart = () => {
    if (this.props.itemCount !== 0) {
      !this.state.cartisActive ? this.setState({ cartisActive: true })
        : this.setState({ cartisActive: true });
    }
  };

  openCurrency = () => {
    this.state.currencyIsActive
      ? this.setState({ currencyIsActive: false })
      : this.setState({ currencyIsActive: true });
  };

  render() {
    return (
      <div
        className={
          this.state.cartisActive || this.state.currencyIsActive
            ? "overal"
            : "topContainer"
        }
      >
        <header onClick={() => this.closeCart()}>
          <div className="navigation-container">
            <nav className="navigation-menu">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
              >
                all
              </NavLink>
              <NavLink
                to="/tech"
                className={({ isActive }) =>
                  isActive ? "link active" : "link inactive"
                }
              >
                tech
              </NavLink>
              <NavLink
                to="/clothe"
                className={({ isActive }) =>
                  isActive ? "link active" : "link inactive"
                }
              >
                clothes
              </NavLink>
            </nav>
            <div className="logo-container">
              <Logo className="logo"></Logo>
            </div>
            <div className="currency-cart-container">
              <div className="currency-container" onClick={this.openCurrency}>
                <div>
                  <span className="currency">
                    {this.props.prices[this.props.priceId].currency.symbol}
                  </span>
                </div>
                <Arrow className="arrow" />
              </div>
              <div className="cart-container">
                {this.props.itemCount > 0 && (
                  <span className="cart-items-counter">
                    {this.props.itemCount}
                  </span>
                )}
                <CartIcon className="cart" onClick={this.openCart} />
              </div>
            </div>
          </div>
        </header>
        {this.state.currencyIsActive && (
          <Currency
            prices={this.props.prices}
            changeCurrency={this.props.changeCurrency}
            priceId={this.props.priceId}
            onCklickOutside={this.closeCart}
          />
        )}
        {this.state.cartisActive && this.props.cartProducts.length && (
          <Cart
            className="cart-component"
            onCklickOutside={this.closeCart}
            cartProducts={this.props.cartProducts}
            incrementItemCount={this.props.incrementItemCount}
            decrementItemCount={this.props.decrementItemCount}
            // selectAttribute={this.props.selectAttribute}
            itemCount={this.props.itemCount}
            totalCost={this.props.totalCost}
            priceId={this.props.priceId}
          />
        )}
        <Outlet />
      </div>
    );
  }
}

export default Navigation;
