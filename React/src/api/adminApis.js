import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from './../config.js';

// 파일 목록 가져오기
export const listFiles = createAsyncThunk(
    'fileManager/listFiles',
    async (path, { rejectWithValue }) => {
        try {
            const response = await axios.get(config.url_list, {
                params: {
                    path: encodeURIComponent(path) || '/'
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 디렉토리 생성
export const createDirectory = createAsyncThunk(
    'fileManager/createDirectory',
    async ({ path, directory }, { rejectWithValue }) => {
        try {
            const response = await axios.post(config.url_create_folder, {
                path,
                directory
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 파일 내용 가져오기
export const getFileContent = createAsyncThunk(
    'fileManager/getFileContent',
    async (path, { rejectWithValue }) => {
        try {
            const response = await axios.get(config.url_get_content, {
                params: {
                    path: encodeURIComponent(path) || '/'
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 파일 또는 폴더 삭제
export const removeFiles = createAsyncThunk(
    'fileManager/removeFiles',
    async ({ path, filenames, recursive = true }, { rejectWithValue }) => {
        try {
            const response = await axios.post(config.url_remove, {
                path,
                filenames,
                recursive
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 파일 이동
export const moveFiles = createAsyncThunk(
    'fileManager/moveFiles',
    async ({ path, destination, filenames }, { rejectWithValue }) => {
        try {
            const response = await axios.post(config.url_move, {
                path,
                destination,
                filenames
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 파일 이름 변경
export const renameFile = createAsyncThunk(
    'fileManager/renameFile',
    async ({ path, newPath }, { rejectWithValue }) => {
        try {
            const response = await axios.post(config.url_rename, {
                path,
                destination: newPath
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 파일 복사
export const copyFiles = createAsyncThunk(
    'fileManager/copyFiles',
    async ({ path, destination, filenames }, { rejectWithValue }) => {
        try {
            const response = await axios.post(config.url_copy, {
                path,
                destination,
                filenames
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 파일 업로드
export const uploadFiles = createAsyncThunk(
    'fileManager/uploadFiles',
    async ({ path, fileList }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            [...fileList].forEach(f => {
                formData.append('file[]', f);
            });
            formData.append('path', path);

            const response = await axios.post(config.url_upload, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    path: path
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
