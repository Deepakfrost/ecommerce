import { combineReducers } from "redux";
import { cartReducer } from "./Reducer";

const rootReducer=combineReducers({
    cartReducer:cartReducer
})

export default rootReducer;