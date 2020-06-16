import axios from 'axios';
import  {apiURL} from '../config';
import _ from 'lodash';

export const upload = (form, pathsOfFiles, callback = () => {}) => {

    const url = `${apiURL}/upload`;

    let files = _.get(form, 'files', []);

    console.log('pathsOfILES from HomeUpload', pathsOfFiles);

    console.log('files : ', files);
    console.log('files.length : ', files.length);
    console.log('pathsOfFiles.length : ', pathsOfFiles.length);

    let data = new FormData();

    _.each(files, (file) => {
        data.append('files', file);
        
    });
  
    data.append('to', _.get(form, 'to'));
    data.append('from', _.get(form, 'from'));
    data.append('message', _.get(form, 'message'));

    _.each(pathsOfFiles, (path) => {
        data.append('pathsOfFiles', path);
        
    });

    console.log('data from Upload component : ', data);

    const config = {

        onUploadProgress : (event) => {

            console.log('UPLOAD EVENT from Upload.js ', event);

            return callback({
                type : 'onUploadProgress',
                payload : event
            })
        }

    }

    console.log('files from Upload component : ', files);

    axios.post(url, data, config).then((response) => {

        //upload success
        return callback({
            type : 'success',
            payload : response.data  //payload contains the data
        })

    }).catch((err) => {
        return callback({
            type : 'error',
            payload : err
        })
    });
}