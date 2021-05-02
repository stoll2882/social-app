import React from 'react';

function getAppApiUrl() {
    if(window.location.host.indexOf("localhost") != -1) {
        return 'http://localhost:3009';
    } else {
        return '';
    }
}

export { getAppApiUrl};

