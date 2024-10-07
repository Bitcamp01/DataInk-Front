// import config from './../config.js';
// import{createAsyncThunk} from '@reduxjs/toolkit';
// // import axios from 'axios';
//
// export function list(path) {
//     return fetch(config.url_list + '?path=' + (encodeURIComponent(path) || '/'));
// };
//
// export function createDirectory(path, directory) {
//     return fetch(config.url_create_folder, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             path, directory
//         })
//     });
// };
//
//
// export function getFileContent(path) {
//     return fetch(config.url_get_content + '?path=' + (encodeURIComponent(path) || '/'));
// };
//
//
//
// export function remove(path, filenames, recursive = true) {
//     return fetch(config.url_remove, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             path, filenames, recursive
//         })
//     });
// };
//
// export function move(path, destination, filenames) {
//     return fetch(config.url_move, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             path, destination, filenames
//         })
//     });
// };
//
// export function rename(path, destination) {
//     return fetch(config.url_rename, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             path, destination
//         })
//     });
// };
//
// export function copy(path, destination, filenames) {
//     return fetch(config.url_copy, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             path, destination, filenames
//         })
//     });
// };
//
//
// export function upload(path, fileList, formData = new FormData()) {
//     [...fileList].forEach(f => {
//         formData.append('file[]', f);
//     });
//     formData.append('path', path);
//
//     return fetch(config.url_upload, {
//         method: 'POST',
//         body: formData,
//         headers: {
//             // a workaround for node connector, passing the path by header
//             path: path
//         }
//     });
// };
import config from './../config.js';
// import{createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios';

export function list(path) {
    // 가짜 데이터를 반환
    return Promise.resolve({
        json: () => Promise.resolve({
            success: true,
            data: [
                { name: "file1.txt", type: "file" },
                { name: "folder1", type: "dir" }
            ]
        }),
        ok: true,
        headers: {
            get: (header) => {
                if (header === 'content-type') return 'application/json';
                return null;
            }
        }
    });
};

export function createDirectory(path, directory) {
    // 가짜 응답 데이터 반환
    return Promise.resolve({
        json: () => Promise.resolve({
            success: true,
            message: 'Directory created successfully'
        }),
        ok: true
    });
};

export function getFileContent(path) {
    // 가짜 파일 내용을 반환
    return Promise.resolve({
        json: () => Promise.resolve({
            success: true,
            content: 'This is the content of the file.'
        }),
        ok: true
    });
};

export function remove(path, filenames, recursive = true) {
    // 가짜 삭제 결과 반환
    return Promise.resolve({
        json: () => Promise.resolve({
            success: true,
            message: 'Files removed successfully'
        }),
        ok: true
    });
};

export function move(path, destination, filenames) {
    // 가짜 파일 이동 결과 반환
    return Promise.resolve({
        json: () => Promise.resolve({
            success: true,
            message: 'Files moved successfully'
        }),
        ok: true
    });
};

export function rename(path, destination) {
    // 가짜 파일 이름 변경 결과 반환
    return Promise.resolve({
        json: () => Promise.resolve({
            success: true,
            message: 'File renamed successfully'
        }),
        ok: true
    });
};

export function copy(path, destination, filenames) {
    // 가짜 파일 복사 결과 반환
    return Promise.resolve({
        json: () => Promise.resolve({
            success: true,
            message: 'Files copied successfully'
        }),
        ok: true
    });
};

export function upload(path, fileList, formData = new FormData()) {
    // 파일 업로드의 가짜 결과 반환
    return Promise.resolve({
        json: () => Promise.resolve({
            success: true,
            message: 'Files uploaded successfully'
        }),
        ok: true
    });
};
