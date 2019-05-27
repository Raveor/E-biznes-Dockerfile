import React, {Component} from 'react';
import axios from 'axios';

class PublishingHouseAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
        };
    }


    onSubmit = event => {
        event.preventDefault();

        const publishingHouse = {
            name: this.state.name,
        };

        axios.put("http://localhost:9000/api/publishingHouse", {publishingHouse});
    };

    onNameChange = event => {
        this.setState({name: event.target.value});
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" name="name" onChange={this.onNameChange} placeholder={"Publishing house name"}/>
                <input type="submit" value="Add publishing house" />
            </form>
        );
    }


}

export default PublishingHouseAdd
