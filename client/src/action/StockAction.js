import * as ActionType from './ActionType';
import StockApi from '../api/StockApi';
import {ApiCallBeginAction, ApiCallErrorAction} from './ApiAction';


export const getStocksResponse = stocks => ({
    type: ActionType.GET_STOCKS_RESPONSE,
    stocks
});


export function getStocksAction() {
    return (dispatch) => {
        dispatch(ApiCallBeginAction());
        return StockApi.getAllStocks('*')
            .then(stocks => {
                dispatch(getStocksResponse(stocks));
            }).catch(error => {
                throw error;
            });
    };
}


export const addNewStockResponse = () => ({
    type: ActionType.ADD_NEW_STOCK_RESPONSE
});


export const updateExistingStockResponse = () => ({
    type: ActionType.UPDATE_EXISTING_STOCK_RESPONSE
});


export function saveStockAction(stockBeingAddedOrEdited) {
    return function (dispatch) {

        dispatch(ApiCallBeginAction());

        return StockApi.saveStock(stockBeingAddedOrEdited)
            .then(() => {debugger
                if (stockBeingAddedOrEdited.taka_no) {
                    dispatch(updateExistingStockResponse());
                } else {
                    dispatch(addNewStockResponse());
                }
            }).then(() => {debugger
                dispatch(getStocksAction());
            }).catch(error => {
                dispatch(ApiCallErrorAction());
                throw (error);
            });
    };
}


export const getStockResponse = stockFound => ({
    type: ActionType.GET_STOCK_RESPONSE,
    stock: stockFound
});


export function getStockAction(stockId) {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return StockApi.getStock(stockId)
            .then(stock => {
                dispatch(getStockResponse(stock));
            }).catch(error => {
                throw error;
            });
    };
}


export const deleteStockResponse = () => ({
    type: ActionType.DELETE_STOCK_RESPONSE
});


export function deleteStockAction(stockId) {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return StockApi.deleteStock(stockId)
            .then(() => {
                dispatch(deleteStockResponse());
            }).then(() => {
                dispatch(getStocksAction());
            }).catch(error => {
                throw error;
            });
    };
}