import React, { Component } from 'react';
import classNames from 'classnames';
import {upload} from '../helpers/Upload';
import {_isEmail} from '../helpers/email';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class HomeForm extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             form : {
                 files : [],
                 //pathsOfFiles : [],
                 namesOfElements : [],
                 to : '',
                 from : '',
                 message : '',
                 rootPath : ''
             },

             errors : {
                 to : null,
                 from : null,
                 message : null,
                 files : null,
                 //pathsOfFiles : []
             }
        }

        this._onTextChange = this._onTextChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._checkForm = this._checkForm.bind(this);
        this._onFileAdded = this._onFileAdded.bind(this);
        this._onFolderAdded = this._onFolderAdded.bind(this);
        this._onFileRemove = this._onFileRemove.bind(this);
        this._fillPathsOfFiles = this._fillPathsOfFiles.bind(this);
        this._removeSquareBrackets = this._removeSquareBrackets.bind(this);
    }

    _checkForm = (fields = [], callback = () => {}) => {

        let {form, errors} = this.state;

        const validations = {

            to : [
                {
                    errorMessage : "To is required !",
                    isValid : () => {
                        return form.to.length;
                    }
                },

                {
                    errorMessage : "Email is not valid",
                    isValid : () => {
                        return _isEmail(form.to);
                    }
                }
            ],

            from : [
                {
                    errorMessage : "From is required !",
                    isValid : () => {
                        return form.from.length;
                    }
                },

                {
                    errorMessage : "Email is not valid",
                    isValid : () => {
                        return _isEmail(form.from);
                    }
                }
            ],

            files : [
                {
                    errorMessage : "Files is required",
                    isValid : () => {
                        return form.files.length;
                    }
                }
            ], 
/*
            pathsOfFiles : [
                {
                    errorMessage : "Path not valid",
                    isValid : () => {
                        return form.pathsOfFiles.length;
                    }
                }
            ]
*/
        }

        _.each(fields, field => {

            let fieldValidations = _.get(validations, field, []); //validations[field]

            errors[field] = null;

            _.each(fieldValidations, fieldValidation => {
                
                const isValid = fieldValidation.isValid();

                if(!isValid) {

                    errors[field] = fieldValidation.errorMessage;
                }
            })
        })

        this.setState({
            errors : errors
        }, () => {
            let isValid = true;
            _.each(errors, (err) => {
                if(err != null) {
                    isValid = false;
                }
            });
            return callback(isValid);
        })
    }
    
    _onTextChange = (event) => {

        let {form} = this.state;
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        form[fieldName] = fieldValue;
        this.setState({
            form : form
        })
    }

    _onFileAdded = (event) => {

        let files = this.state.form.files;
        let namesOfElements = this.state.form.namesOfElements;
        //let pathsOfFiles = this.state.form.pathsOfFiles;

        _.each(_.get(event, 'target.files', []), file => {
            files.push(file);
            //pathsOfFiles.push(_.get(file, 'webkitRelativePath', null));
            namesOfElements.push(file.name);
        })

        console.log('files : ', files);

        this.setState({
            form : {
                ...this.state.form,
                files : files, 
                namesOfElements : namesOfElements
            }
        }, () => {
            this._checkForm(['files'], (isValid) => {
                
            })
        })
    }

    _onFolderAdded = (event) => {
        let files = this.state.form.files;
        let namesOfElements = this.state.form.namesOfElements;
        let folder = [];
        //CREATE ARRAY NAME OF OBJECTS ON STATE AND POPULATE IT EVERYTIME WE ADD FILE OR FOLDER
        let path = null
        let rootPath = null;
        let index = null;

        _.each(_.get(event, 'target.files', []), file => {
            folder.push(file);
            path = _.get(file, 'webkitRelativePath', null);
        })

            console.log('PATH : ', path);

            index = path.indexOf('/');
            rootPath = path.substring(0, index);

            namesOfElements.push(rootPath);

        console.log('rootPath : ', rootPath);

        files = files.concat([folder]);

        console.log('files after concatenation : ', files);
        

        this.setState({
            form : {
                ...this.state.form,
                files : files,
                namesOfElements : namesOfElements
            }
        }, () => {
            this._checkForm(['files'], (isValid) => {
                
            })
        })
    }

    _onFileRemove(key) {
        let {namesOfElements} = this.state.form;
        let {files} = this.state.form;

        console.log('files before removing : ', files);
        console.log('namesOfElements before removing : ', namesOfElements);

        namesOfElements.splice(key, 1);
        files.splice(key, 1);

        console.log('files after removing : ', files);
        console.log('namesOfElements after removing : ', namesOfElements);

        this.setState({
            form : {
                ...this.state.form,
                files : files,
                namesOfElements : namesOfElements
            }
        })
    }

    _fillPathsOfFiles = (finalArrayFiles) => {

        let path = null;
        let pathsOfFiles = [];

        _.each(finalArrayFiles, (file) => {
            
            path = _.get(file, 'webkitRelativePath', null);
            pathsOfFiles.push(path);
        });

        return pathsOfFiles;

    }

    _removeSquareBrackets = () => {

        const {files} = this.state.form;
        let finalArrayFiles = files;

        finalArrayFiles = [].concat.apply([], files);

        console.log('finalArrayFiles from REMOVESQUARE : ', finalArrayFiles);

       return finalArrayFiles;

    }

    _onSubmit = (event) => {
        event.preventDefault();
        this._checkForm(['from', 'to', 'files' /*, 'pathsOfFiles'*/], (isValid) => {
            
            if(isValid) {
                
                console.log('AAAAAAAAAAA');
                
                this._removeSquareBrackets();
                
                const data = this.state.form;
                //const {files} = this.state.form;
                
                console.log('BBBBBBBBBBBBBBBB');
                
                const finalArrayFiles = this._removeSquareBrackets();
                const finalPathsOfFiles = this._fillPathsOfFiles(finalArrayFiles);
                
                data.files = finalArrayFiles;

                console.log('finalPathsOfFiles from _onSubmit : ', finalPathsOfFiles);

                this.setState({
                    form : data
                }, () => {

                    if(this.props.onUploadBegin) {
                    this.props.onUploadBegin(data);
                }
                //form is valid and ready to be submitted 
                upload(data, finalPathsOfFiles, (event) => {
                    if(this.props.onUploadEvent) {
                        console.log('onUploadEvent callback', event);
                        this.props.onUploadEvent(event);
                    }
                })

                })

                
            }

        });
        //console.log(this.state.form);
    }

    render() {

        const {form, errors} = this.state;
        const {files} = form;
        const {namesOfElements} = form;

        const list = (
                    <div className="app-files-selected">
                        {
                                
                                namesOfElements.map((name, index) => {
                                    return (
                                    <div className="app-file-selected-item" key={index}>
                                        <div className="file-name">{name}</div>
                                        <div className="file-action">
                                            <button className="app-file-remove" type="button" onClick={() => this._onFileRemove(index)}>X</button>
                                        </div>
                                    </div>
                                    )
                                })
                        }
                        
                    </div>
                    )

        return (
            
            <div className="app-card">
                <form onSubmit={this._onSubmit}>
                    <div className="app-card-header">
                        <div className="app-card-header-inner">
                            {
                                files.length ? list : null
                            }
                            <div className={classNames('app-file-select-zone', {'error' : _.get(errors, 'files')})} >
                                <label htmlFor='input-file'>
                                    <input id='input-file' type="file" onChange={this._onFileAdded} multiple={true} />
                                    {
                                        files.length ? <span className="app-upload-description text-uppercase">
                                            Add more files</span> : 
                                            <span>
                                                <span className={classNames("app-upload-icon", {'error' : _.get(errors, files)})}><i className="icon-picture-streamline" /></span>
                                                <span className="app-upload-description">
                                                    Drag and Drop your Files Here
                                                </span>
                                                <span className="app-upload-description">
                                                    Or
                                                </span>
                                            </span>
                                    } 
                                </label> 
                            </div>
                            <div className={classNames('app-folder-select-zone', {'error' : _.get(errors, 'files')})} >
                                <label htmlFor='input-folder'>
                                    <span className="app-folder-select-zone-inner">
                                        <span className={classNames("app-upload-icon-2", {'error' : _.get(errors, files)})}><i className="icon-picture-streamline" /></span>
                                        <span className="app-upload-description">Select Folder</span>
                                    </span>
                                    <input id='input-folder' type="file" directory="" webkitdirectory="" onChange={this._onFolderAdded} multiple={true} />    
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="app-card-content">
                        <div className="app-card-content-inner">
                            <div className={classNames("app-form-item", {'error' : _.get(errors, 'to')})}>
                                <label htmlFor="to">Send To</label>
                                <input name="to" value={form.to} onChange={this._onTextChange} type="text" placeholder={_.get(errors, 'to') ? _.get(errors,'to') : "Email Address"} id="to" /> 
                            </div>

                            <div className={classNames("app-form-item", {'error' : _.get(errors, 'from')})}>
                                <label htmlFor="from">From</label>
                                <input name="from" value={form.from} onChange={this._onTextChange} type="text" placeholder={_.get(errors, 'from') ? _.get(errors, 'from') : "Your Email Address"} id="from" /> 
                            </div>

                            <div className="app-form-item">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" value={form.message} onChange={this._onTextChange} placeholder="Add a note (optional)" name="message" />
                            </div>

                            <div className="app-form-actions">
                                <button className="app-button primary" type="submit">Send</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
          
        )
    }
}

HomeForm.propTypes = {
    onUploadBegin : PropTypes.func,
    upload : PropTypes.func
};
