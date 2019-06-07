import React, {Component} from 'react';
import './BrowsePage.scss';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import axios from 'axios';
import ProductItem from './ProductItem/ProductItem';
import HeaderPart from '../HeaderPart/HeaderPart';
import {isItemWishlisted} from '../../shared/utility';

class BrowsePage extends Component{

    state = {
        loadMoreAvailability: true,
        loadMoreDisabled: false,
    };
    // fetches products data
    // if no limit is specified the default of value of 9 is used
    // if limit is passed the argument value will be used to display more than 9 products
    // limit is retrieved from localStorage for the purpose of getting the user back to it's viewed product on page back
    // starting point is adjusted each time to prevent the load more from appearing when there are no more queries to be made
    // wishlist flag is added to the original object to indicate whether the item is wishlisted or not
    fetchData = async () => {
        const limit = localStorage.getItem('limit');
        let response;
        if(limit) response = await axios.get(`/browse?start=${this.props.startingPoint}&limit=${limit}`);
        else response = await axios.get(`/browse?start=${this.props.startingPoint}`);

        const items = response.data.items.map(element => {
            return {
                ...element,
                startingPoint: this.props.startingPoint,
                wishlisted: isItemWishlisted(this.props.wishlistedItems, element.id)
            };
        });

        this.props.updateBrowserItems([...this.props.browserItems, ...items]);
        if(limit) this.props.updateStartingPoint( parseInt(limit, 10) + 1);
        else this.props.updateStartingPoint(this.props.startingPoint + 9);
        if(this.props.startingPoint >= response.data.totalItems) this.setState({loadMoreAvailability:false});
        if(this.state.loadMoreDisabled) this.setState({loadMoreDisabled:false});
    };

    componentDidUpdate(nextProps, nextContext) {
        this.scrollToLastViewedProduct();
    }
    // on component update (only first time) scrolls to the previously viewed product
    scrollToLastViewedProduct = () => {
        const productID = localStorage.getItem('productID');
        const element = document.getElementById(`${productID}`);
        if(productID && element) {
            element.scrollIntoView();
            localStorage.removeItem('productID');
            localStorage.removeItem('limit');
        }
    };
    // set up data on component mount
    componentWillMount = async () => {
        const response = await axios.get('https://firststdibs-quiz.firebaseio.com/wishlist.json/');
        this.props.updatedWishlistedItems(response.data);
        this.fetchData();
    };
    // load more data and concatinates to the browserItems array
    // the button is disabled and re-enabled on each click
    loadMoreProducts = (e) => {
        e.preventDefault();
        this.setState({loadMoreDisabled: true}, () => {
            this.fetchData();
        });
    };

    render() {

        const loadMoreButtonClasses = ['button', this.state.loadMoreDisabled ? 'disabled' : null];

        return (
            <div className="browser-page">
                <HeaderPart params={{showBackButton:false, pageTitle: 'Browse page'}}/>
                <div className="coloured-background">
                    <div className="product-items">
                        {
                            this.props.browserItems.map((element, index) => {
                                return <ProductItem key={index} productData={element}/>
                            })
                        }
                    </div>
                    { this.state.loadMoreAvailability ?  <button className={loadMoreButtonClasses.join(' ')} onClick={(e) => this.loadMoreProducts(e)}>Load more</button> : null }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        browserItems: state.browserItems,
        startingPoint: state.startingPoint,
        wishlistedItems: state.wishlistedItems
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateBrowserItems: (browserItems) => dispatch(actions.updateBrowserItems(browserItems)),
        updateStartingPoint: (startingPoint) => dispatch(actions.updateStartingPoint(startingPoint)),
        updatedWishlistedItems: (wishlistedItems) => dispatch(actions.updateWishlistedItems(wishlistedItems))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (BrowsePage);