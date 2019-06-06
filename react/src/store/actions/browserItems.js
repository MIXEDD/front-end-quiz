import * as actionTypes from './actionTypes';

export const updateBrowserItems = (browserItems) => {
    return {
        type: actionTypes.UPDATE_BROWSER_ITMES,
        browserItems
    }
};

export const updateStartingPoint = (startingPoint) => {
    return {
        type: actionTypes.UPDATE_REQUEST_STARTING_POINT,
        startingPoint
    }
};

export const updateWishlistedItems = (wishlistedItems) => {
    return {
        type: actionTypes.UPDATE_WISHLISTED_ITEMS,
        wishlistedItems
    }
};