//Used to combine new and old state objects and return it as a updated COPY
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};
// checks whether the current item is wishlisted
export const isItemWishlisted = (wishlisted_items, productID) => {
    for(let key in wishlisted_items) {
        if(wishlisted_items[key].productID === productID) return true;
    }

    return false;
};

// adds the wishlist flag to all browserItems
export function alterWishlistedItemStatus() {
    const browserItems = [...this.props.browserItems];
    for(let i = 0; i < browserItems.length; i++) {
        if(browserItems[i].id === this.props.productData.id) {
            browserItems[i] = {
                ...browserItems[i],
                wishlisted: !this.props.productData.wishlisted
            }
        }
    }

    this.props.updateBrowserItems(browserItems);
};
// updates database data which handles wishlisting
export async function handleProductWishlist (axios, wishlisted, productID) {

    // if to be deleted
    if(wishlisted) {
        const wishlistedItems = {...this.props.wishlistedItems};

        for(let key in wishlistedItems) {
            if(wishlistedItems[key].productID === productID) {
                delete wishlistedItems[key];
                break;
            }
        }
        this.props.updatedWishlistedItems(wishlistedItems);
        await axios.put('https://firststdibs-quiz.firebaseio.com/wishlist.json/', wishlistedItems);
        this.setState({wishlistIconDisabled:false});
    }
    // if to be inserted
    else {
        await axios.post('https://firststdibs-quiz.firebaseio.com/wishlist.json/', {productID: productID});
        this.setState({wishlistIconDisabled:false});
        axios.get('https://firststdibs-quiz.firebaseio.com/wishlist.json/').then((response) => {
            this.props.updatedWishlistedItems(response.data);
        });
    }
}