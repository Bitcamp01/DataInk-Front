import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ItemStructure = () => {
    const { itemId } = useParams();
    const [data, setData] = useState([]);
    const [itemName, setItemName] = useState('');
    const [rowCnt,setRowCnt] = useState(0);
    const navi = useNavigate();

    // 서버에서 데이터 가져오기
    const getItem = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/projects/item_structure/${itemId}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                }
            });
            setItemName(response.data.fieldName);
            setData(transformToFrontendFormat(response.data.subFields));
        } catch (err) {
            console.error("Error fetching item:", err);
        }
    };

    useEffect(() => {
        if (itemId !== 0) {
            getItem();
        }
    }, [itemId]);
    function arrayToObject(array) {
        const result = {};
        array.forEach(item => {
            if (item.subFields && item.subFields.length > 0) {
                result[item.fieldName] = arrayToObject(item.subFields);
            } else {
                result[item.fieldName] = "";
            }
        });
        return result;
    }
    function objectToArray(obj) {
        const result = [];
        for (let key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                result.push({
                    fieldName: key,
                    subFields: objectToArray(obj[key])
                });
            } else {
                result.push({
                    fieldName: key,
                    subFields: []
                });
            }
        }
        return result;
    }
    // 데이터를 프론트엔드용 포맷으로 변환하는 함수
    const transformToFrontendFormat = (subFields) => {
        if (!subFields) return [];
        return subFields.map(field => ({
            fieldName: field.fieldName,
            subFields: transformToFrontendFormat(field.subFields),
        }));
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
    // 행 추가하기
    const addRowAtPath = (path) => {
        const updatedData = [...data];
        let target = updatedData;

        path.forEach(index => {
            target = target[index].subFields;
        });

        target.push({
            fieldName: `새로운키${target.length + 1}`,
            subFields: []
        });

        setData(updatedData);
    };

    // 행 삭제하기
    const removeRowAtPath = (path) => {
        const updatedData = [...data];
        let target = updatedData;

        path.forEach((index, i) => {
            if (i === path.length - 1) {
                target.splice(index, 1);
            } else {
                target = target[index].subFields;
            }
        });

        setData(updatedData);
    };

    // 입력 필드 변경 핸들러
    const changeTextField = (e, path) => {
        const updatedData = [...data];
        let target = updatedData;

        path.forEach((index, i) => {
            if (i === path.length - 1) {
                target[index].fieldName = e.target.value;
            } else {
                target = target[index].subFields;
            }
        });

        setData(updatedData);
    };

    // 테이블 렌더링 함수
    const renderTable = (fields, path = []) => {
        return fields.map((field, index) => {
            const currentPath = [...path, index];
            return (
                <React.Fragment key={currentPath.join('-')}>
                    <tr>
                        <td>
                            {createInputField(field.fieldName, currentPath)}
                        </td>
                        <td>
                            {field.subFields && field.subFields.length > 0 && (
                                    <tr>{renderTable(field.subFields, currentPath)}</tr>
                            )}
                        </td>
                    </tr>
                </React.Fragment>
            );
        });
    };

    // 입력 필드 생성 함수
    const createInputField = (value, path) => (
        <div className="input-group">
            <input
                type="text"
                className="form-control"
                value={value}
                onChange={(e) => changeTextField(e, path)}
            />
            <button className="btn btn-outline-success btn-sm" onClick={() => addRowAtPath(path)}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
            <button className="btn btn-outline-danger btn-sm" onClick={() => removeRowAtPath(path)}>
                <FontAwesomeIcon icon={faMinus} />
            </button>
        </div>
    );

    // 데이터 저장 핸들러
    const handleSave = async () => {
        try {
            console.log(data)
            if (itemId == 0) {
                const payload = {
                    itemName: itemName,
                    data: arrayToObject(data),
                };
                console.log('새로운 아이템 생성:', itemId);
                const response = await axios.post(`${API_BASE_URL}/projects/itemcreate`,payload,{
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
                    data: arrayToObject(data),
                };
                console.log('아이템 업데이트:', JSON.stringify(data));
                const response = await axios.post(`${API_BASE_URL}/projects/itemupdate`,payload,{
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
                <tbody>{renderTable(data)}</tbody>
                <tfoot>
                    <tr>
                        <td className="text-center" colSpan={setColspan()}>
                            <button className="btn btn-success btn-sm" onClick={() => addRowAtPath([])}>
                                <FontAwesomeIcon icon={faPlus} /> 추가
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
