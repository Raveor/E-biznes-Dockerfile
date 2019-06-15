import React, { Component } from 'react';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';

import PageWrapper from "../../ui/PageWrapper";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button/Button";
import axios from 'axios';

const Wrapper = styled.div`
  padding: 40px;
  min-height: 500px;
  @media (max-width: 650px) {
    padding: 20px;
  }
`;

class AuthorAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: ""
        }
    }

    addAuthor = () => {
        const author = {
            name: this.state.name,
            surname: this.state.surname
        };

        axios.put("http://localhost:9000/api/author", {'headers': {'X-Auth-Token': window.token}, body: author}).then(this.props.history.push(`/admin/authors`));
    };

    setSurnameState = event => {
        this.setState({
            surname: event.target.value
        });
    };

    setNameState = event => {
        this.setState({
            name: event.target.value
        });
    };

    render() {
        return (
            <PageWrapper>
                <Paper>
                    <Wrapper>
                        <input type="text" placeholder="Nazwisko" name="surname" onChange={this.setSurnameState} /><br />
                        <input type="text" placeholder="Imie" name="name" onChange={this.setNameState} /><br />
                        <Button variant="raised" color="primary" onClick={this.addAuthor}>Dodaj</Button>
                    </Wrapper>
                </Paper>
            </PageWrapper>
        );
    }
};
export default withTheme()(AuthorAdd);