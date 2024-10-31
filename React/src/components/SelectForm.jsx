import React, { useState } from 'react';
import ReviewModal from './ReviewModal';
import { useNavigate } from 'react-router-dom';
import '../css/reviewer.css';
import { useDispatch , useSelector} from 'react-redux';
import { rejectLabelTask, adminLabelTask } from '../apis/labelTaskApis';

const SelectForm = ({ taskId , transformedData}) => { // taskId를 props로 받도록 수정
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdminInputChecked, setIsAdminInputChecked] = useState(false);
    const [selectedReasons, setSelectedReasons] = useState([]);
    const [textareaContent, setTextareaContent] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const authen = useSelector((state) => state.users.authen);

    const handleApproveClick = () => {
        if (authen === 'ROLE_ADMIN') { // **여기 수정이요**
            dispatch(adminLabelTask({
                taskId: taskId,
                transformedData: transformedData, // 반려할 데이터 전달
            }))
            .then((result) => {
                if (adminLabelTask.fulfilled.match(result)) {
                    alert('승인이 완료되었습니다.');
                    navigate('/label/work');
                } else {
                    alert('승인에 실패했습니다.');
                }
            });
        } else {
            // **일반 사용자일 경우 모달 열기**
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAdminInputChange = (e) => {
        setIsAdminInputChecked(e.target.checked);
    };

    const handleCheckboxChange = (reason) => {
        setSelectedReasons(prevState => {
            if (prevState.includes(reason)) {
                return prevState.filter(item => item !== reason);
            } else {
                return [...prevState, reason];
            }
        });
    };

    const handleTextareaChange = (e) => {
        setTextareaContent(e.target.value);
    };

    // const getFinalSubmission = () => {
    //     const submissionReasons = selectedReasons.join(', ');
    //     return textareaContent ? `${submissionReasons} ${textareaContent}`.trim() : submissionReasons;
    // };
    const getFinalSubmission = () => {
        const submissionReasons = selectedReasons.join(', ');
        return textareaContent ? `${submissionReasons} ${textareaContent.trim()}` : submissionReasons;
    };

    const handleRejectClick = () => {
        const userConfirmed = window.confirm('반려시키시겠습니까?');
        if (userConfirmed) {
            dispatch(rejectLabelTask({
                taskId: taskId,
                rejectionReason: getFinalSubmission(),
                transformedData: transformedData, // 반려할 데이터 전달
            }))
            .then((result) => {
                if (rejectLabelTask.fulfilled.match(result)) {
                    alert('반려가 완료되었습니다.');
                    navigate('/label/work');
                } else {
                    alert('반려에 실패했습니다.');
                }
            });
        }
    };

    return (
        <>
            <div className="form-container">
                <span className="nh4">변경 사유</span><span className="nexttoh4">(여러 사유 선택)</span>
                <div className="boxes">
                    <div className="checkboxes">
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('오타')}
                                checked={selectedReasons.includes('오타')}
                            />
                            오타
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('내용 부족')}
                                checked={selectedReasons.includes('내용 부족')}
                            />
                            내용 부족
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('내용 불일치')}
                                checked={selectedReasons.includes('내용 불일치')}
                            />
                            내용 불일치
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('기타')}
                                checked={selectedReasons.includes('기타')}
                            />
                            기타
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={handleAdminInputChange}
                            />
                            관리자 별도 입력
                        </label>
                    </div>
                    <div className="detailboxes">
                        <label>
                            <textarea
                                cols="60"
                                rows="5"
                                disabled={!isAdminInputChecked}
                                value={textareaContent}
                                onChange={handleTextareaChange}
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div className="review-submit-container">
                <button
                    className="reject-button"
                    onClick={handleRejectClick}
                >
                    반려
                </button>
                <button
                    className="apply-button"
                    onClick={handleApproveClick}
                    disabled={selectedReasons.length > 0}
                >
                    승인
                </button>
            </div>

            <ReviewModal isOpen={isModalOpen} onClose={handleCloseModal} taskId={taskId} transformedData={transformedData}/>
        </>
    );
};

export default SelectForm;
