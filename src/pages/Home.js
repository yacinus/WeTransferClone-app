import React, { Component } from 'react'
import Header from '../components/Header';
import HomeForm from '../components/HomeForm';
//import HomeFormFolder from '../components/HomeFormFolder';
import HomeUpload from '../components/HomeUpload';
import HomeUploadSent from '../components/HomeUploadSent';
import _ from 'lodash';
export default class Home extends Component {

    constructor(props){

        super(props); 

        this.state = {
            componentName : 'HomeForm',
            data : null,
            uploadEvent : null
        }

        this._renderComponent = this._renderComponent.bind(this);
    }

    _renderComponent = () => {

        const {componentName, data, uploadEvent} = this.state;

        switch(componentName) {

            case 'HomeUpload' : 
                return <HomeUpload onCancel={ () => {
                    this.setState({
                        componentName : 'HomeForm',
                        data : null,
                        uploadEvent : null
                        })
                    }
                } event={uploadEvent} data={data} />

            case 'HomeUploadSent' :
                return <HomeUploadSent data={data} onSendAnotherFile ={ () => { 
                    this.setState({
                        componentName : 'HomeForm'
                    })
                }} />

            default : 
                return (<HomeForm
                    
                    onUploadEvent = {(event) => {
                 
                        console.log("onUploadEvent", event);

                        let data = this.state.data;

                        if(_.get(event, 'type') === 'success'){
                            data = _.get(event, 'payload');
                        }

                        this.setState({
                            data : data,
                            uploadEvent : event,
                            componentName : (_.get(event, 'type') === 'success') ? 'HomeUploadSent' : this.state.componentName
                            })
                    }}

                    onUploadBegin = { (data) => {
                        console.log("onUploadBegin");
                    this.setState({
                        data : data,
                        componentName : 'HomeUpload'
                    })
                   }
                } />);

        }

    }



    render() {
        return (
            <div className="app-container"> 
                <div className="app-content">
                    {this._renderComponent()}
                </div>
                <Header />
            </div>
        )
    }
}
