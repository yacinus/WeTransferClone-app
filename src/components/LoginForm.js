import React, { Component } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import {_isEmail} from '../helpers/email';
import {login} from '../helpers/Users';

export default class LoginForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            message : null,
            user : {
                email : "",
                password : ""
            },
            error : {
                email : null,
                password : null
            }
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onTextFieldChange = this.onTextFieldChange.bind(this);
        this.formValidation = this.formValidation.bind(this);
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

    formValidation = (fieldsToValidate = [], callback = () => {}) => {

        const {user} = this.state;

        const allFields = {

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
            }

        }

        let errors = this.state.error;

        _.each(fieldsToValidate, (field) => {

            const fieldValidate = _.get(allFields, field);

            if(fieldValidate) {

                errors[field] = null;

                const isFieldValid = fieldValidate.func();
                
                if(!isFieldValid) {
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


    onSubmit = (event) => {

            event.preventDefault();

            const fieldNeedToValidate = ['email', 'password'];

            
            this.formValidation(fieldNeedToValidate, (isValid) => {


                //SEND DATA TO BACKEND
                if(isValid) {
                    
                    //Send request to backend
                    login(this.state.user.email, this.state.user.password).then((response) => {
                        
                        //login successfull 
                        this.setState({
                            message : {
                                type : 'success',
                                message : 'login successful'
                            }
                        })


                    }).catch(err => {
                        //login failed
                        this.setState({
                            error : {
                                email : 'false',
                                password : 'false'
                            }
                        })
                        console.log('error login failed : ', err);
                    })
                }
            })
    }
    

    render() {

        const {user, error, message} = this.state;

        return (
        
                <div className="app-login-form-inner">
                    <h2 className="form-title">Sign In</h2>
                    
                    <form onSubmit={this.onSubmit}>

                        <div className={classNames('app-form-item', {'error' : _.get(error, 'email')})}>
                            <input id="email-id" value={user.email} onChange={this.onTextFieldChange} type="email" placeholder="Enter your Email" name="email" />
                        </div>
                        <div className={classNames('app-form-item', {'error' : _.get(error, 'password')})}>
                            <input id="password-id" value={user.password} onChange={this.onTextFieldChange} type="password" placeholder="Enter your Password" name="password" />
                        </div>
                        <div className="app-form-actions">
                            <button className="app-button primary">Login</button>
                            
                        </div>
                    </form>
                    <div className="app-form-forgotten-pass">
                                <a href="">Forgot Password ?</a>
                            </div>
                            <div className="app-form-forgotten-pass">
                                <button onClick={() => {
                                    if(this.props.onShow) {
                                        this.props.onShow('subscribe');
                                    }
                                }} >SIGN UP</button>
                            </div>
                </div>
        )
    }
}
