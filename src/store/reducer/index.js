
import initialDataReducer from '../reducer/InitialDataReducer'
import wishlistReducer from './wishlistReducer';
import { combineReducers } from "redux";

const allReducers = combineReducers({
    initialDataReducer,wishlistReducer,
});
export default allReducers;