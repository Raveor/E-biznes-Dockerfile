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

class PublishingHousesEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
        }
    }

    editPublishingHouse = () => {
        const publishingHouse = {
            name: this.state.name,
        };
        axios.patch("http://localhost:9000/api/publishingHouse/" + this.props.match.params.id, {publishingHouse}).then(this.props.history.push(`/admin/publishingHouses`));
    };

    componentDidMount() {
        axios.get("http://localhost:9000/api/publishingHouse/" + this.props.match.params.id).then(data => {
            this.setState({
                name: data.data[0].name,
            })
        })
    }

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
                        <input type="text" placeholder="Imie" name="name" value={this.state.name} onChange={this.setNameState} /><br />
                        <Button variant="raised" color="primary" onClick={this.editPublishingHouse}>Edytuj</Button>
                    </Wrapper>
                </Paper>
            </PageWrapper>
        );
    }
};
export default withTheme()(PublishingHousesEdit);