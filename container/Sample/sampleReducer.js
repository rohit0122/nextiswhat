import * as Types from './sampleTypes';

const initialState = {
    sampleData: [],
};

const sampleReducer = (state = initialState, action) => {

    switch (action.type) {
        case Types.SET_SAMPLE_DATA:
            return {
                ...state,
                sampleData: action.payload
            }
        default:
            return state
    }
}
export default sampleReducer;
