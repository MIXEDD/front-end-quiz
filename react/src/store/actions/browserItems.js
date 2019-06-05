import * as actionTypes from './actionTypes';
import axios from 'axios';

export const updateBrowserItems = (browserItems) => {
    return {
        type: actionTypes.UPDATE_BROWSER_ITMES,
        browserItems
    }
};