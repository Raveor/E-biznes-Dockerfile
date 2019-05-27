import React, {Component} from 'react';
import axios from 'axios';

class BooksList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            isLoading: false,
            error: null,
        };
    }

    render() {
        return (
            <ul>
                {
                    this.createBooksList()
                }
            </ul>
        );
    }

    componentDidMount() {
        this.setState({isLoading: true});

        axios.get("http://localhost:9000/api/books")
            .then(value => {
                this.setState({
                    books: value.data,
                    isLoading: false
                })
            })
            .catch(reason => {
                this.setState({
                    error: reason,
                    isLoading: false
                })
            });
    }

    createBooksList = () => {
        let bookList = [];
        for (let i = 0; i < this.state.books.length; i++) {
            let book = this.state.books[i];

            bookList.push(<li id={book.id}>{book.title} {book.author}</li>)
        }
        return bookList
    }
}

export default BooksList
