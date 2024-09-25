import React, { useState } from 'react';
import '../css/custom-dropdown.css'; // CSS 파일 연결

const CustomDropdown = ({ label, options, name }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const handleSelectClick = () => {
    setIsActive(!isActive);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsActive(false);
  };

  return (
    <div className={`custom-dropdown ${isActive ? 'active' : ''}`}>
      <div className="custom-dropdown__selected" onClick={handleSelectClick}>
        {selectedOption ? selectedOption.label : label}
      </div>
      <ul className="custom-dropdown__options">
        {options.map((option, index) => (
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
              checked={selectedOption?.value === option.value}
              readOnly
            />
            <label
              className="custom-dropdown__label"
              htmlFor={`custom-dropdown-${option.value}`}
            >
              {option.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomDropdown;