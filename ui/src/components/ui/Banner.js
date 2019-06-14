import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

import BannerHamburger from './BannerHamburger';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  buttons: {
    display: "flex",
    flex: 1
  },
  storeName: {
    color: "black",
    marginTop: "16px",
    display: "inline-block"
  },
  menuButton: {
    marginRight: "30px", 
    textDecoration: "none"
  },
  appbar: {
    padding: "0 60px",
    [theme.breakpoints.down('md')]: {
      padding: "0 10px"
    }
  },
});

class Banner extends Component {
  render() {
    const { classes, quantity, config } = this.props;
    const number = quantity ? ` (${quantity})` : "";

    const productLink = <Link to={`/product`} style={{flex: 1}} className={classes.menuButton}>
      <Typography variant="button" gutterBottom>Shop</Typography>
    </Link>

    let menu;
    if (isWidthDown('sm', this.props.width)) {
      menu = <BannerHamburger productLink={productLink} number={number} />
    } else {
      menu = (<span className={classes.buttons}>
          { productLink }
          <Link to={`/cart`} className={classes.menuButton} style={{ marginRight: 10 }}>
            <Typography variant="button" gutterBottom>Cart{number}</Typography>
          </Link>
          <Link to={`/admin`} className={classes.menuButton} style={{ marginRight: 10 }}>
            <Typography variant="button" gutterBottom>Admin panel</Typography>
          </Link>
          <Link to={`/login`} className={classes.menuButton} style={{ marginRight: 10 }}>
            <Typography variant="button" gutterBottom>Login</Typography>
          </Link>
          <Link  to={`/orders`} className={classes.menuButton} style={{ marginRight: 10 }}>
            <Typography variant="button" gutterBottom>My orders</Typography>
          </Link>
          <Link  to={`/logout`} className={classes.menuButton} style={{ marginRight: 10 }}>
            <Typography variant="button" gutterBottom>Logout</Typography>
          </Link>


        </span>
      )
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary" className={classes.appbar}>
          <Toolbar>
            <Link to={`/`} className={classes.menuButton}>
              <div className="logo" />
              <h3 className={classes.storeName}>{config.store_name}</h3>
            </Link>
            { menu }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};
export default withWidth()(withStyles(styles)(Banner));