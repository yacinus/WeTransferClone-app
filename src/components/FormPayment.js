import React, { Component } from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import {sendPaymentInfos} from '../helpers/PaymentInfos';
import _ from 'lodash';

class FormPayment extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            fields : {
                name : ""
        }
        }
    
        this.onTextFieldChange = this.onTextFieldChange.bind(this);
    }
    
    onTextFieldChange = (e) => {

        let {fields} = this.state;

        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        fields[fieldName] = fieldValue;

        this.setState({
            fields : fields
        })

    }

    onSubmit = async (event) => {

        event.preventDefault();
        
        let {fields} = this.state;

        let name = _.get(fields, 'name');

        console.log("name : ", name);
        const cardElement = this.props.elements.getElement('card');
        
        try {

        this.props.stripe
        .createPaymentMethod({
                            type: 'card',
                            card: cardElement,
                        }).then(({paymentMethod}) => {
        console.log('Received Stripe PaymentMethod:', paymentMethod);
      });

      let {token} = await this.props.stripe.createToken({type: 'card', name: name});

      let amount = this.props.amount;

      
      sendPaymentInfos(token, amount);

        }catch(err) {
            throw err;
        }
        
    }


    render() {

        const {fields} = this.state;

        return (
            <div className="app-form-payment-component">
                <form onSubmit={this.onSubmit}>
                <div>
                <label>name</label>
                <input type="text" className="credit-card-name" value={fields.name}  onChange={this.onTextFieldChange} name="name" />
    
                </div>
                <div>
                <label>CC Number -- Exp. Date -- CVC</label> 
                <CardElement className="card-element" />
                </div>
                
                <button className="">Charge it !</button>
            </form>
            </div>
            
        )
    }

}

export default injectStripe(FormPayment);