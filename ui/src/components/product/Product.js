import React, { Component } from 'react';
import styled from 'styled-components';
import withWidth from '@material-ui/core/withWidth';
import { withRouter } from "react-router-dom";

import PageWrapper from '../ui/PageWrapper';
import ProductDetails from './ProductDetails';
import Breadcrumb from '../ui/Breadcrumb';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import config from '../../assets/store_config';

const Wrapper = styled.div`
  padding: 40px;
  @media (max-width: 650px) {
    padding: 20px;
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px;
  @media (max-width: 650px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 40px 0;
  }
`;

const LargeIMG = styled.div`
  background-image: url(${props => props.img});
  background-color: #eee;
  width: 100%;
  padding-bottom: 133%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 0;
  display: inline-block;
  grid-column: span 3;
`;


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      productId: props.match.params.id,
      product: {id: 0, title: ""},
        bookType: "",
        author: {surname: "", name: ""},
        publishingHouse: ""
    };
    }

  componentDidMount() {
  axios.get("http://localhost:9000/api/book/" + this.state.productId)
      .then(product => {
          axios.all([axios.get("http://localhost:9000/api/bookType/" + product.data[0].bookType),
              axios.get("http://localhost:9000/api/author/" + product.data[0].author),
              axios.get("http://localhost:9000/api/publishingHouse/" + product.data[0].publishingHouse)]).then(axios.spread((bookTypes, authors, publishingHouses) => {
              this.setState({
                  bookType: bookTypes.data[0].name,
                  author: {surname: authors.data[0].surname,
                  name: authors.data[0].name},
                  publishingHouse: publishingHouses.data[0].name
              })
          }));

          this.setState({
           product: product.data[0]
        });
      }).catch(error => console.error('Error:', error));
  }

    addToCart = (state) => {
    const product  = this.state.product;

    const slug = `${config.store_slug}_products`;
    let products = JSON.parse(localStorage.getItem(slug));
    products = Array.isArray(products) ? products : [];

    const item = {
      img : `.`,
      url: `/product/${product.id}`,
      name: product.title,
      price: product.price,
      quantity: state.quantity
    };
    products.push(item)
    localStorage.setItem(slug, JSON.stringify(products));
    this.props.updateNumber(products.length)
    this.props.history.push("/cart");
  }

  render() {
    return (
      <PageWrapper>
        <Paper>
          <Wrapper>
            <Breadcrumb product={this.state.product} />
            <Grid>
              <LargeIMG img={'./../placeholder.png'}/>
              <div style={{ gridColumn: "span 2" }}>
                <ProductDetails
                  product={this.state.product}
                  author={this.state.author}
                  bookType={this.state.bookType}
                  publishingHouse={this.state.publishingHouse}
                  quantity={this.state.quantity}
                  price={this.state.price}
                  addToCart={this.addToCart}
                />
              </div>
            </Grid>
          </Wrapper>
        </Paper>
      </PageWrapper>
    );
  }
};
export default withWidth()(withRouter(Product));