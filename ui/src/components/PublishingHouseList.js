import React, {Component} from 'react';
import axios from 'axios';

class PublishingHouseList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            publishingHouse: [],
            isLoading: false,
            error: null,
        };
    }

    render() {
        return (
            <ul>
                {
                    this.createPublishingHouseList()
                }
            </ul>
        );
    }

    componentDidMount() {
        this.setState({isLoading: true});

        axios.get("http://localhost:9000/api/publishingHouses")
            .then(value => {
                this.setState({
                    publishingHouse: value.data,
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

    createPublishingHouseList = () => {
        let publishingHouseList = [];
        for (let i = 0; i < this.state.publishingHouse.length; i++) {
            let publishingHouse = this.state.publishingHouse[i];

            publishingHouseList.push(<li id={publishingHouse.id}>{publishingHouse.name}</li>)
        }
        return publishingHouseList
    }
}

export default PublishingHouseList
