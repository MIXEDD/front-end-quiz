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
            this.setState({pageData: response.data}, () => {
                console.log(this.state.pageData);
            });
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
        return (
            <div className="item-inner">
                {
                    this.state.pageData !== null ?
                        <HeaderPart params={{showBackButton: true, pageTitle: this.state.pageData.seller.company}}/>
                        : null
                }
            </div>
        );
    }
}

export default ItemInner;