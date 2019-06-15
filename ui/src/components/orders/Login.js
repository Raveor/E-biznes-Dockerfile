import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import PageWrapper from '../ui/PageWrapper';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button/Button";

class Login extends Component {

  render() {
    return (
      <PageWrapper>
        <Paper>
            <a href={"http://localhost:9000/authenticate/twitter"}>
                <Button variant="contained" color="primary">
                    TWITTER
                </Button>
            </a>
            <a href={"http://localhost:9000/authenticate/facebook"}>
                <Button variant="contained" color="primary">
                    FACEBOOK
                </Button>
            </a>
        </Paper>
      </PageWrapper>
    );
  }
};
export default withRouter(Login);