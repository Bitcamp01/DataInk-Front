import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveLabelTask} from '../apis/labelDetailApis';
import { useDispatch } from 'react-redux';
import '../css/reviewer.css';

// const LabelSelectForm = ({ taskId , transformedData}) => {
const LabelSelectForm = ({ taskId , transformedData}) => {
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수
    const dispatch = useDispatch();


    const handlePrevClick = () => {
        navigate('/label/detail');
    };
    const handleSubmit = () => {
        // tasks의 fieldValue에 넣는 apis로
        const userConfirmed = window.confirm('저장하시겠습니까?');
        if (userConfirmed) {
            dispatch(saveLabelTask({
                taskId: taskId,
                transformedData: transformedData, // 저장할 데이터 전달
            }))
            .then((result) => {
                if (saveLabelTask.fulfilled.match(result)) {
                    alert('저장이 완료되었습니다.');
                    navigate('/label/work');
                } else {
                    alert('저장에 실패했습니다.');
                }
            });
        }
    };

    return (
        <>
            {/* form-container 밖으로 submit-container 이동 */}
            <div className="review-submit-container" style={{padding:'1rem'}}>
                <button
                    className="prev-button"
                    onClick={handlePrevClick} // 반려 버튼 클릭 시 동작
                    style={{ visibility: 'hidden' }} // 버튼을 보이지 않게 하되 자리 차지
                >
                    이전
                </button>
                <button
                    className="next-button"
                    onClick={handleSubmit} // 반려 버튼 클릭 시 동작
                >
                    완료
                </button>
            </div>
        </>
    );
};

export default LabelSelectForm;