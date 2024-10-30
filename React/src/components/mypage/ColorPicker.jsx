import React, { useState } from 'react';
import styled from 'styled-components';

// 색상 버튼 스타일 정의
const ColorButton = styled.button`
    background-color: ${props => props.color};
    border: ${props => (props.isHovered ? '2px solid lightgrey' : props.selected ? '2px solid #666' : 'none')}; 
    border-radius: 50%; /* 동그라미 모양 */
    width: 30px;
    height: 30px;
    margin: 5px 5px;
    cursor: pointer;
`;

// 사용자화 색상 버튼
const CustomButton = styled.button`
    background-color: ${props => props.color};
    border: ${props => props.isHovered ? '1px solid lightgray' : props.selected ? '1px solid #666' : '1px solid #777'};
    color: black; /* 텍스트 색상 */
    border-radius: 2px; /* 네모난 모양 */
    padding: 7px 14px;
    cursor: pointer;
    margin-left: 10px;
`;

// 팔레트 안에서
const InputFieldContainer = styled.div`
    display: flex;
    justify-content: center; /* 수평 중앙 정렬 */
`;

// 사용자 정의 색상 팔레트 스타일
const UserColorContainer = styled.div`
    display: flex;
    margin-top: 10px; /* 간격 추가 */
    flex-wrap: wrap; /* 줄 바꿈 가능 */
    justify-content: center;
`;

// 색상 컨테이너
const ColorInputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-top: 20px;
    margin-bottom: 10px;
    justify-content: center;
`;

// 팔레트의 위치를 고정하기 위해 스타일 추가
const PaletteContainer = styled.div`
    position: absolute;
    width: 300px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: -56px;
    margin-right: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    z-index: 1000; /* 다른 요소 위에 나타나도록 */
`;

// 모든 모달버튼 나오게할때
const ModalButton = styled.button`
    background-color: #7785BE;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 10px 20px;
    font-size: 14px;
    margin: 10px;
    transition: background-color 0.3s ease;
    width: 100px;
    &:hover {
        background-color: #535db1;
    }
`;

// 색상 선택기 컴포넌트
const ColorPicker = ({ color, setColor, customColor, setCustomColor }) => {
    const [showPalette, setShowPalette] = useState(false);
    const [hoveredColor, setHoveredColor] = useState(''); // 호버된 색상 추적

    const colorOptions = [
        { name: "빨간색", value: "#FFB3B3" },
        { name: "주황색", value: "#FFD9B3" },
        { name: "노란색", value: "#FFFFB3" },
        { name: "초록색", value: "#B3FFB3" },
        { name: "파란색", value: "#B3D9FF" },
        { name: "보라색", value: "#D9B3FF" },
    ];

    // 팔레트에서 색상 선택을 확정하는 함수
    const paletteConfirm = () => {
        setCustomColor(color); // 선택한 색상으로 사용자화 색상 설정
        setShowPalette(false); // 팔레트 닫기
    };

    // 팔레트에서 색상 선택을 취소하는 함수
    const paletteCancel = () => {
        setCustomColor('');
        setShowPalette(false); // 변경 없이 팔레트 닫기
    };

    const togglePalette = () => {
        setShowPalette(!showPalette);
    };

    return (
        <ColorInputContainer>
            <label style={{ marginRight: '10px' }}> 색상: </label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {colorOptions.map(option => (
                    <ColorButton
                        key={option.value}
                        color={option.value}
                        selected={color === option.value} // 선택된 색상일 때 테두리 검은색
                        isHovered={hoveredColor === option.value} // 호버된 색상일 때 테두리 회색
                        onClick={() => setColor(option.value)} // 색상 선택 시 상태 업데이트
                        onMouseEnter={() => setHoveredColor(option.value)} // 마우스 호버 시작
                        onMouseLeave={() => setHoveredColor('')} // 마우스 호버 끝
                    />
                ))}
                {/* 사용자화 버튼 */}
                <CustomButton
                    color={customColor || 'transparent'} // 선택한 색상이 없으면 투명
                    selected={color === customColor && customColor !== ''} // 사용자화 색상이 선택된 경우에만 테두리 검정
                    isHovered={hoveredColor === 'custom'} // 사용자화 버튼에 호버 효과 추가
                    onMouseEnter={() => setHoveredColor('custom')} // 사용자화 버튼에 마우스 호버 시작
                    onMouseLeave={() => setHoveredColor('')} // 사용자화 버튼에 마우스 호버 끝
                    onClick={togglePalette}
                >
                    사용자화
                </CustomButton>
            </div>
            {showPalette && (
                <PaletteContainer>
                    <InputFieldContainer>
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        style={{ marginBottom: '10px', border: 'none', width: '315px', height: '40px' }} // 색상 선택기 스타일
                    />
                    </InputFieldContainer>
                    {/* 추가 색상 버튼 */}
                    <UserColorContainer>
                        <ColorButton color="#FF0000" onClick={() => setColor('#FF0000')} />
                        <ColorButton color="#FF5733" onClick={() => setColor('#FF5733')} />
                        <ColorButton color="#FFA500" onClick={() => setColor('#FFA500')} />
                        <ColorButton color="#FFB833" onClick={() => setColor('#FFB833')} />
                        <ColorButton color="#FFD133" onClick={() => setColor('#FFD133')} />
                        <ColorButton color="#FFFF00" onClick={() => setColor('#FFFF00')} />
                        <ColorButton color="#FFE4B5" onClick={() => setColor('#FFE4B5')} />
                        <ColorButton color="#F0E68C" onClick={() => setColor('#F0E68C')} />
                        <ColorButton color="#D4FF33" onClick={() => setColor('#D4FF33')} />
                        <ColorButton color="#ADFF2F" onClick={() => setColor('#ADFF2F')} />
                        <ColorButton color="#73FF33" onClick={() => setColor('#73FF33')} />
                        <ColorButton color="#33FF57" onClick={() => setColor('#33FF57')} />
                        <ColorButton color="#33FF9D" onClick={() => setColor('#33FF9D')} />
                        <ColorButton color="#008000" onClick={() => setColor('#008000')} />
                        <ColorButton color="#00CED1" onClick={() => setColor('#00CED1')} />
                        <ColorButton color="#33D7FF" onClick={() => setColor('#33D7FF')} />
                        <ColorButton color="#3373FF" onClick={() => setColor('#3373FF')} />
                        <ColorButton color="#0000FF" onClick={() => setColor('#0000FF')} />
                        <ColorButton color="#7D33FF" onClick={() => setColor('#7D33FF')} />
                        <ColorButton color="#FFC0CB" onClick={() => setColor('#FFC0CB')} />
                        <ColorButton color="#FFD1DC" onClick={() => setColor('#FFD1DC')} />
                        <ColorButton color="#FFCCCB" onClick={() => setColor('#FFCCCB')} />
                        <ColorButton color="#FF33E6" onClick={() => setColor('#FF33E6')} />
                        <ColorButton color="#800080" onClick={() => setColor('#800080')} />
                    </UserColorContainer>
                    <UserColorContainer>
                        <ModalButton onClick={paletteConfirm}>확인</ModalButton>
                        <ModalButton onClick={paletteCancel}>취소</ModalButton>
                    </UserColorContainer>
                </PaletteContainer>
            )}
        </ColorInputContainer>
    );
};

export default ColorPicker;