import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as stockAction from '../../action/StockAction';
import StockList from './StockList';



export class StockListContainer extends React.Component {

    constructor() {
        super();

        this.state = {selectedStockId: undefined};

        this.handleAddStock = this.handleAddStock.bind(this);
        this.handleEditStock = this.handleEditStock.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
    }


    componentDidMount() {
        this.props.action.getStocksAction()
            .catch(error => {
                toastr.error(error);
            });
    }



    handleAddStock() {
        this.props.history.push('/stock');
    }



    handleEditStock() {
        const selectedStockId = this.state.selectedStockId;

        if (selectedStockId) {
            this.setState({selectedStockId: undefined});
            this.props.history.push(`/stock/${selectedStockId}`);
        }        
    }



    handleDelete() {
        const selectedStockId = this.state.selectedStockId;

        if (selectedStockId) {
            this.setState({selectedStockId: undefined});
            this.props.action.deleteStockAction(selectedStockId)
                .catch(error => {
                    toastr.error(error);
                });
        }
    }



    handleRowSelect(row, isSelected) {
        if (isSelected) {
            this.setState({selectedStockId: row.id});
        }
    }



    render() {
        const { stocks } = this.props;

        if (!stocks) {
            return (
                <div>Loading...</div>
            );
        }

        return (
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col">
                        <h1>Stocks</h1>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <div className="btn-group" role="group">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.handleAddStock}
                            >
                                <i className="fa fa-plus" aria-hidden="true"/> New
                            </button>

                            <button
                                type="button"
                                className="btn btn-warning ml-2"
                                onClick={this.handleEditStock}
                            >
                                <i className="fa fa-pencil" aria-hidden="true"/> Edit
                            </button>                                

                            <button
                                type="button"
                                className="btn btn-danger ml-2"
                                onClick={this.handleDelete}
                            >
                                <i className="fa fa-trash-o" aria-hidden="true" onClick={this.handleDelete}/> Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <StockList stocks={stocks} handleRowSelect={this.handleRowSelect}/>
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => ({
    stocks: state.stocksReducer.stocks
});



const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(stockAction, dispatch)

});



StockListContainer.propTypes = {
    Stocks: PropTypes.array,
    action: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};



export default connect(mapStateToProps, mapDispatchToProps)(StockListContainer);
