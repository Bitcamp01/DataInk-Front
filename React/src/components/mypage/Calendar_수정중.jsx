// import React, { useState, useEffect } from 'react';
// import { useDispatch } from "react-redux";
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import styled from 'styled-components';
// import Modal from 'react-modal';
// import 'react-datepicker/dist/react-datepicker.css';
// import { fetchCalendars, fetchEvents, addCalendar, updateCalendar, deleteCalendar, addEvent, updateEvent, deleteEvent } from "../../apis/mypageApis";
// Modal.setAppElement('#root'); // 'root'는 App이 렌더링되는 최상위 DOM 엘리먼트의 ID입니다.

// const CalendarBackground = styled.div`
//     font-family: 'Pretendard', 'NotoSansKR', sans-serif;
//     background-color: white;
// `;

// const CalendarToolbar = styled.div`
//     .fc-toolbar {
//         background-color: #7785BE !important; /* 툴바 배경색 변경 */
//         color: white !important; /* 툴바 텍스트 색상 */
//         border: none !important;
//     }

//     .fc-toolbar button {
//         background-color: #7785BE !important; /* 버튼 배경색 */
//         color: white !important;
//         border: none !important;
//         border-radius: 4px !important;
//         padding: 8px 12px !important;
//         margin: 0 5px !important;
//         font-size: 14px !important;
//         cursor: pointer;y
//         transition: background-color 0.3s ease !important;
//     }

//     .fc-toolbar button:hover {
//         background-color: #535db1 !important; /* 호버 시 색상 변경 */
//     }

//     .fc-button-primary {
//         background-color: #2c3e50 !important; /* 'Today' 버튼 유지 */
//     }

//      /* 오늘 날짜 배경색 변경 */
//     .fc-day-today {
//         background-color: #B8D9F4 !important; /* 원하는 배경색으로 변경 */
//         color: white !important; /* 텍스트 색상도 변경 가능 */
//     }

//     /* .fc-media-screen의 높이를 40rem로 설정 */
//     .fc-media-screen {
//         min-height: 40rem !important; /* 최소 높이 설정 */
//     }
// `;
// // 캘린더 컨테이너
// const CalendarContainer = styled.div`
//     font-family: 'Pretendard', 'NotoSansKR', sans-serif;
//     display: flex; /* 사이드바와 메인 캘린더를 나란히 배치 */
//     padding: 40px;
//     max-width: 1500px;
//     margin: 0 auto;
//     background-color: #f9f9f9;
//     align-items: stretch; /* 모든 자식 요소가 같은 높이를 가지도록 설정 */
//     min-height: 40rem; /* 최소 높이 설정 */
// `;
// // 이벤트 스타일 (컨테이너안에들어가는)
// const StyledEvent = styled.div`
//     background-color: ${props => props.color};
//     color: ${props => (props.color === '#FFFFB3' ? 'black' : 'white')}; /* 노란색(#FFFFB3)이면 글씨는 검정색, 아니면 흰색 */
//     border-radius: 6px;
//     text-align: center;
//     margin: 2px 0;
//     font-size: 0.9em; // 글자 크기도 함께 줄이기 (원래 크기의 70%)
//     height: 70%; // 높이를 70%로 축소
// `;

// // 전체 캘린더 스타일
// const StyledFullCalendar = styled(FullCalendar)`
//     height: 100%; 
//     min-height: 40rem;
// `;

// // 캘린더 사이드바
// const SidebarContainer = styled.div`
//     display: flex;
//     justify-content: space-between; /* 왼쪽과 오른쪽 사이드바를 캘린더 양쪽에 배치 */
//     width: 100%;
// `;

// // 메인 캘린더
// const MainCalendar = styled.div`
//     flex: 1;
//     min-height: 40rem; /* 메인 캘린더도 같은 최소 높이로 설정 */
// `;

// // 왼쪽 사이드바
// const LeftSidebar = styled.div`
//     width: 230px;
//     margin-right: 20px;
//     background-color: #f1f1f1;
//     padding: 20px;
//     border-radius: 8px;
//     box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
// `;

// // 오른쪽 사이드바
// const RightSidebar = styled.div`
//     width: 230px;
//     margin-left: 20px;
//     background-color: #f1f1f1;
//     padding: 20px;
//     border-radius: 8px;
//     box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
// `;

// // 캘린더 해더
// const DateHeader = styled.h3`
//     margin: 0;
//     padding-bottom: 10px;
//     font-size: 17px;
//     color: #333;
// `;

// // 오른쪽 사이드바에 스케출 표출시
// const ScheduleItem = styled.div`
//     margin-top: 10px;
//     font-size: 14px;
//     color: #333;
// `;

// // 구분선
// const Divider = styled.hr`
//     border: none;
//     border-top: 1px dotted #ccc; /* 점선 스타일 */
//     margin: 10px 0; /* 위아래 간격 추가 */
// `;

// // 캘린더 리스트 (왼쪽 사이드바)
// const CalendarList = styled.ul`
//     list-style-type: none;
//     padding: 0;
//     margin: 0;
// `;

// // 캘린더 하나하나 (수정버튼도있음) (왼쪽 사이드바)
// const CalendarItem = styled.li`
//     padding: 10px;
//     border-bottom: 1px solid #ddd;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     &:hover .edit-btn {
//         display: block;
//     }
// `;

// // 수정 버튼 - 누를때 모달나옴
// const EditButton = styled.button`
//     background-color: #7785BE;
//     color: white;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//     padding: 4px 8px;
//     font-size: 10px;
//     display: none;
//     &:hover {
//         background-color: #535db1;
//     }
// `;

// // 이벤트 추가 버튼 (왼쪽사이드바) - 누를때 모달나옴
// const EventButton = styled.button`
//     background-color: #7785BE;
//     color: white;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//     padding: 10px 20px;
//     font-size: 14px;
//     margin-bottom: 10px;
//     width: 100%;
//     &:hover {
//         background-color: #535db1;
//     }
// `;

// const ColorCircle = styled.span`
//     display: inline-block;
//     width: 10px;
//     height: 10px;
//     border-radius: 50%;
//     background-color: ${props => props.color};
//     margin-right: 10px;
// `;
// //---------위로 스타일드 컴포넌트--------------------------------------------------------------------------------------------------------------------------------

// const Calendar = () => {
//     const dispatch = useDispatch();
//     const [selectedEvent, setSelectedEvent] = useState(null);// 선택한 이벤트
//     const [selectedEvents, setSelectedEvents] = useState([]);  // 선택한 날짜의 이벤트 위에꺼랑 다른거임
//     const [addEventModalIsOpen, setAddEventModalIsOpen] = useState(false);
//     const [addCalendarModalIsOpen, setAddCalendarModalIsOpen] = useState(false);
//     const [editCalendarModalIsOpen, setEditCalendarModalIsOpen] = useState(false); // 캘린더 수정 모달 상태
//     const [title, setTitle] = useState('');
//     const [calendarName, setCalendarName] = useState('');`a`
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [memo, setMemo] = useState('');
//     const [color, setColor] = useState('');
//     const [calendarOptions, setCalendarOptions] = useState([]);
//     const [selectedCalendar, setSelectedCalendar] = useState(null); // 수정할 캘린더 정보 저장
//     const [isModified, setIsModified] = useState(false);
//     const [customColor, setCustomColor] = useState('');

// //---------------------------------------------------------------------------------------------------------------------------------------------
// // 지금이게 드래그하면 그날짜대로 설정해서 만드는건데 하나만클릭했을떄도 모달뜨는 오류나서 얼림
//     const handleSelect = (selectionInfo) => {
//         const start = selectionInfo.startStr;  // 선택한 범위의 시작 날짜
//         const end = new Date(selectionInfo.endStr); // 선택한 범위의 끝 날짜

//         // 종료일에서 하루를 빼서 실제로 선택한 마지막 날까지 포함되도록 처리
//         end.setDate(end.getDate() - 1);

//         setStartDate(start);  // 모달에 표시될 시작 날짜 설정
//         setEndDate(end.toISOString().split('T')[0]);  // 모달에 표시될 종료 날짜 설정
//         // openModal();  // 모달 열기
//     };
// //---------------------------------------------------------------------------------------------------------------------------------------------
//     // 날짜 클릭 핸들러
//     const handleDateClick = (arg) => {
//         const selectedDate = new Date(arg.dateStr);  // 선택한 날짜를 Date 객체로 변환
//         setSelectedDate(arg.dateStr);  // 선택한 날짜 업데이트

//         // 선택한 날짜가 이벤트 기간(start와 end 사이)에 해당하는 이벤트 필터링
//         const filteredEvents = events.filter(event => {
//             const eventStartDate = new Date(event.start);
//             const eventEndDate = new Date(event.end);

//             // 선택한 날짜가 이벤트의 시작일과 종료일 사이에 있는지 확인
//             return selectedDate >= eventStartDate && selectedDate <= eventEndDate;
//         });

//         setSelectedEvents(filteredEvents);  // 필터링한 이벤트 설정
//     };
    
//     // 공휴일 데이터 가져오기
//     const holidayData = {
//         "2024-01-01": { dateName: "신정", locdate: 20240101 },
//         "2024-02-09": { dateName: "설날연휴", locdate: 20240209 },
//         "2024-02-10": { dateName: "설날", locdate: 20240210 },
//         "2024-02-11": { dateName: "설날연휴", locdate: 20240211 },
//         "2024-02-12": { dateName: "대체공휴일", locdate: 20240212 },
//         "2024-03-01": { dateName: "삼일절", locdate: 20240301 },
//         "2024-04-10": { dateName: "국회의원선거", locdate: 20240410 },
//         "2024-05-05": { dateName: "어린이날", locdate: 20240505 },
//         "2024-05-06": { dateName: "대체공휴일", locdate: 20240506 },
//         "2024-05-15": { dateName: "부처님 오신 날", locdate: 20240515 },
//         "2024-06-06": { dateName: "현충일", locdate: 20240606 },
//         "2024-08-15": { dateName: "광복절", locdate: 20240815 },
//         "2024-09-16": { dateName: "추석연휴", locdate: 20240916 },
//         "2024-09-17": { dateName: "추석", locdate: 20240917 },
//         "2024-09-18": { dateName: "추석연휴", locdate: 20240918 },
//         "2024-10-03": { dateName: "개천절", locdate: 20241003 },
//         "2024-10-09": { dateName: "한글날", locdate: 20241009 },
//         "2024-12-25": { dateName: "크리스마스", locdate: 20241225 },
//     };
    
//     const getHolidayEvents = () => {
//         return Object.keys(holidayData).map(date => ({
//             id: holidayData[date].locdate.toString(),
//             title: holidayData[date].dateName,
//             start: date,
//             end: date,
//             allDay: true,
//             isHoliday: true,
//             color: '#FF6666'
//         }));
//     };

//     // 모달 열릴 때마다 상태 초기화
//     useEffect(() => {
//         if (addEventModalIsOpen && selectedEvent) {
//             const adjustedEndDate = new Date(selectedEvent.end);
//             adjustedEndDate.setDate(adjustedEndDate.getDate() - 1);

//             setTitle(selectedEvent.title);
//             setCalendarName(selectedEvent.calendarName); // 캘린더 이름 설정
//             setStartDate(new Date(selectedEvent.start).toISOString().split("T")[0]); // 시작 날짜 설정
//             setEndDate(new Date(selectedEvent.end).toISOString().split("T")[0]); // 종료 날짜 설정
//             setMemo(selectedEvent.memo || '');
//             setColor(selectedEvent.color || '');
//         }
//     }, [addEventModalIsOpen, selectedEvent]);

//     // 상태 변경 감지 및 수정 가능 여부 확인
//     useEffect(() => {
//         if (selectedEvent) {
//             const hasChanges =
//                 title !== selectedEvent.title ||
//                 calendarName !== selectedEvent.calendarName ||
//                 startDate !== selectedEvent.start ||
//                 endDate !== selectedEvent.end ||
//                 memo !== selectedEvent.memo;
//             setIsModified(hasChanges);
//         }
//     }, [title, calendarName, startDate, endDate, memo, selectedEvent]);

//     // 일정 모달 열기
//     const openAddEventModal = () => {
//         setAddEventModalIsOpen(true);
//     };

//     // 일정 모달 닫기
//     const closeModal = () => {
//         setAddEventModalIsOpen(false);
//         resetForm(); // 모달 닫을 때 상태 초기화
//     };

//     const openAddCalendarModal = () => {
//         setCalendarName(''); // 캘린더 이름 초기화
//         setColor(''); // 색상 초기화
//         setCustomColor(''); // 사용자화 색상 초기화
//         setAddCalendarModalIsOpen(true);
//     };

//     const closeAddCalendarModal = () => {
//         setAddCalendarModalIsOpen(false);
//         setCalendarName('');
//     };

//     // 캘린더 수정 모달 열기
//     const openEditCalendarModal = (calendar) => {
//         console.log("Selected calendar for editing:", calendar); // 추가된 로그
//         setSelectedCalendar(calendar);
//         setCalendarName(calendar.calendarName);
//         setColor(calendar.color);
//         setCustomColor(calendar.customColor || calendar.color); // customColor 초기화
//         setEditCalendarModalIsOpen(true);
//     };

//     // 캘린더 수정 모달 닫기
//     const closeEditCalendarModal = () => {
//         setEditCalendarModalIsOpen(false);
//         resetForm();
//     };


//     const resetForm = () => {
//         setTitle('');
//         setCalendarName('');
//         setStartDate('');
//         setEndDate('');
//         setMemo('');
//         setColor('');
//         setSelectedEvent(null);
//         setIsModified(false);
//     };



//     // 캘린더 정보 조회
//     useEffect(() => {
//         const loadCalendars = async () => {
//             try {
//                 const calendarsData = await fetchCalendars(); // API 함수 호출
//                 setCalendarOptions(calendarsData); // 상태에 저장
//             } catch (error) {
//                 console.error("캘린더 로드 에러:", error);
//             }
//         };

//         loadCalendars(); // useEffect 내에서 함수 호출
//     }, []);

    

//     // 이벤트 정보 조회 및 공휴일 적용
//     useEffect(() => {
//         const loadEvents = async () => {
//             try {
//                 const eventsData = await fetchEvents(); // API 함수 호출
    
//                 // 각 이벤트의 calendarId와 매칭하여 calendarName 설정
//                 const formattedEvents = eventsData.map(event => {
//                     const matchedCalendar = calendarOptions.find(option => option.id === event.calendarId);
                    
//                     // 시작 및 종료 날짜가 유효한지 확인
//                     const startDate = new Date(event.startDate);
//                     const endDate = new Date(event.endDate);
                    
//                     if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
//                         console.error('유효하지 않은 날짜 형식입니다:', event.startDate, event.endDate);
//                         return null; // 유효하지 않은 이벤트는 제외
//                     }
    
//                     return {
//                         id: event.id.toString(),  // ID를 문자열로 변환
//                         title: event.title,
//                         calendarName: matchedCalendar ? matchedCalendar.calendarName : '', // 매칭된 캘린더 이름 사용
//                         start: startDate,
//                         end: endDate,
//                         color: event.color,
//                         allDay: event.allDay ? true : false,  // allDay 필드가 있으면 적용
//                     };
//                 }).filter(event => event !== null); // 유효하지 않은 이벤트는 필터링
    
//                 const holidayEvents = getHolidayEvents(); // 공휴일 이벤트 가져오기
    
//                 // 기존 이벤트와 공휴일 데이터를 합쳐서 상태에 저장
//                 setEvents([...formattedEvents, ...holidayEvents]);
//             } catch (error) {
//                 console.error("이벤트 로드 에러:", error);
//             }
//         };
    
//         loadEvents(); // useEffect 내에서 함수 호출
//     }, [calendarOptions]);
    



//     const handleEventClick = (info) => {
//         const eventId = info.event.id;
//         const event = events.find(event => event.id === eventId);
//         console.log("클릭한 이벤트 ID:", eventId);
//         console.log("이벤트 리스트에서 찾은 이벤트:", event);
    
//         if (event) {
//             if (event.isHoliday) {
//                 alert('공휴일은 클릭할 수 없습니다.');
//             } else {
//                 console.log("선택된 이벤트:", event);
//                 setSelectedEvent(event);
//                 setTitle(event.title);
    
//                 const selectedCalendar = calendarOptions.find(option => option.id === event.calendarId || option.calendarName === event.calendarName);
//                 setCalendarName(selectedCalendar ? selectedCalendar.calendarName : '');
    
//                 // 날짜를 "yyyy-MM-dd" 형식으로 변환하여 설정
//                 const startDate = new Date(event.start).toISOString().split("T")[0];
//                 const endDate = new Date(event.end).toISOString().split("T")[0];
    
//                 // 종료일은 exclusive이므로 하루를 빼서 설정
//                 const adjustedEndDate = new Date(event.end);
//                 adjustedEndDate.setDate(adjustedEndDate.getDate() - 1);
//                 setEndDate(adjustedEndDate.toISOString().split("T")[0]);
    
//                 setStartDate(startDate);
//                 setMemo(event.memo || '');
//                 setColor(event.color || '');
//                 setIsModified(false);
//                 openAddEventModal();
//             }
//         } else {
//             console.error('이벤트를 찾을 수 없습니다:', eventId);
//         }
//     };

//     const handleEventDrop = (info) => {
//         const eventId = info.event.id;
//         const event = events.find(event => event.id === eventId);
    
//         console.log('드롭된 이벤트:', event); // 디버깅용
    
//         // 공휴일인 경우 드롭을 취소합니다.
//         if (event && event.extendedProps && event.extendedProps.isHoliday) {
//             console.log('공휴일 이벤트, 드롭 취소됨'); // 디버깅용
//             info.revert(); // 드롭을 취소
//             return;
//         }
    
//         const eventIndex = events.findIndex(event => event.id === eventId);
    
//         if (eventIndex !== -1) {
//             const updatedEvents = [...events];
    
//             // 시작 날짜 업데이트
//             const startDate = new Date(info.event.start).toISOString().split('T')[0];
    
//             // 종료 날짜 처리
//             let endDate;
//             if (info.event.end) {
//                 const originalStartDate = new Date(event.start);
//                 const originalEndDate = new Date(event.end);
//                 const duration = (originalEndDate - originalStartDate) / (1000 * 60 * 60 * 24); // 기간(일 수) 계산
    
//                 const adjustedEndDate = new Date(info.event.start);
//                 adjustedEndDate.setDate(adjustedEndDate.getDate() + duration); // 시작일에 원래 기간을 더하여 종료일 설정
//                 endDate = adjustedEndDate.toISOString().split('T')[0];
//             } else {
//                 endDate = startDate;  // 종료 날짜가 없으면 시작 날짜로 설정
//             }
    
//             // 기존 이벤트의 시작 및 종료 날짜를 업데이트
//             updatedEvents[eventIndex].start = startDate;
//             updatedEvents[eventIndex].end = endDate;
    
//             // 백엔드에 업데이트 요청 보내기
//             dispatch(updateEvent({
//                 id: eventId,
//                 title: event.title,
//                 calendarName: event.calendarName,
//                 start: startDate,
//                 end: endDate,
//                 memo: event.memo,
//                 color: event.color,
//                 allDay: event.allDay
//             }))
//             .unwrap()
//             .then((updatedEventFromBackend) => {
//                 console.log('백엔드 업데이트 성공:', updatedEventFromBackend);
    
//                 // 성공적으로 업데이트된 경우 이벤트 상태를 업데이트
//                 setEvents(updatedEvents);
//             })
//             .catch((error) => {
//                 console.error('이벤트 업데이트 에러:', error);
//                 info.revert(); // 에러가 발생하면 드롭을 취소
//             });
    
//             // FullCalendar 상태를 직접 업데이트하여 달력에서 사라지는 문제 방지
//             info.event.setStart(new Date(startDate));  // FullCalendar의 이벤트 상태도 갱신
//             info.event.setEnd(new Date(endDate));      // 종료 날짜 갱신
//         }
//     };
    
//     // FullCalendar에 이벤트를 렌더링할 때 종료 날짜를 하루 추가하여 exclusive 처리 보정
//     const renderEvents = () => {
//         return events.map(event => {
//             console.log("event.end 값:", event.end);
//             const renderedEndDate = new Date(event.end);
//             renderedEndDate.setDate(renderedEndDate.getDate() + 1); // 렌더링 시에만 종료 날짜에 하루 추가

//             return {
//                 ...event,
//                 end: renderedEndDate.toISOString().split('T')[0], // 렌더링 시만 하루 추가된 종료일로 설정
//             };
//         });
//     };
//     return (
//         <CalendarBackground>
//             <CalendarContainer>
//                 <SidebarContainer>
//                 {/* 왼쪽 사이드바 */}
//                     <LeftSidebar>
//                         <EventButton onClick={openAddEventModal}>이벤트 추가</EventButton>
//                         <Divider /> {/* 점선 추가 */}
//                         <h3 
//                             style={{ 
//                                 display: 'flex',
//                                 justifyContent: 'space-between',
//                                 alignItems: 'center' 
//                             }}>
//                             내 캘린더
//                             <button 
//                                 onClick={openAddCalendarModal}
//                                 style={{ 
//                                     backgroundColor: '#7785BE', 
//                                     color: 'white', border: 'none', 
//                                     borderRadius: '4px', padding: '5px 10px', 
//                                     cursor: 'pointer' 
//                                 }}>+</button>
//                         </h3>
//                         <CalendarList>
//                             {calendarOptions.map((calendar, index) => (
//                                 <CalendarItem key={index}>
//                                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                                         <ColorCircle color={calendar.color} />
//                                         {calendar.calendarName}
//                                     </div>
//                                     <EditButton
//                                         className="edit-btn"
//                                         onClick={() => openEditCalendarModal(calendar)}
//                                     >
//                                         수정
//                                     </EditButton>
//                                 </CalendarItem>
//                             ))}
//                         </CalendarList>
//                     </LeftSidebar>

//                     <MainCalendar>
//                         {/*메인 달력*/}
//                         <CalendarToolbar>
//                             <StyledFullCalendar
//                                 selectable={true}
//                                 select={handleSelect}  // 드래그로 날짜 선택 시 호출되는 함수
//                                 editable={true}
//                                 plugins={[dayGridPlugin, interactionPlugin]}
//                                 initialView="dayGridMonth"
//                                 events={renderEvents()}
//                                 dateClick={handleDateClick}  // 날짜 클릭 시 호출되는 함수
//                                 eventClick={handleEventClick}
//                                 eventDrop={handleEventDrop}
//                                 headerToolbar={{
//                                     left: 'prev,next today',
//                                     center: 'title',
//                                     right: 'dayGridMonth,dayGridWeek,dayGridDay',
//                                 }}
//                                 timeZone="local"
//                                 eventContent={(eventInfo) => {
//                                     const isHoliday = eventInfo.event.extendedProps.isHoliday; // isHoliday 속성 확인
//                                     return (
//                                         <StyledEvent color={eventInfo.event.color} style={{ cursor: isHoliday ? 'not-allowed' : 'pointer' }}>
//                                             {eventInfo.event.title}
//                                         </StyledEvent>
//                                     );
//                                 }}
//                             />
//                         </CalendarToolbar>
//                     </MainCalendar>

//                     {/* 오른쪽 사이드바 */}
//                     <RightSidebar>
//                         {selectedDate ? (
//                             <>
//                                 <DateHeader>{new Date(selectedDate).toLocaleDateString('ko-KR', {
//                                     year: 'numeric',
//                                     month: 'long',
//                                     day: 'numeric',
//                                     weekday: 'long'
//                                 })}</DateHeader>
//                                 <Divider />
//                                 {selectedEvents.length > 0 ? (
//                                     selectedEvents.map(event => (
//                                         <ScheduleItem key={event.id}>{event.title}</ScheduleItem>
//                                     ))
//                                 ) : (
//                                     <p>스케줄이 없습니다.</p>
//                                 )}
//                             </>
//                         ) : (
//                             <p>날짜를 선택하세요.</p>
//                         )}
//                     </RightSidebar>
//                 </SidebarContainer>
//             </CalendarContainer>
//         </CalendarBackground>
//     );
// };

// export default Calendar;
