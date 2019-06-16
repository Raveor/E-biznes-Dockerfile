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
import Login from './components/orders/Login';
import Admin from './components/admin/Admin';
import AuthorsList from './components/admin/authors/AuthorsList';
import AuthorAdd from './components/admin/authors/AuthorAdd';
import AuthorEdit from './components/admin/authors/AuthorEdit';
import BookTypesList from './components/admin/bookTypes/BookTypesList';
import BookTypesAdd from './components/admin/bookTypes/BookTypesAdd';
import BookTypesEdit from './components/admin/bookTypes/BookTypesEdit';
import PublishingHousesList from './components/admin/publishingHouses/PublishingHousesList';
import PublishingHousesAdd from './components/admin/publishingHouses/PublishingHousesAdd';
import PublishingHousesEdit from './components/admin/publishingHouses/PublishingHousesEdit';
import BooksList from './components/admin/books/BooksList';
import BooksAdd from './components/admin/books/BooksAdd';
import BooksEdit from './components/admin/books/BooksEdit';
import UsersList from './components/admin/users/UsersList';
import OrdersList from './components/orders/OrdersList';
import OrdersAdmin from './components/admin/orders/OrdersAdmin';

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
                <Route exact path="/login" component={Login} />
                <Route exact path="/admin" component={Admin}/>
                <Route exact path="/admin/authors" component={AuthorsList} />
                <Route exact path="/admin/authors/add" component={AuthorAdd} />
                <Route exact path="/admin/authors/:id/edit" component={AuthorEdit} />
                  <Route exact path="/admin/bookTypes" component={BookTypesList} />
                  <Route exact path="/admin/bookTypes/add" component={BookTypesAdd} />
                  <Route exact path="/admin/bookTypes/:id/edit" component={BookTypesEdit} />
                  <Route exact path="/admin/publishingHouses" component={PublishingHousesList} />
                  <Route exact path="/admin/publishingHouses/add" component={PublishingHousesAdd} />
                  <Route exact path="/admin/publishingHouses/:id/edit" component={PublishingHousesEdit} />
                  <Route exact path="/admin/books" component={BooksList} />
                  <Route exact path="/admin/books/add" component={BooksAdd} />
                  <Route exact path="/admin/books/:id/edit" component={BooksEdit} />
                  <Route exact path="/admin/users" component={UsersList} />
                  <Route exact path="/admin/orders" component={OrdersAdmin} />
                <Route exact path="/orders" component={OrdersList} />
              </div>
            </MuiThemeProvider>
          </ScrollToTop>
        </Router>
    );
  }
};
export default App;