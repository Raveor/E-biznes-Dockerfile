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

class BooksList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            deleteId: null,
            books : [],
            bookTypes: [],
            authors: [],
            publishingHouses: []
        }
    }

    componentDidMount() {
        axios.all([axios.get("http://localhost:9000/api/books"),
            axios.get("http://localhost:9000/api/bookTypes"),
            axios.get("http://localhost:9000/api/authors"),
            axios.get("http://localhost:9000/api/publishingHouses")]).then(axios.spread((books, bookTypes, authors, publishingHouses) => {
                console.log(books);
            this.setState({
                books: books.data,
                bookTypes: bookTypes.data,
                authors: authors.data,
                publishingHouses: publishingHouses.data
            })
        }));
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
        this.setState({
            open: false
        });

        axios.delete("http://localhost:9000/api/book/" + this.state.deleteId)
            .then(data => {
                alert("Usunieto autora!");
                this.setState({deleteId: null});
                this.componentDidMount();
            });
    }

    render() {
        return (
            <PageWrapper>
                <Paper>
                    <Wrapper>
                        <Link to={`/admin/books/add`} style={{ textDecoration: "none" }}>
                            <Button variant="raised" color="primary" style={{marginBottom: "15px"}}><AddIcon /></Button>
                        </Link>
                        <Table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tytuł</th>
                                <th>Autor</th>
                                <th>Wydawnictwo</th>
                                <th>Data wydania</th>
                                <th>Gatunek</th>
                                <th>Cena</th>
                                <th>Akcje</th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.state.books.map((book,i) => {
                                return (<tr key={`book${i}`}>
                                    <td>
                                        {book.id}
                                    </td>
                                    <td>
                                        {book.title}
                                    </td>
                                    <td>
                                        {this.state.authors.map((author) => {
                                            if(author.id === book.author) {
                                                return `${author.surname} ${author.name}`
                                            } else {
                                                return ''
                                            }
                                        })}
                                    </td>
                                    <td>
                                        {this.state.publishingHouses.map((publishingHouse) => {
                                            if(publishingHouse.id === book.publishingHouse) {
                                                return `${publishingHouse.name}`
                                            } else {
                                                return ''
                                            }
                                        })}
                                    </td>
                                    <td>
                                        {book.publishYear}
                                    </td>
                                    <td>
                                        {this.state.bookTypes.map((bookType) => {
                                            if(bookType.id === book.bookType) {
                                                return `${bookType.name}`
                                            } else {
                                                return ''
                                            }
                                        })}
                                    </td>
                                    <td>
                                        {book.price}
                                    </td>
                                    <td>
                                        <Button variant="raised" color="primary" onClick={() => this.handleClickOpen(book.id)}><DeleteIcon /></Button>
                                        <Link to={`/admin/books/${book.id}/edit`} style={{ textDecoration: "none" }}>
                                            <Button variant="raised" color="primary"><EditIcon /></Button>
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
                            Czy na pewno chcesz usunąć tą książkę?
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
            </PageWrapper>


    );
    }
};
export default withTheme()(BooksList);