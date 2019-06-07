import React, {Component} from 'react';
import './ItemInner.scss';
import axios from 'axios';
import HeaderPart from '../HeaderPart/HeaderPart';
import {isItemWishlisted, handleProductWishlist} from '../../shared/utility';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";

class ItemInner extends Component {

    state = {
        productData: null,
        wishlistIconDisabled:false
    };
    // checks whether the object is empty
    isObjectEmpty = (obj) => {
        if(JSON.stringify(obj) === '{}') return true;
        else return false;
    };
    // fetches page data
    // also checks if the response object has any data in it
    fetchPageData = async (pageID) => {
        const response = await axios.get(`${window.location.protocol}//${window.location.host}/item/${pageID}`);
        if(!this.isObjectEmpty(response.data)) {
            const wishlist_response = await axios.get('https://firststdibs-quiz.firebaseio.com/wishlist.json/');
            this.props.updatedWishlistedItems(wishlist_response.data);
            const productData = {
                ...response.data,
                wishlisted: isItemWishlisted(wishlist_response.data, response.data.id)
            };
            this.setState({productData: productData});
        }

    };
    // toggles wishlist status
    toggleWishlistStatus = () => {
          this.setState({productData: {
                ...this.state.productData,
                wishlisted: !this.state.productData.wishlisted,
          },
              wishlistIconDisabled: true
          }, () => {
              handleProductWishlist.call(this,axios, !this.state.productData.wishlisted, this.state.productData.id);
          });


    };
    // checks if pageExists based on the URI
    checkIfPageExists = () => {
        const pathnameSplitted = window.location.pathname.split('/');
        const pageID = pathnameSplitted[pathnameSplitted.length - 2].replace('id-', '');
        this.fetchPageData(pageID);
    };
    // on component mount checks if page exists
    componentWillMount() {
        this.checkIfPageExists();
    }

    render() {
        if(this.state.productData !== null) {

            const wishlistedClasses = ['wishlist', this.state.productData.wishlisted ? 'selected' : null, this.state.wishlistIconDisabled ? 'disabled' : null];
            return (
                <div className="item-inner wrapper">
                     <HeaderPart params={{showBackButton: true, pageTitle: this.state.productData.seller.company}}/>
                    <div className="product">
                        <div className="image">
                            <img src={this.state.productData.image} alt="product"/>
                            <div className={wishlistedClasses.join(" ")} onClick={this.toggleWishlistStatus}></div>
                        </div>
                        <div className="product-info">
                            <div className="top-info">
                                <div className="top-info-padding">
                                    <h3>{this.state.productData.title}</h3>
                                    {
                                        this.state.productData.price !== null ? <p className="price">{this.state.productData.price.amounts.EUR}</p> : <p className="price">Price Upon Request</p>
                                    }
                                    <div className="measurements">
                                        <p className="measure-label">Measurements:</p>
                                        <p className="measure-value">{this.state.productData.measurements.display}</p>
                                    </div>
                                </div>
                                <div className="purchase-options">
                                    <a>Purchase</a>
                                    <a>Make offer</a>
                                </div>
                            </div>
                            <div className="bottom-info">
                                <p className="description">{this.state.productData.description}</p>
                                <p className="creator">Creator: <span>{this.state.productData.creators}</span></p>
                            </div>
                        </div>
                    </div>

                </div>
            );
        } else return (null);
    }
}

const mapStateToProps = state => {
    return {
        wishlistedItems: state.wishlistedItems
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updatedWishlistedItems: (wishlistedItems) => dispatch(actions.updateWishlistedItems(wishlistedItems))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (ItemInner);