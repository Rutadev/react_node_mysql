import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import stocksReducer from './stocksReducer';
import selectedStockReducer from './selectedStockReducer';
import authorReducer from './authorReducer';
import apiReducer from './apiReducer';

export default combineReducers({
    stocksReducer,
    selectedStockReducer,
    authorReducer,
    apiReducer,
    form: formReducer    
});


