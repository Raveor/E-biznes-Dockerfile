import React, { Component } from 'react';
import styled from 'styled-components';
import {Redirect} from 'react-router-dom'

import PageWrapper from '../ui/PageWrapper';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CartTable from './CartTable';
import config from '../../assets/store_config';
import axios from 'axios';

const Wrapper = styled.div`
  padding: 40px;
  min-height: 500px;
  @media (max-width: 650px) {
    padding: 20px;
  }
`;
const RightSide = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-end;
   margin-top: 40px;
`;
const Subtotal = styled.div`
  margin-bottom: 20px;
  > span {
    font-size: 14px;
    color: #888;
    margin-right: 15px;
  }
`;

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      total: 0,
    };
  }
  componentDidMount() {
    const slug = `${config.store_slug}_products`;
    let items = JSON.parse(localStorage.getItem(slug));
    this.setState({
      items : items ? items : []
    })
  }

  updateItems = (items) => {
    this.setState({ items });
    const slug = `${config.store_slug}_products`;
    localStorage.setItem(slug, JSON.stringify(items));
  }

  removeItem = (index) => {
    let items = [...this.state.items];
    items.splice(index,1);
    this.props.updateNumber(items.length)
    this.updateItems(items);
  }

  updateCount = (index, value) => {
    let items = [...this.state.items]
    items[index].quantity = value
    this.updateItems(items);
  }

  placeOrder() {
      const slug = `${config.store_slug}_products`;
      let items = JSON.parse(localStorage.getItem(slug));
      let order = {
        books: []
      };

      items.forEach(item => {
        order.books.push({book_id: item.id, quantity: item.quantity});
      });

      items = [];
      this.props.updateNumber(items.length);
      this.updateItems(items);

      axios.put("http://localhost:9000/api/order", {order}, {headers: {'X-Auth-Token': window.token}}).then(data => {
          return <Redirect to={"/orders"} />;
      });
}

  render() {
    let totalPrice;
    if (this.state.items.length) {
      totalPrice = this.state.items
        .map(i => (i.quantity*i.price))
        .reduce((a,b) => a+Number(b))
        .toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })
    }
    let checkout;
    if(window.token !== undefined) {
          checkout = (
                  <Button variant="raised" color="primary" onClick={() => this.placeOrder()}>ZAMÓW</Button>
          )
      } else {
      checkout = <p>Zaloguj się, by móc kontynuować</p>
    }
    return (
      <PageWrapper>
        <Paper>
          <Wrapper>
          <h2 style={{ marginTop: 0, fontWeight: 600 }}>Koszyk</h2>
            { this.state.items.length > 0 &&
              <div>
                <CartTable items={this.state.items}
                  updateCount={this.updateCount}
                  removeItem={this.removeItem}
                  config={config}
                />
                <RightSide>
                  <Subtotal>
                    <span>Łącznie</span>
                    {totalPrice}
                  </Subtotal>
                    {checkout}
                </RightSide>
              </div>
            }
            { this.state.items.length === 0 &&
              <p>Wygląda na to, że nic nie ma w koszyku.</p>
            }
          </Wrapper>
        </Paper>
      </PageWrapper>
    );
  }
};
export default Cart;