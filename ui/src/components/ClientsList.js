import React, {Component} from 'react';
import axios from 'axios';

class ClientsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clients: [],
            isLoading: false,
            error: null,
        };
    }

    render() {
        return (
            <ul>
                {
                    this.createClientsList()
                }
            </ul>
        );
    }

    componentDidMount() {
        this.setState({isLoading: true});

        axios.get("http://localhost:9000/api/clients")
            .then(value => {
                this.setState({
                    clients: value.data,
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

    createClientsList = () => {
        let clientsList = [];
        for (let i = 0; i < this.state.clients.length; i++) {
            let client = this.state.clients[i];

            clientsList.push(<li id={client.id}>{client.username} {client.email}</li>)
        }
        return clientsList
    }
}

export default ClientsList
