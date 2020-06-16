import React, { Component } from 'react';
import _ from 'lodash';
import {history} from '../history';
import PropTypes from 'prop-types';

export default class HomeUploadSent extends Component {

    render() {

        const {data} = this.props;

        const to = _.get(data,'to');
        const postId = _.get(data, '_id');

        console.log("data = ", data);

        return (
            <div className="app-card app-card-upload-sent">
            <div className="app-card-content">
                <div className="app-card-content-inner">
                     <div className="app-home-upload">
                         <div className="app-home-upload-sent-icon">
                             <i className="icon-paper-plane" />
                         </div>
                         <div className="app-upload-sent-message app-text-center">
                            <h2>Files sent!</h2>
                            <p>We've sent an Email to {to} with a download link.
                                The link will expire in 10 days</p> 
                         </div>
                         <div className="app-upload-sent-actions app-form-actions">
                             <button className="app-button primary" onClick={
                                    () => {
                                        history.push(`/share/${postId}`);
                                    }
                                } type="button">View Files</button>
                             <button className="app-button" onClick={
                                 () => {
                                     if(this.props.onSendAnotherFile){
                                        this.props.onSendAnotherFile(true);
                                     }
                                 }
                             } type="button">Send Another File</button>
                         </div>
                     </div>
                </div>
            </div>
        </div>
        )
    }
}

HomeUploadSent.propTypes = {

    data : PropTypes.object,
    onSendAnotherFile : PropTypes.func
}