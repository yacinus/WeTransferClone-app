import React, { Component } from 'react'

export default class NavBar extends Component {


    render() {
        return (
            <div className="app-nav-bar">
                <div className="app-nav-bar-inner">
                    <div className="app-nav-bar-left">
                        <i className="icon-paper-plane"><a></a></i>
                    </div>
                    <div className="app-nav-bar-right">
                       <div className="app-nav-bar-right-inner">
                        
                        <ul className="user-profile-menu">
                            
                            <li className="user-signin-button" onClick={() => {
                                if(this.props.onShowPage){
                                    this.props.onShowPage('help');
                                }
                            }} >Help</li>
                            <li className="user-signin-button" onClick={() => {
                                if(this.props.onShowPage){
                                    this.props.onShowPage('about');
                                }
                            }}>About</li>
                            <li className="user-signin-button" onClick={() => {
                                if(this.props.onShowPage){
                                    this.props.onShowPage('subscribe');
                                }
                            }}>Subscribe</li>
                            <li className="user-signin-button" onClick={() => {
                                if(this.props.onShowPage){
                                    this.props.onShowPage('login');
                                }
                            }}>Sign In</li>
                        </ul>
                       </div>
                </div>
                    </div>
                    
            </div>
        )
    }
}
