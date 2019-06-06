import React, {Component} from 'react';
import './ItemInner.scss';
import axios from 'axios';
import HeaderPart from '../HeaderPart/HeaderPart';

class ItemInner extends Component {

    state = {
        pageData: null
    };

    isObjectEmpty = (obj) => {
        if(JSON.stringify(obj) === '{}') return true;
        else return false;
    };

    fetchPageData = async (pageID) => {
        const response = await axios.get(`${window.location.protocol}//${window.location.host}/item/${pageID}`);
        if(!this.isObjectEmpty(response.data)) {
            this.setState({pageData: response.data});
        }

    };

    checkIfPageExists = () => {
        const pathnameSplitted = window.location.pathname.split('/');
        const pageID = pathnameSplitted[pathnameSplitted.length - 2].replace('id-', '');
        this.fetchPageData(pageID);
    };

    componentWillMount() {
        this.checkIfPageExists();
    }

    render() {

        if(this.state.pageData !== null) {
            return (
                <div className="item-inner wrapper">
                     <HeaderPart params={{showBackButton: true, pageTitle: this.state.pageData.seller.company}}/>
                    <div className="product">
                        <div className="image">
                            <img src={this.state.pageData.image} alt="product-image"/>
                            <div className="wishlist"></div>
                        </div>
                        <div className="product-info">
                            <div className="top-info">
                                <div className="top-info-padding">
                                    <h3>{this.state.pageData.title}</h3>
                                    {
                                        this.state.pageData.price !== null ? <p className="price">{this.state.pageData.price.amounts.EUR}</p> : <p className="price">Price Upon Request</p>
                                    }
                                    <div className="measurements">
                                        <p className="measure-label">Measurements:</p>
                                        <p className="measure-value">{this.state.pageData.measurements.display}</p>
                                    </div>
                                </div>
                                <div className="purchase-options">
                                    <a>Purchase</a>
                                    <a>Make offer</a>
                                </div>
                            </div>
                            <div className="bottom-info">
                                <p className="description">{this.state.pageData.description}</p>
                                <p className="creator">Creator: <span>{this.state.pageData.creators}</span></p>
                            </div>
                        </div>
                    </div>

                </div>
            );
        } else return (null);
    }
}

export default ItemInner;