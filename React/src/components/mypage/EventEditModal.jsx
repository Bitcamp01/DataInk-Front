// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import styled from 'styled-components';
// import { useDispatch } from 'react-redux';
// import { updateEvent, deleteEvent } from '../../apis/mypageApis';

// // 모달 이름 (모달안에 제목 캘린더, 일정 둘 다 씀)
// const ModalTitle = styled.h2`
//     font-size: 24px;
//     font-weight: bold;
//     color: #333;
//     margin-bottom: 20px;
// `;

// // 이벤트 모달 스타일
// const eventModalStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)',
//         padding: '30px',
//         width: '420px', // 이벤트 추가 모달의 너비 설정
//         height: '550px', // 이벤트 추가 모달의 높이 설정
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

// // 일정 안에 버튼들 감싸는 컨테이너 (일정사용)
// const ButtonContainer2 = styled.div`
//     display: flex;
//     justify-content: flex-end;
// `;

// // 모든 모달버튼 나오게할때(즉, 누르면 모달이 나올때 캘린더, 일정 전부사용)
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

// // 캘린더, 일정 인풋필드
// const InputField = styled.input`
//     width: 100%;
//     padding: 10px;
//     border: 1px solid #ddd;
//     border-radius: 4px;
//     margin-bottom: 15px;
//     margin-top: 10px;
//     font-size: 14px;
// `;

// // 일정에서 캐릭터 선택 필드()
// const SelectField = styled.select`
//     width: 100%;
//     padding: 10px;
//     border: 1px solid #ddd;
//     border-radius: 4px;
//     margin-top: 10px;
//     margin-bottom: 15px;
//     font-size: 14px;
// `;

// // 일정에서 메모
// const TextArea = styled.textarea`
//     width: 100%;
//     padding: 10px;
//     border: 1px solid #ddd;
//     border-radius: 4px;
//     margin-bottom: 15px;
//     font-size: 14px;
//     height: 100px;
// `;

// // 일정 추가및 수정시 날짜 선택할때 사용
// const DateContainer = styled.div`
//     display: flex;
//     justify-content: space-between;  /* 두 입력 필드를 좌우로 배치 */
//     gap: 20px;  /* 두 입력 필드 사이의 간격 조절 */
//     margin-bottom: 10px;  /* 아래 요소들과의 간격 */
// `;

// // 일정 추가및 수정시 날짜 선택할때 사용
// const DateLabel = styled.label`
//     flex: 1;  /* 입력 필드들이 동일한 너비를 갖도록 설정 */
//     display: flex;
//     flex-direction: column;
// `;
// const EventEditModal = ({ isOpen, closeEditEventModal, calendarOptions}) => {
//     const dispatch = useDispatch();
//     const [events, setEvents] = useState([]);
//     const [title, setTitle] = useState('');
//     const [selectedEvent, setSelectedEvent] = useState(null);// 선택한 이벤트
//     const [calendarName, setCalendarName] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [memo, setMemo] = useState('');
//     const [editEventModalIsOpen, setEditEventModalIsOpen] = useState(false);
//     const [isModified, setIsModified] = useState(false);

//     const handleUpdateEvent = (closeEditEventModal) => {
//         if (selectedEvent) {
//             if (title && startDate && endDate) {
//                 if (new Date(startDate) > new Date(endDate)) {
//                     alert('종료일은 시작일보다 늦어야 합니다.');
//                     return;
//                 }
    
//                 // 종료 날짜에 1일을 더해주는 로직 유지 (FullCalendar에서 종료일이 exclusive이기 때문)
//                 const adjustedEndDate = new Date(endDate);
//                 adjustedEndDate.setDate(adjustedEndDate.getDate() + 1); // 종료일 수정
    
//                 // 캘린더 이름에 맞는 색상을 찾음
//                 const selectedCalendar = calendarOptions.find(option => option.calendarName === calendarName);
//                 const eventColor = selectedCalendar ? selectedCalendar.color : selectedEvent.color;
    
//                 // 수정된 이벤트 객체 생성
//                 const updatedEvent = {
//                     id: selectedEvent.id,
//                     title,
//                     calendarName, // 선택된 캘린더로 업데이트
//                     start: startDate,
//                     end: adjustedEndDate.toISOString().split("T")[0], // 수정된 종료일 반영
//                     memo,
//                     color: eventColor, // 새로 선택된 캘린더의 색상으로 업데이트
//                     allDay: true,
//                 };
    
//                 console.log("수정 요청 이벤트:", updatedEvent); // 수정 요청 전 이벤트 확인
    
//                 // 백엔드에 수정 요청 보내기
//                 dispatch(updateEvent(updatedEvent))
//                     .unwrap()
//                     .then((updatedEventFromBackend) => {
//                         console.log("백엔드에서 반환된 데이터:", updatedEventFromBackend); // 백엔드 응답 확인
    
//                         // 날짜 유효성 검사 및 변환
//                         const parseDate = (dateStr) => {
//                             const parsedDate = new Date(dateStr);
//                             if (isNaN(parsedDate)) {
//                                 console.error(`Invalid date format: ${dateStr}`);
//                                 return null;
//                             }
//                             return parsedDate.toISOString().split('T')[0]; // 올바른 형식으로 반환
//                         };
    
//                         // 백엔드에서 반환된 날짜 값의 유효성을 확인하고 변환
//                         const validStartDate = parseDate(updatedEventFromBackend.start) || startDate;
//                         const validEndDate = parseDate(updatedEventFromBackend.end) || endDate;
    
//                         // 조정된 이벤트 생성
//                         const adjustedEvent = {
//                             ...updatedEventFromBackend,
//                             start: validStartDate,
//                             end: validEndDate,
//                             color: updatedEventFromBackend.color || eventColor,
//                             allDay: updatedEventFromBackend.allDay !== undefined ? updatedEventFromBackend.allDay : true,
//                         };
    
//                         // 기존 이벤트 리스트에서 수정된 이벤트 반영
//                         setEvents(events.map(event => (event.id === selectedEvent.id ? adjustedEvent : event)));
//                         setEditEventModalIsOpen();
//                     })
//                     .catch((error) => {
//                         console.error('이벤트 수정 에러:', error);
//                         alert('이벤트 수정 중 오류가 발생했습니다. 다시 시도해 주세요.');
//                     });
//             } else {
//                 alert('제목, 캘린더 이름, 시작 날짜 및 종료 날짜를 모두 입력해야 합니다.');
//             }
//         }
//     };

//     // 이벤트 삭제 처리
//     const handleDeleteEvent = () => {
//         if (selectedEvent && !selectedEvent.isHoliday) {
//             // 백엔드에 삭제 요청 보내기 (추가된 부분)
//             dispatch(deleteEvent(selectedEvent.id))
//                 .unwrap()
//                 .then(() => {
//                     setEvents(events.filter(event => event.id !== selectedEvent.id));
//                     closeEditEventModal();
//                 })
//                 .catch((error) => {
//                     console.error('이벤트 삭제 에러:', error);
//                 });
//         } else {
//             alert('공휴일은 삭제할 수 없습니다.');
//         }
//     };

//     const handleInputFieldClick = (e) => {
//         e.preventDefault();
//         e.target.showPicker();  // date input에서 기본으로 제공되는 날짜 선택기를 강제 실행
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;

//         if (name === "title") {
//             setTitle(value);
//         } else if (name === "calendarName") {
//             setCalendarName(value);
//         } else if (name === "startDate") {
//             setStartDate(value);
//             // 시작 날짜를 선택하면 종료 날짜를 자동으로 시작 날짜와 동일하게 설정
//             if (!endDate || new Date(endDate) < new Date(value)) {
//                 setEndDate(value); // 종료 날짜가 없거나, 시작 날짜보다 이전인 경우 업데이트
//             }
//         } else if (name === "endDate") {
//             setEndDate(value);
//         } else if (name === "memo") {
//             setMemo(value);
//         }

//         const hasChanges =
//             title !== (selectedEvent ? selectedEvent.title : '') ||
//             calendarName !== (selectedEvent ? selectedEvent.calendarName : '') ||
//             startDate !== (selectedEvent ? selectedEvent.start : '') ||
//             endDate !== (selectedEvent ? selectedEvent.end : '') ||
//             memo !== (selectedEvent ? selectedEvent.memo : '');

//         setIsModified(hasChanges);
//     };


//     return (
//             <Modal isOpen={isOpen} onRequestClose={closeEditEventModal} style={eventModalStyles}>
//                 <ModalTitle>일정 수정</ModalTitle>
//                 <label>
//                 제목:
//                 <InputField
//                     type="text"
//                     name="title"
//                     value={title}
//                     onChange={handleInputChange}
//                 />
//                 </label>
//                 <br />
//                 <label>
//                 캘린더:
//                 <SelectField
//                     name="calendarName"
//                     value={calendarName}
//                     onChange={handleInputChange}
//                 >
//                     <option value="">선택하세요</option>
//                     {calendarOptions.map((option, index) => (
//                     <option key={index} value={option.calendarName}>
//                         {option.calendarName}
//                     </option>
//                     ))}
//                 </SelectField>
//                 </label>
//                 <br />
//                 <DateContainer>
//                 <DateLabel>
//                     시작 날짜:
//                     <InputField
//                     type="date"
//                     name="startDate"
//                     value={startDate}
//                     onChange={handleInputChange}
//                     onClick={handleInputFieldClick}
//                     />
//                 </DateLabel>
//                 <DateLabel>
//                     종료 날짜:
//                     <InputField
//                     type="date"
//                     name="endDate"
//                     value={endDate}
//                     onChange={handleInputChange}
//                     onClick={handleInputFieldClick}
//                     />
//                 </DateLabel>
//                 </DateContainer>
//                 <label>
//                 메모:
//                 <TextArea
//                     name="memo"
//                     value={memo}
//                     onChange={handleInputChange}
//                 />
//                 </label>
//                 <ButtonContainer2>
//                 <ModalButton onClick={handleUpdateEvent} disabled={!isModified}>수정</ModalButton>
//                 <ModalButton onClick={handleDeleteEvent} style={{ backgroundColor: '#7785BE' }}>삭제</ModalButton>
//                 <ModalButton onClick={closeEditEventModal}>취소</ModalButton>
//                 </ButtonContainer2>
//             </Modal>
//     );
// };

// export default EventEditModal;