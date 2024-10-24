// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
// import styled from 'styled-components';
// import ColorPicker from './ColorPicker';
// import { useDispatch } from 'react-redux';
// import { updateCalendar, deleteCalendar } from '../../apis/mypageApis';

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

// const CalendarEditModal = ({ isOpen, onRequestClose, selectedCalendar, calendarOptions, setCalendarOptions, closeEditCalendarModal}) => {
//     const dispatch = useDispatch();
//     const [calendarName, setCalendarName] = useState('');
//     const [color, setColor] = useState('');
//     const [customColor, setCustomColor] = useState('');

//     useEffect(() => {
//         if (selectedCalendar) {
//             setCalendarName(selectedCalendar.calendarName);
//             setColor(selectedCalendar.color);
//             setCustomColor(selectedCalendar.customColor || selectedCalendar.color);
//         }
//     }, [selectedCalendar]);

//     // 캘린더 수정 핸들러
//     const handleUpdateCalendar = () => {
//         if (selectedCalendar) {
//             console.log("Updating calendar:", selectedCalendar);
//             if (!selectedCalendar.id) {
//                 console.error("캘린더 ID가 null입니다. 업데이트할 수 없습니다.");
//                 return;
//             }
//             dispatch(updateCalendar({ id: selectedCalendar.id, calendarName, color }))
//                 .unwrap()
//                 .then((updatedCalendar) => {
//                     console.log("Updated calendar:", updatedCalendar);
//                     const updatedCalendars = calendarOptions.map((calendar) =>
//                         calendar.id === selectedCalendar.id ? updatedCalendar : calendar
//                     );
//                     setCalendarOptions(updatedCalendars);
//                     closeEditCalendarModal();
//                 })
//                 .catch((error) => {
//                     console.error("캘린더 수정 에러:", error);
//                     closeEditCalendarModal();
//                 })
//             };
//     };

//     // 캘린더 삭제 핸들러
//     const handleDeleteCalendar = () => {
//         if (selectedCalendar) {
//             dispatch(deleteCalendar(selectedCalendar.id))
//                 .unwrap()
//                 .then(() => {
//                     setCalendarOptions(calendarOptions.filter(calendar => calendar.id !== selectedCalendar.id));
//                     onRequestClose();
//                 })
//                 .catch((error) => {
//                     console.error("캘린더 삭제 에러:", error);
//                     closeEditCalendarModal();
//                 })
//         };
//     };

//     return (
//             <Modal isOpen={isOpen} onRequestClose={closeEditCalendarModal} style={calendarModalStyles}>
//                 <ModalTitle style={{ marginBottom: '20px' }}> 캘린더 수정</ModalTitle>
//                 <label style={{ marginBottom: '10px' }}>
//                     캘린더 이름:
//                     <InputField
//                         type="text"
//                         name="calendarName"
//                         value={calendarName}
//                         onChange={(e) => setCalendarName(e.target.value)}
//                     />
//                 </label>
//                 <ColorPicker color={color} setColor={setColor} customColor={customColor} setCustomColor={setCustomColor} />
//                 <ButtonContainer>
//                     <ModalButton onClick={handleUpdateCalendar}>수정</ModalButton>
//                     <ModalButton onClick={handleDeleteCalendar}>삭제</ModalButton>
//                     <ModalButton onClick={closeEditCalendarModal}>취소</ModalButton>
//                 </ButtonContainer>
//             </Modal>
//     );
// };

// export default CalendarEditModal;