import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import FieldInput from '../common/FieldInput';
import SelectInput from '../common/SelectInput';


export const StockForm = ({ handleSubmit, pristine, reset, submitting, heading, authors, handleSave, handleCancel }) => {
    return (
        <form onSubmit={handleSubmit(handleSave)}>
            <h1>{heading}</h1>

            <Field
                type="date"
                name="stock_date"
                label="Stock Date"
                component={FieldInput}
            />

            <Field
                type="number"
                name="meter"
                label="Meter"
                component={FieldInput}
            />

            <Field
                type="number"
                name="d_no"
                label="D. No."
                placeholder="D. No."
                component={FieldInput}
            />

            <Field
                type="text"
                name="color"
                label="Color"
                component={FieldInput}
            />

            <Field
                type="number"
                name="cat"
                label="Cat"
                component={FieldInput}
            />

            <Field
                type="number"
                name="p_o_no"
                label="P. O. No."
                component={FieldInput}
            />

            <Field
                type="number"
                name="weight"
                label="Weight"
                component={FieldInput}
            />

            <div>
                <button type="submit" disabled={submitting} className="btn btn-primary"><i className="fa fa-paper-plane-o" aria-hidden="true" /> Submit</button>

                {heading === 'Add' && <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-default btn-space">Clear Values</button>}

                <button type="button" className="btn btn-default btn-space" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
};





const validate = values => {
    const errors = {};

    if (!values.title) {
        errors.title = 'Required';
    }

    if (!values.category) {
        errors.category = 'Required';
    }

    if (!values.length) {
        errors.length = 'Required';
    }

    if (!values.authorId) {
        errors.authorId = 'Required';
    }

    return errors;
};



StockForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    heading: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    handleSave: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
};



export default reduxForm({
    form: 'StockForm',
    validate
})(StockForm);
