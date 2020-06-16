import React, { Component } from 'react';
import {StripeProvider, Elements} from 'react-stripe-elements';
import FormPayment from './FormPayment';
export default class Payment extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             selectValue : 'monthly',
             price : 4
        }
    }

    
    onTextFieldChange = (e) => {
        let selectValue = this.state;
        let price = this.state;

        selectValue = e.target.value;

        if(selectValue === 'monthly') {
            price = 4;
        }
        else {
            price = 48;
        }

        console.log('value : ', selectValue);

        this.setState({
            selectValue : selectValue,
            price : price,
        })
    }
    

    render() {

        const {selectValue, price, amount} = this.state;

        return (
            <div className="app-payment-component">
                <h1>Select your payment method</h1>
                    <div className="app-payment-component-inner">
                        <div className="app-payment-component-inner-first">
                            <h2>WeTransfer Pro: {selectValue} payment</h2>
                            <select className="app-payment-component-select" id="payment" onChange={this.onTextFieldChange}  name="payment-type">
                                <option value="monthly" >Monthly Payment</option>
                                <option value="yearly" >Yearly Payment</option>
                            </select>
                            {
                            price == 4 ? <div className="app-payment-component-inner-second"><p>${price} USD</p> /month</div> :
                                         <div className="app-payment-component-inner-second"><p>${price} USD</p> /year</div>    
                        }
                        </div>
                            
                    </div>
                    <div className="app-payment-credit-card">
                        <StripeProvider apiKey = "pk_test_pi0A9UqABLxxKC1M4ymZolqa003eBMBAEt" >
                            <Elements>
                                <FormPayment amount={price}/>
                            </Elements>
                        </StripeProvider>
                    </div>
            </div>
        )
    }
}
