import React from 'react';
import {Route} from 'react-router-dom';
import {Main} from './components/MainPage';
import Books from './components/BooksList';
import Admins from './components/AdminList';
import Authors from './components/AuthorsList';
import BookTypes from './components/BookTypesList';
import PublishingHouse from './components/PublishingHouseList';
import Orders from './components/OrdersList';
import Clients from './components/ClientsList';
import AuthorsAdd from './components/AuthorAdd';
import BookTypeAdd from './components/BookTypeAdd';
import PublishingHouseAdd from './components/PublishingHouseAdd';

export default(
    <React.Fragment>
        <Route exact path="/" component={Main} myname={"Main Page"}/>
        <Route path="/books" component={Books} name={"Books list"} />
        <Route path="/admins" component={Admins} name={"Admins list"} />
        <Route path="/authors" component={Authors} name={"Authors list"} />
        <Route path="/bookTypes" component={BookTypes} name={"Book types list"} />
        <Route path="/publishingHouses" component={PublishingHouse} name={"Publishing house List"} />
        <Route path="/orders" component={Orders} name={"Orders List"} />
        <Route path="/clients" component={Clients} name={"Clients List"} />
        <Route path="/author/add" component={AuthorsAdd} name={"Add author"} />
        <Route path="/bookType/add" component={BookTypeAdd} name={"Add book type"} />
        <Route path="/publishingHouse/add" component={PublishingHouseAdd} name={"Add publishing house"} />
    </React.Fragment>
)