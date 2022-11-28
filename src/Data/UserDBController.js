export const loadJSON = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const saveJSON = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getWishMovieIdList = (userId) => {
    const {wishlist} = loadJSON(userId);
    return wishlist;
}

export const getCartMovieIdList = (userId) => {
    const {cartlist} = loadJSON(userId);
    return cartlist;
}

export const getPurchaseMovieIdList = (userId) => {
    const {purchaselist} = loadJSON(userId);
    return purchaselist;
}