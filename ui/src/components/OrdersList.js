import React, {Component} from 'react';
import axios from 'axios';

class OrdersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            isLoading: false,
            error: null,
        };
    }

    render() {
        return (
            <ul>
                {
                    this.createOrdersList()
                }
            </ul>
        );
    }

    componentDidMount() {
        this.setState({isLoading: true});

        axios.get("http://localhost:9000/api/orders")
            .then(value => {
                this.setState({
                    orders: value.data,
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

    createOrdersList = () => {
        let ordersList = [];
        for (let i = 0; i < this.state.bookTypes.length; i++) {
            let order = this.state.bookTypes[i];

            ordersList.push(<li id={order.id}>{order.client_id}</li>)
        }
        return ordersList
    }
}

export default OrdersList
