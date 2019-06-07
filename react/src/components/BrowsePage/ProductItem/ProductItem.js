import React, {Component} from 'react';
import './ProductItem.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import {connect} from 'react-redux';
import * as actions from "../../../store/actions";
import {alterWishlistedItemStatus, handleProductWishlist} from '../../../shared/utility';

class ProductItem extends Component {

    state = {
        wishlistIconDisabled:false
    };

    // saves productID to localStorage
    // it is used to later scroll back to the product position
    saveEnteredProductID = (e) => {
        e.preventDefault();
        const className = e.target.className;
        if(!_.includes(className, 'wishlist')) {
            localStorage.setItem('productID', this.props.productData.id);
            localStorage.setItem('limit', this.props.productData.startingPoint + 8);
            window.location.assign(this.props.productData.uri);
        }
    };

    // handles product wishlist case
    handleProductWishlist = () => {
        // disables wishlist icon button
        this.setState({wishlistIconDisabled:true});
        // deletes or inserts data to the firebase database (the product id of the wishlisted item)
        handleProductWishlist.call(this, axios, this.props.productData.wishlisted ,this.props.productData.id);
        // updates the wishlisted items status in the array of all products
        alterWishlistedItemStatus.call(this);
    };

    render() {

        const wishlitedItem = ['wishlist', this.props.productData.wishlisted ? 'selected' : null, this.state.wishlistIconDisabled ? 'disabled' : null];

        return (
            <Link to={this.props.productData.uri} onClick={(e) => this.saveEnteredProductID(e)} id={this.props.productData.id} className="product-item">
                <img src={ this.props.productData.image} alt="product"/>
                <div className="price-wishlist-container">
                    {
                        this.props.productData.price !== null ?
                            <p className="product-price">{this.props.productData.price.amounts.EUR}</p>
                            :
                            <p>Price Upon Request</p>
                    }
                    <div className={wishlitedItem.join(" ")} onClick={this.handleProductWishlist}></div>
                </div>
            </Link>
        );
    }
}

const mapStateToProps = state => {
    return {
        browserItems: state.browserItems,
        wishlistedItems: state.wishlistedItems
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateBrowserItems: (browserItems) => dispatch(actions.updateBrowserItems(browserItems)),
        updatedWishlistedItems: (wishlistedItems) => dispatch(actions.updateWishlistedItems(wishlistedItems))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (ProductItem);