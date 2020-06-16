import React, { Component } from 'react'
import SearchFilterCountry from '../components/SearchFilterCountry';
import classNames from 'classnames';
import {_isEmail} from '../helpers/email';
import {createUserAccount} from '../helpers/Users';
import countries from '../helpers/countries';
import {history} from '../history';
import _ from 'lodash'

export default class Subscribe extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             user : {
                 yearly : true,
                 monthly : false,
                 name : "",
                 email : "",
                 password : "",
                 confirmPassword : "",
                 company : "",
                 vat : "",
                 address : "",
                 city : "",
                 zip : "",
                 country : ""
             },

             error : {
                 name : null,
                 email : null,
                 password : null,
                 confirmPassword : null, 
                 address : null
             },

             messageFromServer : null
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onTextFieldChange = this.onTextFieldChange.bind(this);
        this.formValidation = this.formValidation.bind(this);
        this.onChecked = this.onChecked.bind(this);
        this.setCountryValue = this.setCountryValue.bind(this);
    }

    setCountryValue(value) {
        let user = this.state.user;
        user.country = value;
        console.log('user.country : ', user.country);
        this.setState({
            user : user
        })
    }

    onTextFieldChange = (e) => {

        let {user} = this.state;

        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        user[fieldName] = fieldValue;

        this.setState({
            user : user
        })

    }

    formValidation = (fieldsToValidate = [] , callback = () => {}) => {

        const {user} = this.state;


        const allFields = {

            name :  {
                message : "Your name is required",
                func : () => {
                    const value = _.get(user, 'name', "");
                    if(value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            
            email :  {
                message : "Your Email is required",
                func : () => {
                    const value = _.get(user, 'email', "");
                    if(value.length > 0 && _isEmail(value)) {
                        return true;
                    }
                    return false;
                }
            },

            password :  {
                message : "Your Password is required",
                func : () => {
                    const value = _.get(user, 'password', "");
                    if(value.length > 3) {
                        return true;
                    }
                    return false;
                }
            },

            confirmPassword :  {
                message : "Passwords doesn't match",
                func : () => {
                    const passwordValue = _.get(user,'password');
                    const value = _.get(user, 'confirmPassword', "");
                    if(passwordValue === value) {
                        return true;
                    }
                    return false;
                }
            },

            address :  {
                message : "Your address is required",
                func : () => {
                    const value = _.get(user, 'address', "");
                    if(value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },

            country :  {
                message : "Please select your country",
                func : () => {
                    const value = _.get(user, 'country', "");
                    if(value.length > 0) {
                        return true;
                    }
                    return false;
                }
            }

        }

        let errors = this.state.error;

        _.each(fieldsToValidate, (field) => {

            const fieldValidate = _.get(allFields, field);

            if(fieldValidate) {

                errors[field] = null;
                
                const isFieldValide = fieldValidate.func();

                if(!isFieldValide) {

                    errors[field] = _.get(fieldValidate, 'message');

                }

            }

        })

        this.setState({
            error : errors
        }, () => {

            let isValid = true;

            _.each(errors, (err) => {

                if(err) {
                    isValid = false;
                    console.log('after process of validation form errors', errors);
                }

            })
            
            callback(isValid);
        })
    }

    onChecked = (e) => {

        let {user} = this.state;

        const fieldName = e.target.name;
        const fieldValue = e.target.checked;

        console.log('fieldName :' , fieldName);
        console.log('fieldValue :' , fieldValue);

        user[fieldName] = fieldValue;

        if(fieldName === "yearly") {
            user["monthly"] = false;

        } else {
            user["yearly"] = false;
        }

            console.log('checked : ', fieldValue);

            this.setState({
                user : user
            });

    }

    onSubmit = (event) => {

        event.preventDefault();

        const fieldNeedValidation = ['name', 'email', 'password', 'confirmPassword', 'address'];

        this.formValidation(fieldNeedValidation, (isValid) => {
            

            //SEND DATA TO BACKEND
            if(isValid) {
                let errors = this.state.error;
                createUserAccount(this.state.user).then((response) => {

                    console.log('Hey this is result of post data to the server', response);
                    if(this.props.onShow) {
                        console.log('onShow from Subscribe');
                        this.props.onShow('payment');
                    }
                    //history.push('/payment')
                    

                }).catch(err => {

                    errors["email"] = err.response.data.error.message;
                    console.log('ERROR : ', err.response.data.error.message);
                    isValid = false;
                    this.setState({
                        error : errors
                    });

                    
                })
            }

            console.log('the form is validated ?' , isValid);
      
        });
    }

    render() {

        const {user, error} = this.state;
        const {yearly, monthly} = user;
        const {email} = error;

        return (
        <div className="app-subscribe-component">
            <div className="app-login-form-inner">
                    <h2 className="form-title">Sign up for Tetawood-Transfer Pro</h2>
                    
                    <form className="app-form-subscribe" onSubmit={this.onSubmit}>
                        <div className="radio-buttons">
                            {   
                                yearly === true ? 
                                <label htmlFor="yearly">
                                <div className="radio-button-inner-left-after">
                                    <div className="radio-button-left">
                                        <input id="yearly" type="radio" name="yearly" checked={yearly} onChange={this.onChecked} />
                                    </div>
                                    <h2>Yearly</h2>
                                    <p>48 €</p>
                                    <p className="billing">Save 17%</p>
                                </div>
                                </label> : 
                                <label htmlFor="yearly">
                                <div className="radio-button-inner-left" >
                                    <div className="radio-button-left">
                                        <label htmlFor="yearly">
                                        <input id="yearly" type="radio" name="yearly" checked={yearly} onChange={this.onChecked} />
                                        </label>
                                        
                                    </div>
                                    <h2>Yearly</h2>
                                    <p>48 €</p>
                                    <p className="billing">Save 17%</p>
                                </div>
                                </label>
                            }
                            {  
                                monthly === true ? 
                                <label htmlFor="monthly">
                                <div className="radio-button-inner-right-after">
                                    <div className="radio-button-right">
                                        
                                        <input id="monthly" type="radio" name="monthly" checked={monthly} onChange={this.onChecked} />
                                        
                                        
                                    </div>
                                    <h2>Monthly</h2>
                                    <p>4 €</p>
                                    <p className="billing">One Bill, every month</p>
                                </div>
                                </label> : 
                                <label htmlFor="monthly">
                                <div className="radio-button-inner-right">
                                    <div className="radio-button-right">
                           
                                        <input id="monthly" type="radio" name="monthly" checked={monthly} onChange={this.onChecked} />
                                 
                                    </div>
                                    <h2>Monthly</h2>
                                    <p>4 €</p>
                                    <p className="billing">One Bill, every month</p>
                                </div>
                                </label>
                            }
                        </div>
                        <div className={classNames('app-form-subscribe-item', {'error' : _.get(error, 'name')})}>
                            <input id="name-id" value={user.name} onChange={this.onTextFieldChange} type="text" placeholder="Full name" name="name" />
                        </div>
                        <div className={classNames('app-form-subscribe-item', {'error' : _.get(error, 'email')})}>
                            <input id="email-id" value={user.email} onChange={this.onTextFieldChange} type="email" placeholder="Email Address" name="email" />
                            {   
                                email != null ? <div className="email-error" > 
                                                <span><i className="icon-streamline" /></span>
                                                <p>{email}</p>
                                                </div> : null
                            }
                        </div>
                        <div className={classNames('app-form-subscribe-item', {'error' : _.get(error, 'password')})}>
                            <input id="password-id" value={user.password} onChange={this.onTextFieldChange} type="password" placeholder="Password" name="password" />
                        </div>
                        <div className={classNames('app-form-subscribe-item', {'error' : _.get(error, 'confirmPassword')})}>
                            <input id="password-confirm-id" value={user.confirmPassword} onChange={this.onTextFieldChange} type="password" placeholder="Confirm Password" name="confirmPassword" />
                        </div>
                        <div className="app-billing-header">
                            <h1>You Billing Informations</h1>
                        </div>
                        <div className="app-form-subscribe-item">
                            <input id="company-id" value={user.company} onChange={this.onTextFieldChange} type="text" placeholder="Company (Optionnal)" name="company" />
                        </div>
                        <div className="app-form-subscribe-item">
                            <input id="vat-id" value={user.vat} onChange={this.onTextFieldChange} type="text" placeholder="VAT (Optionnal)" name="vat" />
                        </div>
                        <div className={classNames('app-form-subscribe-item', {'error' : _.get(error, 'address')})}>
                            <input id="address-id" value={user.address} onChange={this.onTextFieldChange} type="text" onChange={this.onTextFieldChange} placeholder="Address" name="address" />
                        </div>
                        <div className="app-form-subscribe-item">
                            <input id="city-id" value={user.city} onChange={this.onTextFieldChange} type="text" placeholder="City (Optionnal)" name="city" />
                        </div>
                        <div className="app-form-subscribe-item">
                            <input id="zip-id" value={user.zipCode} onChange={this.onTextFieldChange} type="text" placeholder="Zip code (Optionnal)" name="zip" />
                        </div>
                        <div className="app-form-subscribe-item">
                            <SearchFilterCountry items={countries} value={user.country} onChange={(value) => this.setCountryValue(value)} name="country" />
                        </div>
                        <div className="app-form-actions">
                            <button className="app-subscribe-button primary" >Complete your order</button>
                        </div>
                    </form>
                </div>
        </div>
    )
    }
}
