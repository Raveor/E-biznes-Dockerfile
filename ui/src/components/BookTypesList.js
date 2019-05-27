import React, {Component} from 'react';
import axios from 'axios';

class BookTypesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookTypes: [],
            isLoading: false,
            error: null,
        };
    }

    render() {
        return (
            <ul>
                {
                    this.createBookTypesList()
                }
            </ul>
        );
    }

    componentDidMount() {
        this.setState({isLoading: true});

        axios.get("http://localhost:9000/api/booksTypes")
            .then(value => {
                this.setState({
                    bookTypes: value.data,
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

    createBookTypesList = () => {
        let bookTypesList = [];
        for (let i = 0; i < this.state.bookTypes.length; i++) {
            let bookType = this.state.bookTypes[i];

            bookTypesList.push(<li id={bookType.id}>{bookType.name}</li>)
        }
        return bookTypesList
    }
}

export default BookTypesList
