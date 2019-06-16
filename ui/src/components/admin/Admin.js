import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

import PageWrapper from '../ui/PageWrapper';
import Paper from '@material-ui/core/Paper';
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead > tr > th {
    font-weight: normal;
    font-size: 12px;
    color: #888;
    text-align: left;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  tbody > tr > td {
    padding: 10px 4px;
    border-bottom: 1px solid #ddd;
  }
`;
const Wrapper = styled.div`
  padding: 40px;
  min-height: 500px;
  @media (max-width: 650px) {
    padding: 20px;
  }
`;

class Admin extends Component {
  render() {
      if(window.token !== undefined) {
          return (
              <PageWrapper>
                  <Paper>
                      <Wrapper>
                          <Table>
                              <thead>
                              <tr>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                  <th><h1>Admin panel</h1></th>
                                  <th></th>
                                  <th></th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                  <td>
                                      <Link to={`/admin/authors`} style={{ textDecoration: "none" }}>
                                          Autorzy
                                      </Link>
                                  </td>
                                  <td>
                                      <Link to={`/admin/books`} style={{ textDecoration: "none" }}>
                                          Książki
                                      </Link>
                                  </td>
                                  <td>
                                      <Link to={`/admin/bookTypes`} style={{ textDecoration: "none" }}>
                                          Gatunki książek
                                      </Link>
                                  </td>
                                  <td>
                                      <Link to={`/admin/orders`} style={{ textDecoration: "none" }}>
                                          Zamówienia
                                      </Link>
                                  </td>
                                  <td>
                                      <Link to={`/admin/publishingHouses`} style={{ textDecoration: "none" }}>
                                          Wydawnictwa
                                      </Link>
                                  </td>
                                  <td>
                                      <Link to={`/admin/users`} style={{ textDecoration: "none" }}>
                                          Użytkownicy
                                      </Link>
                                  </td>
                              </tr>
                              </tbody>
                          </Table>
                      </Wrapper>
                  </Paper>
              </PageWrapper>
          )
      }
      else
      {
          return (<PageWrapper>
              <Paper>
                  <Wrapper>
                      <p>Adminem trzeba być i to zalogowanym na dodatek by tu wkroczyc!</p>
                  </Wrapper>
              </Paper>
          </PageWrapper>)
      }
  }
};

export default withRouter(Admin);