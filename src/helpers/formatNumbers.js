import React from 'react';
import _ from 'lodash';

const KB = 1024;
const MB = KB * KB;
const TB = KB * KB * KB;

export const formatNumbers = (input, round = true) => {

    if(input > KB && input < MB) {
        return `${_.round(input/KB)}KB`;
    } else {
        return `${_.round(input/KB)}KB`;
    }
    if (input > MB) {
        return `${_.round(input/MB)}MB`;
    }
    
}

