import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';



const stocksReducer = (state = initialState.stocksReducer, action) => {
    switch(action.type) {
        case ActionType.GET_STOCKS_RESPONSE: {
            // '...' spread operator clones the state
            // lodash Object assign simply clones action.stocks into a new array.
            // The return object is a copy of state and overwrites the state.stocks with a fresh clone of action.stocks
            return {
                ...state, 
                stocks: _.assign(action.stocks)
            };
        }


        default: { return state; }
    }
};



export default stocksReducer;