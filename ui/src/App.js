import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import config from './assets/store_config';
import Landing from './components/Landing';

import ScrollToTop from './components/ui/ScrollToTop';
import Banner from './components/ui/Banner';
import Products from './components/product/Products';
import Product from './components/product/Product';
import Cart from './components/cart/Cart';
import Order from './components/orders/Order';
import Login from './components/orders/Login';
import Admin from './components/admin/Admin';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: config.colors.primary.main,
      dark: config.colors.primary.dark,
      contrastText: config.colors.primary.contrastText
    },
    secondary: { main: config.colors.secondary.main },
  },
  typography: {
    fontFamily: [
      'Raleway',
      'Roboto',
      'Helvetica',
      'sans-serif'
    ]
  },
});

class App extends Component {
  state = {};

  componentDidMount() {
    const slug = `${config.store_slug}_products`;
    const items = JSON.parse(localStorage.getItem(slug));
    this.setState({ quantity : items ? items.length : 0 })
  }
  updateNumber = (quantity) => {
    this.setState({ quantity });
  }
  render() {
    return (
        <Router>
          <ScrollToTop>
            <MuiThemeProvider theme={theme}>
              <div className={config.store_slug}>
                <div className="bg" />
                <Banner quantity={this.state.quantity} config={config} />
                <Route exact path="/"
                  render={(props) => <Landing config={config} />}
                />
                <Route exact path="/product"
                  render={(props) => <Products config={config} />}
                />
                <Route exact path="/product/:id" render = {(props) => <Product updateNumber={this.updateNumber} />}/>
                <Route exact path="/cart"
                  render={(props) => <Cart config={config} updateNumber={this.updateNumber} />}
                />
                <Route exact path="/order" component={Order} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/admin" component={Admin}/>
              </div>
            </MuiThemeProvider>
          </ScrollToTop>
        </Router>
    );
  }
};
export default App;