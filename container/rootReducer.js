import { combineReducers } from "redux";
import pageReducer from "./Page/pageReducer";
import usersReducer from "./Users/usersReducer";
import sampleReducer from "./Sample/sampleReducer";


const rootReducer = combineReducers(
    {
        page: pageReducer,
        users: usersReducer,
        sample: sampleReducer
    })


export default rootReducer;
