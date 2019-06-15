import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Right = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 30px 0 60px;
  align-items: baseline;
`;
const Description = styled.div`
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
`;

class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.quantity
    };
  }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

  render() {
    const { product } = this.props;
    console.log(this.props);
    return (
      <div>
        <h2 style={{ marginTop: "0" }}>{product.title}</h2>
          <h3 style={{ marginTop: "0" }}>{`${this.props.author.surname} ${this.props.author.name}`}</h3>
          <h3 style={{ marginTop: "0" }}>{this.props.bookType}</h3>
          <h3 style={{ marginTop: "0" }}>{this.props.publishingHouse}</h3>

          <Description>{product.description}</Description>
        <div style={{ fontWeight: "600", textAlign: "right" }}>
          {product.price} PLN
        </div>
        <Right>
          <Button variant="raised" color="primary"
            onClick={() => this.props.addToCart(this.state)}
          >
            Add To Cart
          </Button>
          <TextField
            value={this.state.quantity}
            onChange={this.handleChange('quantity')}
            type="number"
            margin="normal"
            style={{ width: "40px", margin: "0 30px 0" }}
          />
        </Right>
      </div>
    );
  }
};
export default ProductDetails;