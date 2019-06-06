import React, {Component} from 'react';
import './ProductItem.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import {connect} from 'react-redux';
import * as actions from "../../../store/actions";

class ProductItem extends Component {

    saveEnteredProductID = (e) => {
        e.preventDefault();
        const className = e.target.className;
        if(!_.includes(className, 'wishlist')) {
            localStorage.setItem('productID', this.props.productData.id);
            localStorage.setItem('limit', this.props.productData.startingPoint + 8);
            window.location.assign(this.props.productData.uri);
        }
    };

    alterWishlistedItemStatus = () => {
        const browserItems = [...this.props.browserItems];
        for(let i = 0; i < browserItems.length; i++) {
            if(browserItems[i].id === this.props.productData.id) {
                browserItems[i] = {
                    ...browserItems[i],
                    wishlisted: !this.props.productData.wishlisted
                }
            }
        }

        this.props.updateBrowserItems(browserItems);

    };

    handleProductWishlist = () => {
        if(this.props.productData.wishlisted) {
            axios.put('https://firststdibs-quiz.firebaseio.com/wishlist.json/', {productID: this.props.productData.id});
        } else
            axios.post('https://firststdibs-quiz.firebaseio.com/wishlist.json/', {productID: this.props.productData.id});

        this.alterWishlistedItemStatus();
    };

    render() {

        const wishlitedItem = ['wishlist', this.props.productData.wishlisted ? 'selected' : null];

        return (
            <Link to={this.props.productData.uri} onClick={(e) => this.saveEnteredProductID(e)} id={this.props.productData.id} className="product-item">
                <img src={ this.props.productData.image} alt="product-image"/>
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
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateBrowserItems: (browserItems) => dispatch(actions.updateBrowserItems(browserItems)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (ProductItem);