import React, {Component} from 'react';
import axios from 'axios';

class AdminList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            admins: [],
            isLoading: false,
            error: null,
        };
    }

    render() {
        return (
            <ul>
                {
                    this.createAdminsList()
                }
            </ul>
        );
    }

    componentDidMount() {
        this.setState({isLoading: true});

        axios.get("http://localhost:9000/api/admins")
            .then(value => {
                this.setState({
                    admins: value.data,
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

    createAdminsList() {
        let adminList = [];
        for (let i = 0; i < this.state.admins.length; i++) {
            let admin = this.state.admins[i];

            adminList.push(<li id={admin.id}>{admin.username}  {admin.email}</li>)
        }
        return adminList
    }
}

export default AdminList
