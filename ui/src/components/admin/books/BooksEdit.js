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

class BooksEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            author: 0   ,
            publishingHouse: 0,
            publishYear: 0,
            description: "",
            price: 0.0,
            bookType: 0,
            authors: [],
            publishingHouses: [],
            bookTypes: []
        }
    }

    componentDidMount() {
        if(window.token !== undefined) {
            axios.all([axios.get("http://localhost:9000/api/book/" + this.props.match.params.id),
                axios.get("http://localhost:9000/api/bookTypes"),
                axios.get("http://localhost:9000/api/authors"),
                axios.get("http://localhost:9000/api/publishingHouses")]).then(axios.spread((book, bookTypes, authors, publishingHouses) => {
                this.setState({
                    title: book.data[0].title,
                    author: book.data[0].author,
                    publishingHouse: book.data[0].publishingHouse,
                    publishYear: book.data[0].publishYear,
                    description: book.data[0].description,
                    price: book.data[0].price,
                    bookType: book.data[0].bookType,
                    bookTypes: bookTypes.data,
                    authors: authors.data,
                    publishingHouses: publishingHouses.data
                })
            }));
        }
    }

    editBook = () => {
        if(window.token !== undefined) {
            const book = {
                title: this.state.title,
                author: this.state.author,
                publishingHouse: this.state.publishingHouse,
                publishYear: this.state.publishYear,
                description: this.state.description,
                price: this.state.price,
                bookType: this.state.bookType
            };
            axios.patch("http://localhost:9000/api/book/" + this.props.match.params.id, {book}, {headers: {'X-Auth-Token': window.token}}).then(this.props.history.push(`/admin/books`));
        }
    };

    setTitleState = event => {
        this.setState({
            title: event.target.value
        });
    };

    setAuthorState = event => {
        this.setState({
            author: parseInt(event.target.value, 10)
        });
    };

    setPublishingHouseState = event => {
        this.setState({
            publishingHouse: parseInt(event.target.value, 10)
        })
    };

    setPublishYearState = event => {
        this.setState({
           publishYear: parseInt(event.target.value, 10)
        });
    };

    setDescriptionState = event => {
        this.setState({
            description: event.target.value
        });
    };

    setPriceState = event => {
        this.setState({
           price: parseFloat(event.target.value)
        });
    };

    setBookTypeState = event => {
        this.setState({
           bookType: parseInt(event.target.value, 10)
        });
    };
    render() {
        if(window.token !== undefined) {
            return (
                <PageWrapper>
                    <Paper>
                        <Wrapper>
                            <input type="text" placeholder="Tytuł" name="title" value={this.state.title} onChange={this.setTitleState} /><br />
                            Autor: <select onChange={this.setAuthorState}>
                            <option value="" disabled selected>Wybierz autora</option>

                            {
                                this.state.authors.map((author, i) => {
                                    return <option key={`author${i}`} value={author.id} selected={author.id === this.state.author}>{`${author.surname} ${author.name}`}</option>
                                })
                            }
                            </select><br />
                            Wydawnictwo: <select onChange={this.setPublishingHouseState}>
                            <option value="" disabled selected>Wybierz wydawnictwo</option>

                            {
                                this.state.publishingHouses.map((publishingHouse, i) => {
                                    return <option key={`publishingHouse${i}`} value={publishingHouse.id} selected={publishingHouse.id === this.state.publishingHouse}>{`${publishingHouse.name}`}</option>
                                })
                            }
                            </select><br />
                            Gatunek: <select onChange={this.setBookTypeState}>
                            <option value="" disabled selected>Wybierz gatunek</option>

                            {
                                this.state.bookTypes.map((bookType, i) => {
                                    return <option  key={`bookType${i}`} value={bookType.id} selected={bookType.id === this.state.bookType}>{`${bookType.name}`}</option>
                                })
                            }
                            </select><br />
                            <input type="number" placeholder="Rok wydania" name="publishYear" value={this.state.publishYear} onChange={this.setPublishYearState} /><br />
                            <textarea placeholder="Opis książki" name="description" value={this.state.description} onChange={this.setDescriptionState} /><br />
                            <input type="number" placeholder="Cena" name="price" value={this.state.price} onChange={this.setPriceState} /><br />
                            <Button variant="raised" color="primary" onClick={this.editBook}>Edytuj</Button>
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
export default withTheme()(BooksEdit);