import React, {Component} from 'react';
import styled from 'styled-components';
import {withTheme} from '@material-ui/core/styles';

import PageWrapper from "../../ui/PageWrapper";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button/Button";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField/TextField";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead > tr > th {
    font-weight: normal;
    font-size: 12px;
    color: #888;
    text-align: left;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  tbody > tr > td {
    padding: 10px 4px;
    border-bottom: 1px solid #ddd;
  }
`;
const Wrapper = styled.div`
  padding: 40px;
  min-height: 500px;
  @media (max-width: 650px) {
    padding: 20px;
  }
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
`;
const Image = styled.div`
  background-image: url(${props => props.img});
  width: 125px;
  height: 125px;
  background-size: cover;
  background-position: 50%;
  @media (max-width: 650px) {
    width: 62px;
    height: 62px;
  }
`;
const Title = styled.div`
  margin-left: 30px;
  @media (max-width: 650px) {
    margin-left: 10px;
  }
`;
const Name = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  > a {
    color: black;
    text-decoration-color: ${props => props.underline};
  }
`;

class OrdersAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            setOpen: false,
            deleteId: null,
            orders: []
        }
    }

    componentDidMount() {
        if(window.token !== undefined) {
            axios.get("http://localhost:9000/api/orders", {headers: {'X-Auth-Token': window.token}}).then(data => {
                let ordersTab = [];
                data.data.forEach(order => {
                   axios.all([axios.get("http://localhost:9000/api/order2books/" + order.id, {headers: {'X-Auth-Token': window.token}}),
                   axios.get("http://localhost:9000/api/client/" + order.client_id, {headers: {'X-Auth-Token': window.token}})])
                       .then(axios.spread((books, client) => {
                           books.data.forEach(book => {
                               axios.get("http://localhost:9000/api/book/" + book.book_id).then(data => {
                                   let orderDetails = {
                                       orderId: order.id,
                                       clientName: client.data[0].username,
                                       books: []
                                   };
                                   let booksDetails = {
                                       id: book.book_id,
                                       title: data.data[0].title,
                                       price: data.data[0].price,
                                       quantity: book.quantity
                                   };
                                   orderDetails.books.push(booksDetails);

                                   for(let i = ordersTab.length - 1; i >= 0; i--) {

                                       if(ordersTab[i].orderId === orderDetails.orderId) {
                                           console.log("OK");
                                           ordersTab.splice(i);
                                       }
                                   }
                                   ordersTab.push(orderDetails);
                                   this.setState({
                                       orders: ordersTab
                                   });
                               });
                           });
                    }));
                });
            });
        }
    }

     handleClickOpen(id) {
         this.setState({
             open: true,
             deleteId: id
         })
     }

     handleClose() {
         this.setState({
             open: false
         })
    }

    handleAgree() {
        if(window.token !== undefined) {
            this.setState({
                open: false
            });

            axios.delete("http://localhost:9000/api/order/" + this.state.deleteId, {headers: {'X-Auth-Token': window.token}})
                .then(data => {
                    alert("Usunieto zamówienie!");
                    this.setState({deleteId: null});
                    this.componentDidMount();
                });
        }
    }

    render() {
        if(window.token !== undefined) {
            return (
                <PageWrapper>
                    <Paper>
                        <Wrapper>
                                {
                                    this.state.orders.map((order,i) => {
                                        return (<ExpansionPanel>
                                                <ExpansionPanelSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header">
                                                    <Typography>Zamówienie nr {order.orderId}</Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Typography>
                                                        <Table>
                                                            <thead>
                                                            <tr>
                                                                <th>Product</th>
                                                                <th>Ilość</th>
                                                                <th>Razem</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {order.books.map((book,i) => {
                                                                return (<tr key={`book${i}`}>
                                                                        <td>
                                                                            <Flex>
                                                                                <Image img={'./../placeholder.png'} />
                                                                                <Title>
                                                                                    <Name underline={this.props.theme.palette.primary.main}>
                                                                                        <Link to={`/product/${book.id}`}>{book.title}</Link>
                                                                                    </Name>
                                                                                </Title>
                                                                            </Flex>
                                                                        </td>
                                                                        <td>
                                                                            <TextField
                                                                                value={book.quantity}
                                                                                type="number"
                                                                                disabled
                                                                                margin="none"
                                                                                style={{ width: "40px" }}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            {(book.quantity*book.price).toFixed(2)} zł
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })}
                                                            </tbody>
                                                        </Table>
                                                        <Button variant="raised" color="primary" onClick={() => this.handleClickOpen(order.orderId)}><DeleteIcon /></Button>
                                                    </Typography>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                        );
                                    })
                                }
                        </Wrapper>
                    </Paper>
                    <Dialog
                        open={this.state.open}
                        onClose={() => this.handleClose()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Potwierdź usunięcie?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Czy na pewno chcesz usunąć to zamówienie?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.handleClose()} color="primary">
                                Nie
                            </Button>
                            <Button onClick={() => this.handleAgree()} color="primary" autoFocus>
                                Tak
                            </Button>
                        </DialogActions>
                    </Dialog>
                </PageWrapper> );
        } else {
            return (<PageWrapper>
                <Paper>
                    <Wrapper>
                        <p>Musisz być zalogowany, aby móc przeglądać swoje zamówienia!</p>
                    </Wrapper>
                </Paper>
            </PageWrapper>)
        }
    }
};
export default withTheme()(OrdersAdmin);