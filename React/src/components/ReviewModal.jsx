import React, { useState } from 'react';
import '../css/memberManagement.css';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import '../css/reviewer.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // dispatch 추가
import { submitForReview , approveLabelTask } from '../apis/labelTaskApis'; // Thunk import
import axios from 'axios';

const ReviewModal = ({ isOpen, onClose, taskId, transformedData }) => {
    // 환경 변수에서 API URL 가져오기
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const dispatch = useDispatch(); // dispatch 초기화
    const [feedback, setFeedback] = useState('');

    if (!isOpen) return null;

    const handleApplyClick = async () => {
        try {
            // 승인 API 호출
            // const response = await axios.patch('http://localhost:3000/labeltask/approve', {
            //     taskId: taskId, // 필요한 데이터
            //     comment: feedback // textarea의 내용
            // });
            // // const response = await dispatch(submitForReview({ taskId, fieldId, comment: feedback }));

            // if (response.meta.requestStatus === 'fulfilled') {
            //     alert('승인되었습니다.');
            //     navigate('/label/work'); // 승인 후 이동
            // } else {
            //     alert('승인 중 오류가 발생했습니다.');
            // }
            const result = await dispatch(approveLabelTask({ taskId, comment: feedback , transformedData })); // fieldId 포함

            if (approveLabelTask.fulfilled.match(result)) { // 승인 성공 확인
                alert('승인되었습니다.');
                navigate('/label/work');
            } else {
                alert('승인 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('승인 요청 중 오류:', error);
            alert('승인 요청 중 문제가 발생했습니다.');
        }
    };

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleCloseClick = () => {
        const confirmLeave = window.confirm("저장되지 않는데 계속하겠습니까?");
        if (confirmLeave) {
            navigate('/label/work');
        } else {
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div
                className="modal-content"
                style={{ // 이거 씹혀서 일부러 인라인으로 만듦
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    width: '750px',
                    maxWidth: '90%', // 화면이 너무 작을 경우 최대 90% 너비 제한
                }}
            >
                <div className="modal-header">
                    <h3></h3>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseClick}
                        sx={{
                            position: 'relative',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className="profile-section">
                    <img 
                    // src={${process.env.PUBLIC_URL}/images/profile_img.png} alt="Profile" className="review-profile-image"
                    />
                    <div className="profile-details">
                        <p style={{ margin: '0 0 1rem 0' }}>
                            <strong className="modal-labelingname">작업</strong>승인 코멘트를 적어주세요
                        </p>
                        {/* <p style={{ margin: '0.5rem 0' }}>AI Clova | 인턴 (라벨러)</p>
                        <p style={{ margin: '0.5rem 0' }}>참여중인 작업: 5건</p>
                        <p style={{ margin: '0.5rem 0' }}>완료한 작업: 12503건</p> */}
                    </div>
                </div>
                <div className="report-section">
                    {/* <h4 style={{ color: '#7C97FE', margin: '0.5rem 0' }}>작업 특이사항</h4>
                    <p style={{ margin: '0.5rem 0' }}>페이지 수: 5 페이지</p>
                    <p style={{ margin: '0.5rem 0' }}>작업 소요시간: 0.38시간</p>
                    <p style={{ margin: '0.5rem 0' }}>반려 횟수: 0회</p> */}
                    <textarea 
                        placeholder="특이사항을 입력하세요" 
                        rows="5" 
                        className="feedbackarea"
                        style={{ resize: 'none' }}
                        value={feedback}
                        onChange={handleFeedbackChange}
                    ></textarea>
                </div>
                <div className="modal-footer">
                    <button className="approve-button" onClick={handleApplyClick}>승인</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
