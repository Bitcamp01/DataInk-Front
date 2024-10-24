import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";

const ItemStructure = () => {
    const { itemId } = useParams();
    const [data, setData] = useState({});
    const [rowCnt,setRowCnt] = useState(0);
    const [itemName, setItemName] = useState('');
    const navi=useNavigate();
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
    function transformToFrontendFormat(data) {
        const result = {};
    
        // 재귀적으로 데이터를 변환하는 함수
        function recursiveTransform(fields) {
            const obj = {};
    
            fields.forEach(field => {
                if (field.subFields && field.subFields.length > 0) {
                    // 하위 필드가 있는 경우 재귀적으로 처리
                    obj[field.fieldName] = recursiveTransform(field.subFields);
                } else {
                    // 하위 필드가 없는 경우 빈 문자열로 설정
                    obj[field.fieldName] = "";
                }
            });
    
            return obj;
        }
    
        // 최상위 필드인 fieldName을 무시하고 하위 subFields만 변환
        if (data.subFields && data.subFields.length > 0) {
            return recursiveTransform(data.subFields);
        }
    
        return result;
    }
    const getItem= async ()=>{
        console.log("get item")
        try {
            const response=await axios.get(`http://localhost:9090/projects/item_structure/${itemId}`,{
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                }
            })
            setItemName(response.data.fieldName)
            setData(transformToFrontendFormat(response.data))
        }
        catch(err){

        }
    }
    useEffect(() => {
        console.log(itemId)
        if (itemId == 0) {
            console.log("0 is")
        }
        else{
            getItem()
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
                    onKeyDown={(event) =>{
                        if (event.key === " ") {
                            // 기본 스페이스바 동작을 막음
                            event.preventDefault();

                            // event.target을 사용하여 현재 input 요소에 접근
                            const input = event.target;

                            // 현재 커서 위치에 _를 삽입
                            const start = input.selectionStart;
                            const end = input.selectionEnd;
                            const value = input.value;

                            // _를 삽입하고 커서를 적절한 위치로 이동
                            input.value = value.substring(0, start) + "_" + value.substring(end);
                            input.setSelectionRange(start + 1, start + 1);
                          }
                    }}
                    
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
            console.log(data)
            if (itemId == 0) {
                const payload = {
                    itemName: itemName,
                    data: data,
                };
                console.log('새로운 아이템 생성:', itemId);
                const response = await axios.post("http://localhost:9090/projects/itemcreate",payload,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                    },
                    body: JSON.stringify(payload)
                })
                if (response.status === 200){
                    navi("/main_grid")
                }
                
            } else {
                const payload = {
                    itemId: itemId,
                    itemName: itemName,
                    data: data,
                };
                console.log('아이템 업데이트:', JSON.stringify(data));
                const response = await axios.post("http://localhost:9090/projects/itemupdate",payload,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                    },
                    body: JSON.stringify(payload)
                })
                if (response.status === 200){
                    navi("/main_grid")
                }
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
    