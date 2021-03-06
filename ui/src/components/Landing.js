import React, { Component } from 'react';
import styled from 'styled-components';

import PageWrapper from './ui/PageWrapper';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import ProductList from './product/ProductList';

const Hero = styled.div`
  background-image: url(${props => props.img});
  height: 300px;
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -40px -40px 60px;
`;

class Landing extends Component {

    componentDidMount() {
        if(window.location.href.search("\\?token=") !== -1) {
            window.token = window.location.search.replace("?token=", "");
        }
    }

  render() {
    const { config } = this.props;
    return (
      <PageWrapper>
        <Paper style={{ padding: "40px" }}>
          <Hero img={'./../bookstore.jpg'}>
            <div style={{ display: "inline-block", maxWidth: "80%"}}>
            </div>
          </Hero>
          <Divider style={{ margin: "40px 0" }}/>
          <ProductList config={config} />
        </Paper>
      </PageWrapper>
    );
  }
};
export default Landing;