import React, { Component } from 'react';
import Cart from './Cart';
import MenuContainer from './MenuContainer';
import './App.css';
import NavBar from './NavBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home'


export default class App extends Component {

  state = {
    menu: [],
    cart: [],
    inCart: false,
    like: false,
    selected: "all",
    home: true
  }

  componentDidMount() {
    fetch('http://localhost:3000/items')
      .then(response => response.json())
      .then(items =>
        this.setState({ menu: items })
      )
  }

  addLike = (item) => {
    const foundItem = this.state.menu.find(i => item.name === i.name)
    foundItem.like = !item.like
    this.setState({ ...this.state.like, foundItem })
  }

  addItemToCart = (clickedItem) => {
    const findMatch = this.state.cart.find(item => item === clickedItem)

    if (!findMatch) {
      this.setState({
        cart: [...this.state.cart, clickedItem]
      })
      this.setState({
        inCart: true
      })
    }
  }

  removeItemFromCart = (clickedItem) => {
    const newCart = this.state.cart.filter(item => item.name !== clickedItem.name)

    this.setState({
      cart: newCart
    })
  }

  changeSelected = (value) => {
    this.setState({ selected: value })
  }

  checkMenuItemsInCart = () => {
    return this.state.menu.map(item => {
      const inCart = this.state.cart.find(cartItem => cartItem.name === item.name)
      return inCart ? { ...item, isInCart: true } : { ...item, isInCart: false }
    })
  }

  changeBackground = (clicked) => {
    this.setState({ home: clicked })
  }

  render() {
    return (
      <BrowserRouter>
        <div className={this.state.home ? "white" : "pink"}>
          <NavBar
            changeBackground={this.changeBackground}
          />
          <Switch>
            <Route
              exact path="/"
              component={Home}
            />
            <Route
              path="/cart"
              render={() =>
                <Cart
                  cart={this.state.cart}
                  clickAction={this.removeItemFromCart}
                  like={this.state.like}
                  inCart={this.state.inCart}
                  changeBackground={this.changeBackground}
                />
              }
            />
            <Route
              path="/menu"
              render={() =>
                <MenuContainer
                  menu={this.checkMenuItemsInCart()} //Need to invoke this to maintain state
                  clickAction={this.addItemToCart}
                  like={this.state.like}
                  addLike={this.addLike}
                  selected={this.state.selected}
                  changeSelected={this.changeSelected}
                  changeBackground={this.changeBackground}
                />
              }
            />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

