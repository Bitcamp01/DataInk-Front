import React, { useState, useEffect } from 'react';
import '../../css/custom-dropdown.css'; // CSS 파일 연결

const CustomDropdown = ({ label, options = [], name, value, onChange, disabled }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isActive, setIsActive] = useState(false);

  // 부모에서 전달된 value가 변경되었을 때 selectedOption을 업데이트
  useEffect(() => {
    const foundOption = options.find(option => option.value === value);
    setSelectedOption(foundOption || null);
  }, [value, options]);  // value 또는 options가 변경될 때마다 실행

  // 드롭다운 열고 닫기
  const handleSelectClick = () => {
    if (!disabled) {
      setIsActive(!isActive);
    }
  };

  // 옵션 클릭 시 선택된 값을 부모로 전달
  const handleOptionClick = (option) => {
    setSelectedOption(option); // 내부 상태 업데이트
    setIsActive(false);
    onChange(option.value);    // 부모 컴포넌트로 선택된 값 전달
  };

  return (
    <div className={`custom-dropdown ${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`}>
      <div
        className={`custom-dropdown__selected ${isActive ? 'rotated' : ''}`} // isActive에 따라 class 추가
        onClick={handleSelectClick}
      >
        {selectedOption ? selectedOption.label : label}
      </div>
      <ul className={`custom-dropdown__options ${isActive ? 'visible' : ''}`}>
        {options.length > 0 ? options.map((option, index) => (
          <li
            className="custom-dropdown__option"
            key={index}
            data-value={option.value}
            onClick={() => handleOptionClick(option)}
          >
            <input
              type="radio"
              name={name}
              className="custom-dropdown__radio"
              id={`custom-dropdown-${option.value}`}
              checked={value === option.value}
              readOnly
            />
            <label
              className="custom-dropdown__label"
              htmlFor={`custom-dropdown-${option.value}`}
            >
              {option.label}
            </label>
          </li>
        )) : <li className="custom-dropdown__option">옵션이 없습니다</li>}
      </ul>
    </div>
  );
};

export default CustomDropdown;
