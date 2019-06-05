import React, {Component} from 'react';
import './ProductItem.scss';
import {Link} from 'react-router-dom';

class ProductItem extends Component {
    render() {
        return (
            <Link to={this.props.productData.uri} className="product-item">
                <img src={ this.props.productData.image} alt="product-image"/>
                <div className="price-wishlist-container">
                    {
                        this.props.productData.price !== null ?
                            <p className="product-price">{this.props.productData.price.amounts.EUR}</p>
                            :
                            <p>Price Upon Request</p>
                    }
                    <div className="wishlist"></div>
                </div>
            </Link>
        );
    }
}

export default ProductItem;