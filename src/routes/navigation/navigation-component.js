import { Component } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Arrow } from "../../assets/arrow-down.svg";
import { ReactComponent as CartIcon } from "../../assets/cart.svg";
import { Outlet, Link } from "react-router-dom";
import Cart from "../../components/cart-component/cart-component";

import "./navigation-styles.css";



class Navigation extends Component {

  constructor() {
    super()
    this.state = {cartisActive: false}
  }

 closeCart = () => {
   this.state.cartisActive && this.setState(() => this.state.cartisActive = false);
  };

  openCart = () => {
    this.state.cartisActive
      ? this.setState(() => (this.state.cartisActive = false))
      : this.setState(() => (this.state.cartisActive = true));
  }




  render() {
    return (
      <div className={this.state.cartisActive ? "overal" : "topContainer"}>
        <header onClick={() => this.closeCart()}>
          <div className="navigation-container">
            <nav className="navigation-menu">
              <Link to="/" className="link">
                all
              </Link>
              <Link to="/tech" className="link">
                tech
              </Link>
              <Link to="/clothe" className="link">
                clothes
              </Link>
            </nav>
            <div className="logo-container">
              <Logo className="logo"></Logo>
            </div>
            <div className="currency-cart-container">
              <div className="currency-container">
                <div>
                  <span className="currency">$</span>
                </div>
                <Arrow className="arrow" />
              </div>
              <div className="cart-container">
                <CartIcon className="cart" onClick={this.openCart} />
              </div>
            </div>
          </div>
        </header>
        {this.state.cartisActive && (
          <Cart
            className="cart-component"
            onCklickOutside={this.closeCart}
            cartProducts={this.props.cartProducts}
            cartItemsCount={this.props.cartItemsCount}
            incrementItemCount={this.props.incrementItemCount}
            itemCount={this.props.itemCount}
            totalCost={this.props.totalCost}
          />
        )}
        <Outlet />
      </div>
    );
  }
}

export default Navigation;
