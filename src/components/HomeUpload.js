import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {formatNumbers} from '../helpers/formatNumbers';

export default class HomeUpload extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             data : null,
             startTime : new Date(),
             lastLoad : 0,
             speedUpload : 0,
             loaded : 0,
             total : 0,
             percentage : 0
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){

        const {startTime, lastLoad} = prevState;
        const {event} = nextProps;
        let loaded = 0;
        let total = 0;
        let percentage = 0;
        

        console.log("getting event of uploading ", event);   // event = { type : onUploadProgress/success/error, payload : data }

        switch(_.get(event, 'type')) {

            case 'onUploadProgress' : 
            
            loaded = _.get(event, 'payload.loaded', 0);
            total = _.get(event, 'payload.total', 0);
            
            
            percentage = total !== 0 ? (loaded / total) * 100 : 0;

            const currentTime = new Date();
            let diffTimeBetweenStartAndCurrent = currentTime - startTime;

            console.log('diffBetween = ', diffTimeBetweenStartAndCurrent);
            console.log('currentTime = ', currentTime);
            console.log('startTime = ', startTime);
            
            if(diffTimeBetweenStartAndCurrent === 0){
                diffTimeBetweenStartAndCurrent = 1;
            }

            const speedPerOneMillisecond = (loaded - lastLoad) / diffTimeBetweenStartAndCurrent;

            const speedPerSecond = speedPerOneMillisecond * 10;



            console.log('speedPerSecond = ', speedPerSecond);

            return { 
                event : event,
                loaded : loaded,
                lastLoad : loaded,
                startTime : currentTime,
                total : total,
                percentage : percentage,
                speedUpload : speedPerSecond
            };

            default :  break;
        }

        return {
            event : event
        }

        
    }

    
    componentDidMount(){
        const {data} = this.props;

        this.setState({
            data : data,
        })
    }
    
    
    render() {

        const {percentage, data, loaded, total, speedUpload} = this.state;

        const totalFiles = _.get(data, 'files', []).length;
        
        console.log("get data from parent component", data);

        return (
            
            <div className="app-card app-card-upload">
                <div className="app-card-content">
                    <div className="app-card-content-inner">
                         <div className="app-home-upload">
                             <div className="app-home-upload-icon">
                                 <i className="icon-upload" />
                                 <h2>Sending ...</h2>
                             </div>
                                <div className="app-total-files-uploaded">{totalFiles > 1 ? `Uploading ${totalFiles} files` : `Uploading ${totalFiles} file`}</div>

                            <div className="app-progress">
                                <span className="app-progress-bar" style={{width : `${percentage}%`}} />
                            </div> 

                             <div className="app-state-uploads">
                                <div className="app-state-uploads-left">{formatNumbers(loaded)} / {formatNumbers(total)}</div> 
                                <div className="app-state-uploads-right">{formatNumbers(speedUpload)}/s</div> 
                             </div>

                             <div className="app-form-actions">
                                 <button className="app-button" onClick={ () => {
                                        if(this.props.onCancel) {
                                            this.props.onCancel(true)
                                        }
                                    }
                                 } type="button">Cancel</button>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        )
    }   
}

HomeUpload.prototypes = {
    data : PropTypes.object,
    event : PropTypes.object,
    onCancel : PropTypes.func
}
