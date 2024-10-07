import config from './../config.js';
import{createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios';

export function list(path) {
    return fetch(config.url_list + '?path=' + (encodeURIComponent(path) || '/'));
};

export function createDirectory(path, directory) {
    return fetch(config.url_create_folder, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            path, directory
        })
    });
};


export function getFileContent(path) {
    return fetch(config.url_get_content + '?path=' + (encodeURIComponent(path) || '/'));
};



export function remove(path, filenames, recursive = true) {
    return fetch(config.url_remove, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            path, filenames, recursive
        })
    });
};

export function move(path, destination, filenames) {
    return fetch(config.url_move, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            path, destination, filenames
        })
    });
};

export function rename(path, destination) {
    return fetch(config.url_rename, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            path, destination
        })
    });
};

export function copy(path, destination, filenames) {
    return fetch(config.url_copy, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            path, destination, filenames
        })
    });
};


export function upload(path, fileList, formData = new FormData()) {
    [...fileList].forEach(f => {
        formData.append('file[]', f);
    });
    formData.append('path', path);

    return fetch(config.url_upload, {
        method: 'POST',
        body: formData,
        headers: {
            // a workaround for node connector, passing the path by header
            path: path
        }
    });
};
