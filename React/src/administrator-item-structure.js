import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


const DynamicTable = () => {
    const [data, setData] = useState({});
    const [rowCnt,setRowCnt] = useState(0);
    const changeTextFiled = (e, path) => {
        const newValue = e.target.value;
        const pathArray = path.split('.');
        const oldKey = pathArray.pop();
        const parentPathArray = pathArray;
        const parentObject = parentPathArray.reduce((obj, key) => obj && obj[key], data);
        if (parentObject && parentObject.hasOwnProperty(oldKey)) {
            const newData = { ...data };
            renameKey(newData, oldKey, newValue, parentPathArray);
            setData(newData);
        }
    };

    const calculateDepth = (obj, depth = 1) => {
        if (typeof obj === 'object' && obj !== null) {
            return Math.max(...Object.values(obj).map(value => calculateDepth(value, depth + 1)));
        }
        return depth;
    };


    const setColspan = () => {
        const maxDepth = Math.max(...Object.keys(data).map(key => calculateDepth(data[key], 1)));
        return maxDepth + 1;
    };
    const renameKey = (obj, oldKey, newKey, pathArray) => {
        const parentObject = pathArray.reduce((obj, key) => obj && obj[key], obj);
        parentObject[newKey] = parentObject[oldKey];
        delete parentObject[oldKey];
    };

    const addRowAtPath = (path) => {
        const parentObject = getObjectFromPath(path);

        if (typeof parentObject !== 'object' || parentObject === null) {
            const parentPath = path.split('.').slice(0, -1).join('.');
            const parent = parentPath ? getObjectFromPath(parentPath) : data;
            const key = path.split('.').pop();
            parent[key] = {};
        }

        const targetObject = getObjectFromPath(path);
        const newKey = `새로운키${Object.keys(targetObject).length + 1}`;
        targetObject[newKey] = "";
        setData({ ...data });
    };

    const removeRowAtPath = (path) => {
        const parentPath = path.split('.').slice(0, -1).join('.');
        const parentObject = parentPath ? getObjectFromPath(parentPath) : data;
        const keyToDelete = path.split('.').pop();

        if (parentObject && parentObject.hasOwnProperty(keyToDelete)) {
            delete parentObject[keyToDelete];
        }
        setData({ ...data });
    };

    const addRow = (inputField = null) => {
        setRowCnt(rowCnt+1)
        const newKey = `새로운키${rowCnt}`;
        setData((data) => ({
            ...data,
            [newKey]: ""
        }));
    };

    const getObjectFromPath = (path) => {
        return path.split('.').reduce((obj, key) => obj && obj[key], data);
    };

    const createInputField = (value = '', path) => {
        return (
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    value={value}
                    onChange={(e) => changeTextFiled(e, path)}
                />
                <button className="btn btn-outline-success btn-sm" onClick={() => addRowAtPath(path)}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => removeRowAtPath(path)}>
                    <FontAwesomeIcon icon={faMinus} />
                </button>
            </div>
        );
    };

    const renderTable = () => {
        const tableBody = Object.keys(data).map((key) => (
            <tr key={key}>
                <td>{createInputField(key, key)}</td>
                <td>
                    {typeof data[key] === 'object' && data[key] !== null ? (
                        createNestedTable(data[key], key)
                    ) : (
                        <></>
                    )}
                </td>
            </tr>
        ));
        return tableBody;
    };

    const createNestedTable = (obj, parentPath) => {
        return Object.keys(obj).map((key) => (
            <tr key={parentPath + '.' + key}>
                <td>{createInputField(key, `${parentPath}.${key}`)}</td>
                <td>
                    {typeof obj[key] === 'object' && obj[key] !== null ? (
                        createNestedTable(obj[key], `${parentPath}.${key}`)
                    ) : null}
                </td>
            </tr>
        ));
    };

    return (
        <div className="container mt-5">
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th colSpan={setColspan()}>분류명</th>
                </tr>
                </thead>
                <tbody>{renderTable()}</tbody>
                <tfoot>
                <tr>
                    <td className="text-center" colSpan={setColspan()}>
                        <button className="btn btn-success btn-sm" onClick={addRow}>
                            <FontAwesomeIcon icon={faPlus} /> 추가
                        </button>
                    </td>
                </tr>
                </tfoot>
            </table>
            <button className="btn btn-success btn-sm" onClick={() => console.log(data)}>
                저장
            </button>
        </div>
    );
};

export default DynamicTable;
