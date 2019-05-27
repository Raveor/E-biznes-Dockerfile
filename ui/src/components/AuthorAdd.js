import React, {Component} from 'react';
import axios from 'axios';

class AuthorAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            surname: ''
        };
    }


    onSubmit = event => {
        event.preventDefault();

        const author = {
            name: this.state.name,
            surname: this.state.surname
        };

        axios.put("http://localhost:9000/api/author", {author});
    };

    onNameChange = event => {
        this.setState({name: event.target.value});
    };

    onSurnameChange = event => {
        this.setState({surname: event.target.value});
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" name="name" onChange={this.onNameChange} placeholder={"Author name"}/>
                <input type="text" name="surname" onChange={this.onSurnameChange} placeholder={"Author surname"}/>
                <input type="submit" value="Add author" />
            </form>
        );
    }


}

export default AuthorAdd
