import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as actions from '../../actions';
import { PAYMENT_FORM, PAYMENT_ADD } from '../../constants';
import { Payment } from '../../components/Payment';
import { getCustomers } from '@/features/customers/actions';
import { getNextNumber, getPaymentModes } from '@/features/settings/actions';
import { getPaymentMethodsState } from '../../selectors';

const mapStateToProps = (state, { navigation }) => {
    const {
        customers: { customers },
        global: { locale },
        settings: { paymentMethods },
        payments: { loading, unPaidInvoices }
    } = state;

    const type = navigation.getParam('type', PAYMENT_ADD);
    const id = navigation.getParam('paymentId', null);
    const invoice = navigation.getParam('invoice', null);
    const hasRecordPayment = navigation.getParam('hasRecordPayment', false);

    return {
        type,
        customers,
        locale,
        invoice,
        hasRecordPayment,
        loading: loading?.paymentLoading,
        unPaidInvoices,
        id,
        paymentMethods: getPaymentMethodsState(paymentMethods),
        formValues: getFormValues(PAYMENT_FORM)(state) || {}
    };
};

const mapDispatchToProps = {
    ...actions,
    getCustomers,
    getNextNumber,
    getPaymentModes
};

//  Redux Form
const paymentReduxForm = reduxForm({
    form: PAYMENT_FORM,
    validate
})(Payment);

//  connect
const PaymentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(paymentReduxForm);

PaymentContainer.navigationOptions = () => ({
    header: null
});

export default PaymentContainer;
