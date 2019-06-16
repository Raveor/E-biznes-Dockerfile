import React, { Component } from 'react';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';

import PageWrapper from "../../ui/PageWrapper";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button/Button";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import AdminIcon from '@material-ui/icons/SupervisorAccount';

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

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            setOpen: false,
            deleteId: null,
            clients : []
        }
    }

    componentDidMount() {
        if(window.token !== undefined) {
            axios.get("http://localhost:9000/api/clients", {headers: {'X-Auth-Token': window.token}}).then(data => {
                this.setState({
                    clients : data.data
                });
            });
        }
    }

     handleClickOpen(id) {
         this.setState({
             open: true,
             deleteId: id
         })
     }

     handleClose() {
         this.setState({
             open: false
         })
    }

    handleAgree() {
        if(window.token !== undefined) {
            this.setState({
                open: false
            });

            axios.delete("http://localhost:9000/api/client/" + this.state.deleteId, {headers: {'X-Auth-Token': window.token}})
                .then(data => {
                    alert("Usunieto użytkownika!");
                    this.setState({deleteId: null});
                    this.componentDidMount();
                });
        }
    }

    setAdmin(id, adminFlag) {
        if(window.token !== undefined) {
            const admin = {
                admin: adminFlag
            }
            axios.post("http://localhost:9000/api/client/" + id, {admin}, {headers: {'X-Auth-Token': window.token}})
                .then(data => this.componentDidMount());
        }
    }

    render() {
        if(window.token !== undefined) {
            return (
                <PageWrapper>
                    <Paper>
                        <Wrapper>
                            <Table>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nazwa</th>
                                    <th>Email</th>
                                    <th>Facebook ID</th>
                                    <th>Twitter ID</th>
                                    <th>Admin</th>
                                    <th>Akcje</th>
                                </tr>
                                </thead>
                                <tbody>
                                { this.state.clients.map((client,i) => {
                                    return (<tr key={`publishingHouse${i}`}>
                                        <td>
                                            {client.id}
                                        </td>
                                        <td>
                                            {client.username}
                                        </td>
                                        <td>
                                            {client.email}
                                        </td>
                                        <td>
                                            {client.facebook_id}
                                        </td>
                                        <td>
                                            {client.twitter_id}
                                        </td>
                                        <td>
                                            {client.admin_flag ? "true" : "false"}
                                        </td>
                                        <td>
                                            <Button variant="raised" color="primary" onClick={() => this.handleClickOpen(client.id)}><DeleteIcon /></Button>
                                            <Button variant="raised" color="primary" onClick={() => this.setAdmin(client.id, !client.adminFlag)}><AdminIcon /></Button>
                                        </td>
                                    </tr>);
                                })}
                                </tbody>
                            </Table>
                        </Wrapper>
                    </Paper>
                    <Dialog
                        open={this.state.open}
                        onClose={() => this.handleClose()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Potwierdź usunięcie?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Czy na pewno chcesz usunąć tego użytkownika?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.handleClose()} color="primary">
                                Nie
                            </Button>
                            <Button onClick={() => this.handleAgree()} color="primary" autoFocus>
                                Tak
                            </Button>
                        </DialogActions>
                    </Dialog>
                </PageWrapper> );
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
export default withTheme()(UsersList);