import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import LoginForm from '../components/LoginForm';
import Subscribe from '../components/Subscribe';
import About from '../components/About';
import Help from '../components/Help';
import Payment from './Payment';

export default class Content extends Component {


    constructor(props) {
        super(props)

        this.state = {
            onShow : false,
            componentName : props.subComponentName
        }
    }

    renderComponent () {

        const {componentName} = this.state;
        const {onShow} = this.state;

            switch(componentName) {

                case 'login' : return (
                        <LoginForm 
                            onShow = {(componentName) => {
                                console.log('login')
                                this.setState({
                                    onShow : true,
                                    componentName : componentName
                                })
                            }}
                            onClose = {() => {
                                this.setState({
                                    onShow : true,
                                    componentName : 'NavBar'
                                    })
                                }} 
                        />
                 ) 

                case 'subscribe' : return (
                        <Subscribe 
                            onShow = {(componentName) => {
                                console.log('Subscribe')
                                this.setState({
                                    onShow : true,
                                    componentName : componentName
                                })
                            }}
                            
                            onClose = {() => {
                             this.setState({
                                onShow : true,
                                componentName : 'NavBar'
                                })
                            }} />
                 ) 
                
                case 'help' : return (
                    <Help onClose = {() => {
                             this.setState({
                                onShow : true,
                                componentName : 'NavBar'
                                })
                            }} />
                 ) 

                case 'about' : return (
                    <About onClose = {() => {
                             this.setState({
                                onShow : true,
                                componentName : 'NavBar'
                                })
                            }} />
                 ) 

                case 'payment' : return (
                    <Payment onClose = {() => {
                             this.setState({
                                onShow : true,
                                componentName : 'NavBar'
                                })
                            }} />
                ) 

                 default : 
                 return ( <NavBar onClose = {() => {
                    this.setState({
                        onShow : false,
                        componentName : this.props.subComponentName
                       })
                   }}/>
                 )
            }
    }

    render() {
        return (
            <div className='app-right-components'>
                <button className="app-close-button" onClick={() => {
                    if(this.props.onClose){
                        this.props.onClose();
                    }
                }} >x</button>
                {this.renderComponent()}
            </div>
        )
    }
}

