//Used to combine new and old state objects and return it as a updated COPY
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const isItemWishlisted = (wishlisted_items, productID) => {
    for(let key in wishlisted_items) {
        if(wishlisted_items[key].productID === productID) return true;
    }

    return false;
};