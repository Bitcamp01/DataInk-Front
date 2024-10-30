// import React, { useState} from 'react';
// import Modal from 'react-modal';
// import styled from 'styled-components';
// import ColorPicker from './ColorPicker'
// import { useDispatch } from 'react-redux';
// import { addCalendar } from '../../apis/mypageApis';

// // 캘린더 모달 스타일
// const calendarModalStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)',
//         padding: '30px',
//         width: '500px',
//         height:'340px',
//         borderRadius: '10px',
//         border: 'none',
//         boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
//         backgroundColor: '#ffffff',
//     },
//     overlay: {
//         zIndex: 1000,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
// };

// // 모달 이름
// const ModalTitle = styled.h2`
//     font-size: 24px;
//     font-weight: bold;
//     color: #333;
//     margin-bottom: 20px;
// `;

// // 모달안에 버튼컨테이너
// const ButtonContainer = styled.div`
//     display: flex;
//     margin-top: 40px;
//     justify-content: flex-end;
// `;

// // 모든 모달버튼 나오게할때
// const ModalButton = styled.button`
//     background-color: #7785BE;
//     color: white;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//     padding: 10px 20px;
//     font-size: 14px;
//     margin: 10px;
//     transition: background-color 0.3s ease;
//     width: 100px;
//     &:hover {
//         background-color: #535db1;
//     }
// `;

// // 인풋필드
// const InputField = styled.input`
//     width: 100%;
//     padding: 10px;
//     border: 1px solid #ddd;
//     border-radius: 4px;
//     margin-bottom: 15px;
//     margin-top: 10px;
//     font-size: 14px;
// `;

// const CalendarAddModal = ({ isOpen, onRequestClose, calendarOptions, setCalendarOptions, closeAddCalendarModal}) => {
//     const dispatch = useDispatch();
//     const [calendarName, setCalendarName] = useState('');
//     const [color, setColor] = useState('');
//     const [customColor, setCustomColor] = useState('');

//     // 캘린더 추가 핸들러
//     const handleAddCalendar = () => {
//         if (calendarName && color) {
//             dispatch(addCalendar({ calendarName, color }))
//                 .unwrap()
//                 .then((newCalendar) => {
//                     setCalendarOptions([...calendarOptions, newCalendar]);
//                     onRequestClose();
//                 })
//                 .catch((error) => {
//                     console.error("캘린더 추가 에러:", error);
//                     closeAddCalendarModal();
//                 })
//         } else {
//             alert('캘린더 이름과 색상을 입력해야 합니다.');
//         }
//     };

//     return (
//         <Modal isOpen={isOpen} onRequestClose={closeAddCalendarModal} style={calendarModalStyles}>
//             <ModalTitle style={{ marginBottom: '20px' }}> 캘린더 추가</ModalTitle>
//             <label style={{ marginBottom: '10px' }}>
//                 새 캘린더 이름:
//                 <InputField
//                     type="text"
//                     name="calendarName"
//                     value={calendarName}
//                     onChange={(e) => setCalendarName(e.target.value)}
//                 />
//             </label>
//             <ColorPicker color={color} setColor={setColor} customColor={customColor} setCustomColor={setCustomColor} />
//             <ButtonContainer>
//                 <ModalButton onClick={handleAddCalendar}>추가</ModalButton>
//                 <ModalButton onClick={closeAddCalendarModal}>취소</ModalButton>
//             </ButtonContainer>
//         </Modal>
    
//     );
// };

// export default CalendarAddModal;