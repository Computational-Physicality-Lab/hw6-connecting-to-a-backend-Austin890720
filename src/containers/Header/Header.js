import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import routes from '../../shared/appRoutes';
import logo from "../../assets/images/logo.png"
import cart from "../../assets/images/cart.png"
import './Header.css';

const Header = ({ user }) => {
    let items;
    // console.log(user.user.photoURL);
    if (sessionStorage.getItem('items') != null) {
        items = JSON.parse(sessionStorage.getItem('items'));
    } else {
        items = [];
    }

    sessionStorage.setItem('items', JSON.stringify(items));
    let number;
    try {
        number = items.reduce((acc, item) => acc + item.Quantity, 0);
    } catch (e) {
        number = 0;
    }
    return (
        <Container className='Header'>
            <div id="header"></div>
            <div className="head">
                <Link to={routes.home}>
                    <img className="left" src={logo} alt="logo" />
                </Link>
                <p style={{ fontFamily: 'Catamaran' }} className="center">Scotty Shirts U Illustrate (SSUI)</p>
                <Link to={routes.shoppingCart}>
                    <button type="button" className="cart_button">
                        <img className="right" src={cart} alt="shopping-cart" />
                        <span className="cart_number">{number}</span>
                    </button>
                </Link>
            </div>
            <hr />
            <div className="menu">
                <Link to={routes.products} className="menu_Text"><p>T-SHIRTS</p></Link>
                <Link to={routes.create} className="menu_Text"><p>CREATE FROM PICTURE</p></Link>
                <Link to={routes.notImplemented} className="menu_Text"><p>CREATE YOUR OWN</p></Link>
                <Link to={routes.notImplemented} className="menu_Text"><p>ABOUT US</p></Link>
                <Link to={routes.login} className="menu_Text">
                    <div className='name_box'>
                        {user !== null && <img height='30px' className='user_pic' src={user.photoURL} alt="User Photo" />}

                        <p>{user == null ? 'LOG IN' : user.displayName}</p>
                    </div>

                </Link>

            </div >
            <hr />
        </Container >
    );

};

export default Header;
