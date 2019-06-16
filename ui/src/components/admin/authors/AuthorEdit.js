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

class AuthorEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: ""
        }
    }

    editAuthor = () => {
        if(window.token !== undefined) {
            const author = {
                name: this.state.name,
                surname: this.state.surname
            };

            axios.patch("http://localhost:9000/api/author/" + this.props.match.params.id, {author}, {headers: {'X-Auth-Token': window.token}}).then(this.props.history.push(`/admin/authors`));
        }
    };

    componentDidMount() {
        if(window.token !== undefined) {
            axios.get("http://localhost:9000/api/author/" + this.props.match.params.id).then(data => {
                this.setState({
                    name: data.data[0].name,
                    surname: data.data[0].surname
                })
            })
        }
    }

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
        if(window.token !== undefined) {
            return (
                <PageWrapper>
                    <Paper>
                        <Wrapper>
                            <input type="text" placeholder="Nazwisko" name="surname" value={this.state.surname} onChange={this.setSurnameState} /><br />
                            <input type="text" placeholder="Imie" name="name" value={this.state.name} onChange={this.setNameState} /><br />
                            <Button variant="raised" color="primary" onClick={this.editAuthor}>Edytuj</Button>
                        </Wrapper>
                    </Paper>
                </PageWrapper>
            );
        } else {
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
export default withTheme()(AuthorEdit);