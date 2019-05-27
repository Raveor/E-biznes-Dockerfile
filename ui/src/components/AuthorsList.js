import React, {Component} from 'react';
import axios from 'axios';

class AuthorsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authors: [],
            isLoading: false,
            error: null,
        };
    }

    render() {
        return (
            <ul>
                {
                    this.createAuthorsList()
                }
            </ul>
        );
    }

    componentDidMount() {
        this.setState({isLoading: true});

        axios.get("http://localhost:9000/api/authors")
            .then(value => {
                this.setState({
                    authors: value.data,
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

    createAuthorsList() {
        let authorsList = [];
        for (let i = 0; i < this.state.authors.length; i++) {
            let author = this.state.authors[i];

            authorsList.push(<li id={author.id}>{author.name}  {author.surname}</li>)
        }
        return authorsList
    }
}

export default AuthorsList
