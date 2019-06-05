import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";

const initialState = {
    browserItems: []
};

export const updateBrowserItems = (state, action) => {
    const newObject = {
        browserItems: action.browserItems
    };

    return updateObject(state, newObject);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_BROWSER_ITMES: return updateBrowserItems(state, action);
        default: return state;
    }
};

export default reducer;