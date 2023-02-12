import {INITIAL_DATA,ADD_TO_WISHLIST,REMOVE_FROM_WISHLIST} from './actionTypes'

export const initialAdd = (data) => {
    return {
      type: INITIAL_DATA,
      payload:data,
    };
  };

  export const addToWishlist = (data) => {
    return {
      type:ADD_TO_WISHLIST,
      payload:data,
    };
  };
  
  export const removeFromWishlist = (data) => {
    return {
      type: REMOVE_FROM_WISHLIST ,
      payload:data,
    };
  };