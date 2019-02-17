import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';


const selectedStockReducer = (state = initialState.selectedStockReducer, action) => {
    switch(action.type) {

        case ActionType.GET_STOCK_RESPONSE: {
            return {
                ...state,
                stock: _.assign(action.stock)
            };
        }


        default: { return state; }
    }
};


export default selectedStockReducer;