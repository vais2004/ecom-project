const initialState = {
  wishlistItems: [],
};

export const addToWishlist = (outfit) => ({
  type: "ADD_TO_WISHLIST",
  payload: outfit,
});

export const removeFromWishlist = (outfitId) => ({
  type: "REMOVE_FROM_WISHLIST",
  payload: outfitId,
});

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload],
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (item) => item._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default wishlistReducer;
