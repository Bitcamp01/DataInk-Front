import styled from 'styled-components';

const CommonButton = styled.button`
    background-color: ${({ bgColor }) => bgColor || '#7C97FE'}; /* 기본 배경색 또는 props로 받은 배경색 */
    color: ${({ color }) => color || 'white'}; /* 기본 텍스트 색상 또는 props로 받은 텍스트 색상 */
    font-weight: bold;
    padding: ${({ padding }) => padding || '10px'};
    border: none;
    border-radius: ${({ borderRadius }) => borderRadius || '5px'};
    cursor: pointer;
    width: ${({ width }) => width || '130px'}; /* 기본 너비 또는 props로 받은 너비 */
    height: ${({ height }) => height || '41px'}; /* 기본 높이 또는 props로 받은 높이 */
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ hoverBgColor }) => hoverBgColor || '#5b6eba'}; /* 기본 hover 배경색 또는 props */
        color: ${({ hoverColor }) => hoverColor || 'white'}; /* 기본 hover 텍스트 색상 또는 props */
    }

    &:disabled {
        background-color: #ccc; /* 비활성화 상태 색상 */
        cursor: not-allowed;
    }
`;

export default CommonButton;
