import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

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
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {

    return (
        <PageWrapper>
            <Paper>
                <Wrapper>
                    <Table>
                        <thead>
                        <tr>
                          <td>Admin panel</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td>
                            Author list
                          </td>
                        </tr>
                            <tr>
                                <td>
                                    Books list
                                </td>
                            </tr>
                          <tr>
                            <td>
                                Book types list
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Publishing houses list
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Orders list
                            </td>
                        </tr>

                        </tbody>
                    </Table>
                </Wrapper>
            </Paper>
        </PageWrapper>

    )
  }
};

export default withRouter(Admin);