import React, { Component } from 'react';
import Home from '../pages/Home';
import {Router, Switch, Route} from 'react-router-dom';
import Payment from '../components/Payment';
import View from '../pages/View';
import NavBar from '../components/NavBar';
import Content from '../components/Content';
import {history} from '../history';
import {checkLoginStatus} from '../helpers/CheckLoginStatus';
import '../css/app.css'


export default class Layout extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             subComponentName : null,
             componentName : 'NavBar',
             onClose : false
        }
    }

    componentDidMount() {
        checkLoginStatus()
    }

    renderComponent () {

        const {componentName, subComponentName} = this.state;

            switch(componentName) {

                case 'content' : return (
                    <React.Fragment>
                        <NavBar />
                        <Content subComponentName ={subComponentName}
                            onClose = {
                                (componentName) => {
                                    console.log('content index')
                                    this.setState({
                                        componentName : componentName
                                    })
                                }
                            }
                        />
                    </React.Fragment>
                 )

                 default : return <NavBar 
                 onShowPage = {
                    (subComponentName) => {
                        this.setState({
                            componentName : 'content',
                            subComponentName : subComponentName
                        })
                    }
                }

                onClose = {() => {
                    this.setState({
                       onClose : false,
                       componentName : this.props.subComponentName
                       })
                   }} 
                 />;

            }

    }
    

    render() {
        return (
            <div className="app-layout">
                {this.renderComponent()}
                <Router history={history}>
                    <Switch>
                        <Route exact path={'/'} component={Home} />
                        <Route exact path={'/share/:id'} component={View} />
                    </Switch>
                </Router>
            </div>
            
        )
    }
}
