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

class BooksAdd extends Component {
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
            axios.all([axios.get("http://localhost:9000/api/bookTypes"),
                axios.get("http://localhost:9000/api/authors"),
                axios.get("http://localhost:9000/api/publishingHouses")]).then(axios.spread((bookTypes, authors, publishingHouses) => {
                this.setState({
                    bookTypes: bookTypes.data,
                    authors: authors.data,
                    publishingHouses: publishingHouses.data
                })
            }));
        }
    }

    addBook = () => {
        if(window.token) {
            const book = {
                title: this.state.title,
                author: this.state.author,
                publishingHouse: this.state.publishingHouse,
                publishYear: this.state.publishYear,
                description: this.state.description,
                price: this.state.price,
                bookType: this.state.bookType
            };

            axios.put("http://localhost:9000/api/book", {book}).then(this.props.history.push(`/admin/books`));
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
        return (
            <PageWrapper>
                <Paper>
                    <Wrapper>
                        <input type="text" placeholder="Tytuł" name="title" onChange={this.setTitleState} /><br />
                        Autor: <select onChange={this.setAuthorState}>
                        <option value="" disabled selected>Wybierz autora</option>

                        {
                            this.state.authors.map((author, i) => {
                                return <option  key={`author${i}`} value={author.id}>{`${author.surname} ${author.name}`}</option>
                            })
                        }
                        </select><br />
                        Wydawnictwo: <select onChange={this.setPublishingHouseState}>
                        <option value="" disabled selected>Wybierz wydawnictwo</option>

                        {
                            this.state.publishingHouses.map((publishingHouse, i) => {
                                return <option key={`publishingHouse${i}`} value={publishingHouse.id}>{`${publishingHouse.name}`}</option>
                            })
                        }
                        </select><br />
                        Gatunek: <select onChange={this.setBookTypeState}>
                        <option value="" disabled selected>Wybierz gatunek</option>

                        {
                            this.state.bookTypes.map((bookType, i) => {
                                return <option  key={`bookType${i}`} value={bookType.id}>{`${bookType.name}`}</option>
                            })
                        }
                        </select><br />
                        <input type="number" placeholder="Rok wydania" name="publishYear" onChange={this.setPublishYearState} /><br />
                        <textarea placeholder="Opis książki" name="description" onChange={this.setDescriptionState} /><br />
                        <input type="number" placeholder="Cena" name="price" onChange={this.setPriceState} /><br />
                        <Button variant="raised" color="primary" onClick={this.addBook}>Dodaj</Button>
                    </Wrapper>
                </Paper>
            </PageWrapper>
        );
    }
};
export default withTheme()(BooksAdd);