import React, {Component} from 'react';
import './BrowsePage.scss';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import axios from 'axios';
import ProductItem from './ProductItem/ProductItem';
import HeaderPart from '../HeaderPart/HeaderPart';

class BrowsePage extends Component{

    state = {
        startingPoint: 1,
        loadMoreAvailability: true,
        loadMoreDisabled: false
    };

    fetchData = async () => {
        const response = await axios.get(`/browse?start=${this.state.startingPoint}`);
        this.props.updateBrowserItems([...this.props.browserItems, ...response.data.items]);
        this.setState({startingPoint: this.state.startingPoint + 9});
        if(this.state.startingPoint >= response.data.totalItems) this.setState({loadMoreAvailability:false});
        if(this.state.loadMoreDisabled) this.setState({loadMoreDisabled:false});
    };

    componentWillMount() {
        this.fetchData();
    }

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
        browserItems: state.browserItems
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateBrowserItems: (browserItems) => dispatch(actions.updateBrowserItems(browserItems))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (BrowsePage);