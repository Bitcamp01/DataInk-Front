import React from 'react';

const SelectForm = () => {
    return (
        <div className="form-container">
            <h4>변경 사유 (여러 사유 선택)</h4>
            <div className="boxes">
                <div className="checkboxes">
                    <label><input type="checkbox" /> 오타</label>
                    <label><input type="checkbox" /> 내용 부족</label>
                    <label><input type="checkbox" /> 내용 불일치</label>
                    <label><input type="checkbox" /> 관리자 별도 입력</label>
                </div>
                <div className="detailboxes">
                    <label><textarea cols="30" rows="5"></textarea></label>
                </div>
            </div>
            <div className="submit-container">
                <button className="reject-button">반려</button>
                <button className="apply-button">승인</button>
            </div>
        </div>
    );
};

export default SelectForm;
