import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";

const initialState = {
    browserItems: [],
    startingPoint: 1,
    wishlistedItems: null
};

export const updateBrowserItems = (state, action) => {
    const newObject = {
        browserItems: action.browserItems
    };

    return updateObject(state, newObject);
};

export const udpateStartingPoint = (state, action) => {
    const newObject = {
        startingPoint: action.startingPoint
    };

    return updateObject(state, newObject);
};

export const updateWishlistedItems = (state, action) => {
    const newObject = {
        wishlistedItems: action.wishlistedItems
    };

    return updateObject(state, newObject);
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_BROWSER_ITMES: return updateBrowserItems(state, action);
        case actionTypes.UPDATE_REQUEST_STARTING_POINT: return udpateStartingPoint(state, action);
        case actionTypes.UPDATE_WISHLISTED_ITEMS: return  updateWishlistedItems(state, action);
        default: return state;
    }
};

export default reducer;