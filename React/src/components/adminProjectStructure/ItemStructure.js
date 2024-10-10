import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {useParams} from "react-router-dom";

const ItemStructure = () => {
    const { itemId } = useParams();
    const [data, setData] = useState({});
    const [rowCnt,setRowCnt] = useState(0);
    const [itemName, setItemName] = useState('');
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
    useEffect(() => {
        if (itemId) {
            // 서버나 상태에서 해당 itemId를 기반으로 데이터를 가져오기
            // 여기서는 예시로 더미 데이터를 사용
            const fetchedItem = {
                id: itemId,
                label: `항목 ${itemId}`,
                details: '이것은 항목의 세부 정보입니다.'
            };
            setData(fetchedItem);
        }
    }, [itemId]);
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
    const handleSave = async () => {
        try {
            if (itemId) {
                // 기존 아이템 업데이트 로직 (서버로 PUT 요청 등)
                console.log('아이템 업데이트:', itemId);
            } else {
                // 새로운 아이템 생성 로직 (서버로 POST 요청 등)
                console.log('새로운 아이템 생성:', itemId);
                const response = await axios.post("http://localhost:9090/item/create",data,{
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                    }
                })

            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };
    return (
        <div className="container mt-5">
            <div className="mb-3">
                <label htmlFor="itemName" className="form-label">항목 이름</label>
                <input
                    type="text"
                    className="form-control"
                    id="itemName"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="항목 이름을 입력하세요"
                />
            </div>
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
                            <FontAwesomeIcon icon={faPlus}/> 추가
                        </button>
                    </td>
                </tr>
                </tfoot>
            </table>
            <button className="btn btn-success btn-sm" onClick={handleSave}>
                저장
            </button>
        </div>
    );
};

export default ItemStructure;
    