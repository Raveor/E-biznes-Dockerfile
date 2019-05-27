import React from 'react';
import {NavLink} from "react-router-dom";

export const Main = props => {
    return (
        <React.Fragment>
            <div>
                Main page of app
            </div>
            <nav>
                <ul>
                    <li><NavLink to="/">Main Page</NavLink></li>
                    <li><NavLink to="/books">Books List</NavLink></li>
                    <li><NavLink to="/admins">Admins List</NavLink></li>
                    <li><NavLink to="/authors">Authors List</NavLink></li>
                    <li><NavLink to="/bookTypes">Book Types List</NavLink></li>
                    <li><NavLink to="/publishingHouses">Publishing Houses List</NavLink></li>
                    <li><NavLink to="/orders">Orders List</NavLink></li>
                    <li><NavLink to="/clients">Clients List</NavLink></li>
                </ul>
                <ul>
                    <li><NavLink to="/author/add">Add Author</NavLink></li>
                    <li><NavLink to="/bookType/add">Add Book Type</NavLink></li>
                    <li><NavLink to="/publishingHouse/add">Add Publishing House</NavLink></li>
                </ul>
            </nav>
        </React.Fragment>
    );
};