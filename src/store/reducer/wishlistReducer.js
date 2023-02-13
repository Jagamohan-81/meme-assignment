import { INITIAL_DATA, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../actions/actionTypes'
const initialState = {
  wishlist: []
}

const wishlistReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_WISHLIST:
      const i = state.wishlist.indexOf(payload.id)
      return {
        ...state,
        wishlist: [...state.wishlist, payload]
      }
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(data => data.id !== payload.id)
      }
    default:
      return state;
  }
};
export default wishlistReducer;