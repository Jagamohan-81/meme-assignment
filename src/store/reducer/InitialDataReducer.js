import {INITIAL_DATA} from '../actions/actionTypes'
const initialState={
  initialData:[]
}

const initialDataReducer = (state = initialState, {type,payload}) => {
    switch (type) {
      case INITIAL_DATA:
        return {
          ...state,
          initialData:payload,
       } 
      default:
        return state;
    }
  };
  export default initialDataReducer;