import React, {Component} from 'react';
import axios from 'axios';

class BookTypeAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
        };
    }


    onSubmit = event => {
        event.preventDefault();

        const bookType = {
            name: this.state.name,
        };

        axios.put("http://localhost:9000/api/bookType", {bookType});
    };

    onNameChange = event => {
        this.setState({name: event.target.value});
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" name="name" onChange={this.onNameChange} placeholder={"Book type name"}/>
                <input type="submit" value="Add book type" />
            </form>
        );
    }


}

export default BookTypeAdd
