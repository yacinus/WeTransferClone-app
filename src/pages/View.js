import React, { Component } from 'react';
import _ from 'lodash';
import {getDownloadInfo} from '../helpers/Download';
import {formatNumbers} from '../helpers/formatNumbers';
import {history} from '../history';
import {apiURL} from '../config';

export default class View extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             post :null
        }

        this.getTotalDownloadSize = this.getTotalDownloadSize.bind(this);
    }
    

    componentDidMount(){

        const {match} = this.props;

        const postId = _.get(match, 'params.id');

        getDownloadInfo(postId).then((response) => {
            
            this.setState({
                post : _.get(response, 'data')
            })

        }).catch((err) => {
            console.log("an error fetching download data", err); //we can redirect user to not found page 404 later
        })
    }

    getTotalDownloadSize = () => {

        const {post} = this.state;

        let total = 0;

        const files = _.get(post, 'files', []);

        _.each(files, (file) =>  {
            total = total + _.get(file, 'size', 0);
        });

        return formatNumbers(total);
    }

    render() {

        const {post} = this.state;
        const files = _.get(post, 'files', []);
        const totalSize =this.getTotalDownloadSize();
        const postId = _.get(post, '_id', null);

        return (
            <div className="app-page-download">
                <div className="app-top-header">
                <h1 onClick={() => {
                    history.push('/');
                }} ><i className="icon-paper-plane" />SHARE</h1>
                </div>
                <div className="app-card app-card-download">
            <div className="app-card-content">
                <div className="app-card-content-inner">
                    <div className="app-download-icon">
                        <i className="icon-download" />
                    </div>
                    <div className="app-download-message app-text-center">
                        <h2>Ready to download</h2>
                        <ul>
                            <li>{files.length > 1 ? `${files.length} files` : `${files.length} file`}</li>
                            <li>{totalSize}</li>
                            <li>Expires in 10 days</li>
                        </ul>
                    </div>
                    <div className="app-download-file-list">
                        {
                            files.map((file, index) => {

                                return (
                                    <div key={index} className="app-download-file-list-item">
                                        <div className="filename">{_.get(file,'originalName')}</div>
                                        <div className="download-action"><a href={`${apiURL}/download/${_.get(file, '_id')}`}>download</a></div>
                                    </div>
                                )

                            })
                        }
                            
                    </div>
                    <div className="app-download-actions app-form-actions">
                        <a className="app-button primary" href={`${apiURL}/posts/${postId}/download`} >Download All</a>
                        <button className="app-button" type="button">Share</button>
                    </div>
                </div>
            </div>
        </div>
            </div>
        )
    }
}
