import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

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

class BookTypesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            setOpen: false,
            deleteId: null,
            bookTypes : []
        }
    }

    componentDidMount() {
        if(window.token !== undefined) {
            axios.get("http://localhost:9000/api/bookTypes").then(data => {
                this.setState({
                    bookTypes : data.data
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

            axios.delete("http://localhost:9000/api/bookType/" + this.state.deleteId, {headers: {'X-Auth-Token': window.token}})
                .then(data => {
                    alert("Usunieto autora!");
                    this.setState({deleteId: null});
                    this.componentDidMount();
                });
        }
    }

    render() {
        if(window.token !== undefined) {
            return (
                <PageWrapper>
                    <Paper>
                        <Wrapper>
                            <Link to={`/admin/bookTypes/add`} style={{ textDecoration: "none" }}>
                                <Button variant="raised" color="primary" style={{marginBottom: "15px"}}><AddIcon /></Button>
                            </Link>
                            <Table>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nazwa gatunku</th>
                                    <th>Akcje</th>
                                </tr>
                                </thead>
                                <tbody>
                                { this.state.bookTypes.map((bookType,i) => {
                                    return (<tr key={`bookType${i}`}>
                                        <td>
                                            {bookType.id}
                                        </td>
                                        <td>
                                            {bookType.name}
                                        </td>
                                        <td>
                                            <Button variant="raised" color="primary" onClick={() => this.handleClickOpen(bookType.id)}><DeleteIcon/></Button>
                                            <Link to={`/admin/bookTypes/${bookType.id}/edit`} style={{ textDecoration: "none" }}>
                                                <Button variant="raised" color="primary"><EditIcon/></Button>
                                            </Link>
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
                                Czy na pewno chcesz usunąć tego autora?
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
export default withTheme()(BookTypesList);