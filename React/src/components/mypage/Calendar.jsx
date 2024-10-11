import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarBackground = styled.div`
    font-family: 'Pretendard', 'NotoSansKR', sans-serif;
    background-color: white;
`;

const CalendarToolbar = styled.div`
    .fc-toolbar {
        background-color: #7785BE !important; /* 툴바 배경색 변경 */
        color: white !important; /* 툴바 텍스트 색상 */
        border: none !important;
    }

    .fc-toolbar button {
        background-color: #7785BE !important; /* 버튼 배경색 */
        color: white !important;
        border: none !important;
        border-radius: 4px !important;
        padding: 8px 12px !important;
        margin: 0 5px !important;
        font-size: 14px !important;
        cursor: pointer;
        transition: background-color 0.3s ease !important;
    }

    .fc-toolbar button:hover {
        background-color: #535db1 !important; /* 호버 시 색상 변경 */
    }

    .fc-button-primary {
        background-color: #2c3e50 !important; /* 'Today' 버튼 유지 */
    }

     /* 오늘 날짜 배경색 변경 */
    .fc-day-today {
        background-color: #B8D9F4 !important; /* 원하는 배경색으로 변경 */
        color: white !important; /* 텍스트 색상도 변경 가능 */
    }
`;

const CalendarContainer = styled.div`
    font-family: 'Pretendard', 'NotoSansKR', sans-serif;
    display: flex; /* 사이드바와 메인 캘린더를 나란히 배치 */
    padding: 40px;
    max-width: 1300px;
    margin: 0 auto;
    background-color: #f9f9f9;
`;

const StyledEvent = styled.div`
    background-color: ${props => props.color};
    color: ${props => (props.color === '#FFFFB3' ? 'black' : 'white')}; /* 노란색(#FFFFB3)이면 글씨는 검정색, 아니면 흰색 */
    border-radius: 6px;
    text-align: center;
    margin: 2px 0;
    font-size: 0.9em; // 글자 크기도 함께 줄이기 (원래 크기의 70%)
    height: 70%; // 높이를 70%로 축소
`;

const StyledFullCalendar = styled(FullCalendar)`
    min-height: 120px;
`;

const Sidebar = styled.div`
    width: 250px;
    margin-right: 20px;
    background-color: #f1f1f1;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Divider = styled.hr`
    border: none;
    border-top: 1px dotted #ccc; /* 점선 스타일 */
    margin: 10px 0; /* 위아래 간격 추가 */
`;

const CalendarList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

const CalendarItem = styled.li`
    padding: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover .edit-btn {
        display: block;
    }
`;

const EditButton = styled.button`
    background-color: #7785BE;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 5px 10px;
    font-size: 12px;
    display: none;
    &:hover {
        background-color: #535db1;
    }
`;

const EventButton = styled.button`
    background-color: #7785BE;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 10px 20px;
    font-size: 14px;
    margin-bottom: 10px;
    width: 100%;
    &:hover {
        background-color: #535db1;
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        width: '400px',
        borderRadius: '10px',
        border: 'none',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#ffffff',
    },
    overlay: {
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
};

const ModalButton = styled.button`
    background-color: #7785BE;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 10px 20px;
    font-size: 14px;
    margin-top: 10px;
    transition: background-color 0.3s ease;
    width: 100%;
    &:hover {
        background-color: #535db1;
    }
`;

const InputField = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 15px;
    font-size: 14px;
`;

const SelectField = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 15px;
    font-size: 14px;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 15px;
    font-size: 14px;
    height: 100px;
`;

const ColorCircle = styled.span`
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin-right: 10px;
`;

// 색상 버튼 스타일 정의
const ColorButton = styled.button`
    background-color: ${props => props.color};
    border: ${props => (props.selected ? '2px solid black' : 'none')}; /* 선택된 경우 테두리 추가 */
    border-radius: 50%; /* 동그라미 모양 */
    width: 30px;
    height: 30px;
    margin: 5px 5px;
    cursor: pointer;
    &:hover {
        border: 2px solid #000; /* 호버 시 테두리 추가 */
    }
`;

const InputFieldContainer = styled.div`
    display: flex;
    justify-content: center; /* 수평 중앙 정렬 */
    margin-bottom: 15px; /* 아래쪽 여백 추가 */
`;

// 사용자 정의 색상 팔레트 스타일
const UserColorContainer = styled.div`
    display: flex;
    margin-top: 10px; /* 간격 추가 */
    flex-wrap: wrap; /* 줄 바꿈 가능 */
    justify-content: center;
`;

const ColorInputContainer = styled.div`
    display: flex;
    align-items: center;
`;

// 팔레트의 위치를 고정하기 위해 스타일 추가
const PaletteContainer = styled.div`
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    z-index: 1000; /* 다른 요소 위에 나타나도록 */
    justify-content: center
`;

// 색상 선택기 컴포넌트
const ColorPicker = ({ color, setColor }) => {
    const [showPalette, setShowPalette] = useState(false);

    const togglePalette = () => {
        setShowPalette(!showPalette);
    };

    return (
        <ColorInputContainer>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {colorOptions.map(option => (
                    <ColorButton
                        key={option.value}
                        color={option.value}
                        selected={color === option.value}
                        onClick={() => setColor(option.value)}
                    />
                ))}
                {/* 사용자화 버튼 */}
                <ColorButton color="transparent" onClick={togglePalette}>
                    사용자화
                </ColorButton>
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
                </PaletteContainer>
            )}
        </ColorInputContainer>
    );
};

const colorOptions = [
    { name: "빨간색", value: "#FFB3B3" },
    { name: "주황색", value: "#FFD9B3" },
    { name: "노란색", value: "#FFFFB3" },
    { name: "초록색", value: "#B3FFB3" },
    { name: "파란색", value: "#B3D9FF" },
    { name: "보라색", value: "#D9B3FF" },
];




const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [addCalendarModalIsOpen, setAddCalendarModalIsOpen] = useState(false);
    const [editCalendarModalIsOpen, setEditCalendarModalIsOpen] = useState(false); // 캘린더 수정 모달 상태
    const [title, setTitle] = useState('');
    const [calendarName, setCalendarName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [memo, setMemo] = useState('');
    const [color, setColor] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [calendarOptions, setCalendarOptions] = useState([]);
    const [selectedCalendar, setSelectedCalendar] = useState(null); // 수정할 캘린더 정보 저장
    const [isModified, setIsModified] = useState(false);

    // 캘린더 수정 모달 열기
    const openEditCalendarModal = (calendar) => {
        setSelectedCalendar(calendar);
        setCalendarName(calendar.name);
        setColor(calendar.color);
        setEditCalendarModalIsOpen(true);
    };

    // 캘린더 수정 모달 닫기
    const closeEditCalendarModal = () => {
        setEditCalendarModalIsOpen(false);
        resetForm();
    };

    
    // 공휴일 데이터 가져오기
    const getHolidays = async () => {
        const API_KEY = 'GVhkqM50VDrKOCFHAE8mpLG56nDmsTRi';
        const BASE_URL = 'https://calendarific.com/api/v2/holidays';
        const year = new Date().getFullYear(); // 현재 연도
        const country = 'KR'; // 한국 코드

        try {
            const response = await axios.get(`${BASE_URL}?api_key=${API_KEY}&country=${country}&year=${year}`);
            const holidays = response.data.response.holidays;

            // 이벤트에 공휴일 추가
            const holidayEvents = holidays
                .filter(holiday => {
                    const holidayDate = new Date(holiday.date.iso);
                    const month = holidayDate.getMonth() + 1; // 월은 0부터 시작하므로 +1
                    const day = holidayDate.getDate();

                    // 특정 날짜를 제외
                    return !((month === 3 && day === 20) || 
                            (month === 6 && day === 21) || 
                            (month === 9 && day === 22) || 
                            (month === 12 && day === 21));
                })
                .map(holiday => {
                    const koreanHolidayNames = {
                        'New Year\'s Day': '신정',
                        'Seollal': '설날',
                        'Seollal Holiday': '설날 연휴',
                        'Independence Movement Day': '삼일절',
                        'Arbor Day': '식목일',
                        'Buddha\'s Birthday': '부처님 오신 날',
                        'Labor Day': '근로자의 날',
                        'Children\'s Day': '어린이날',
                        'Memorial Day': '현충일',
                        'Parents\' Day': '어버이날',
                        'Constitution Day': '제헌절',
                        'Liberation Day': '광복절',
                        'Chuseok': '추석',
                        'Chuseok Holiday': '추석 연휴',
                        'Armed Forces Day': '국군의 날',
                        'National Foundation Day': '개천절',
                        'Hangeul Proclamation Day': '한글날',
                        'Christmas Day': '크리스마스',
                        // 필요한 다른 공휴일 추가
                    };

                    return {
                        id: holiday.id || `${holiday.date.iso}-${holiday.name}`, // ID 할당
                        title: koreanHolidayNames[holiday.name] || holiday.name,
                        start: holiday.date.iso,
                        end: holiday.date.iso,
                        allDay: true,
                        color: '#FF6666',
                        extendedProps: { isHoliday: true }
                    };
                });
            
            setEvents(prevEvents => [...prevEvents, ...holidayEvents]); // 기존 이벤트와 합치기
        } catch (error) {
            console.error('공휴일 가져오기 오류:', error);
        }
    };


    useEffect(() => {
        getHolidays();
    }, []);

    const handleUpdateCalendar = () => {
        const updatedCalendars = calendarOptions.map((calendar) =>
            calendar.name === selectedCalendar.name
                ? { ...calendar, name: calendarName, color }
                : calendar
        );
        setCalendarOptions(updatedCalendars);
    
        // 이벤트 색상 업데이트
        const updatedEvents = events.map(event =>
            event.calendarName === selectedCalendar.name
                ? { ...event, color }  // 수정된 색상으로 업데이트
                : event
        );
        setEvents(updatedEvents);  // 이벤트 상태 업데이트
    
        closeEditCalendarModal();
    };

    // 모달 열릴 때마다 상태 초기화
    useEffect(() => {
        if (modalIsOpen && selectedEvent) {
            const adjustedEndDate = new Date(selectedEvent.end);
            adjustedEndDate.setDate(adjustedEndDate.getDate() - 1);

            setTitle(selectedEvent.title);
            setCalendarName(selectedEvent.calendarName);
            setStartDate(selectedEvent.start);
            setEndDate(adjustedEndDate.toISOString().split("T")[0]); // 종료 날짜
            setMemo(selectedEvent.memo || '');
            setColor(selectedEvent.color || '');
        }
    }, [modalIsOpen, selectedEvent]);

    // 상태 변경 감지 및 수정 가능 여부 확인
    useEffect(() => {
        if (selectedEvent) {
            const hasChanges =
                title !== selectedEvent.title ||
                calendarName !== selectedEvent.calendarName ||
                startDate !== selectedEvent.start ||
                endDate !== selectedEvent.end ||
                memo !== selectedEvent.memo;

            setIsModified(hasChanges);
        }
    }, [title, calendarName, startDate, endDate, memo, selectedEvent]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        resetForm(); // 모달 닫을 때 상태 초기화
    };

    const resetForm = () => {
        setTitle('');
        setCalendarName('');
        setStartDate('');
        setEndDate('');
        setMemo('');
        setColor('');
        setSelectedEvent(null);
        setIsModified(false);
    };

    const openAddCalendarModal = () => {
        setAddCalendarModalIsOpen(true);
    };

    const closeAddCalendarModal = (color) => {
        setAddCalendarModalIsOpen(false);
        setCalendarName('');
    };

    // 이벤트 삭제 처리
    const handleDeleteEvent = () => {
        if (selectedEvent) {
            setEvents(events.filter(event => event.id !== selectedEvent.id)); // 이벤트 삭제
            closeModal(); // 모달 닫기
        }
    };

    const handleAddCalendar = () => {
        if (calendarName && color) {
            const newCalendar = { name: calendarName, color };
            setCalendarOptions([...calendarOptions, newCalendar]);
            closeAddCalendarModal();
        } else {
            alert('캘린더 이름과 색상을 입력해야 합니다.');
        }
    };

    const handleAddEvent = () => {
        if (title && calendarName && startDate && endDate) {
            if (new Date(startDate) > new Date(endDate)) {
                alert('종료일은 시작일보다 늦어야 합니다.');
                return;
            }

            // 종료 날짜에 1일을 더해줘서 이벤트가 지정한 마지막 날짜까지 포함되도록 함
            const adjustedEndDate = new Date(endDate);
            adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

            const selectedCalendar = calendarOptions.find(option => option.name === calendarName);
            const eventColor = selectedCalendar ? selectedCalendar.color : '';

            const newEvent = {
                id: String(events.length + 1),
                title,
                calendarName,
                start: startDate,
                end: adjustedEndDate.toISOString().split("T")[0], // 종료 날짜에 하루를 더한 값 사용
                memo,
                color: eventColor,
                allDay: true,
            };
            setEvents([...events, newEvent]);
            closeModal();
        } else {
            alert('제목, 캘린더 이름, 시작 날짜 및 종료 날짜를 모두 입력해야 합니다.');
        }
    };

    // 이벤트 수정 시 처리
    const handleUpdateEvent = () => {
        if (selectedEvent) {
            if (title && startDate && endDate) {
                if (new Date(startDate) > new Date(endDate)) {
                    alert('종료일은 시작일보다 늦어야 합니다.');
                    return;
                }

                // 종료 날짜에 1일을 더해주는 로직 유지 (FullCalendar에서 종료일이 exclusive이기 때문)
                const adjustedEndDate = new Date(endDate);
                adjustedEndDate.setDate(adjustedEndDate.getDate() + 1); // 종료일 수정

                // 캘린더 이름에 맞는 색상을 찾음
                const selectedCalendar = calendarOptions.find(option => option.name === calendarName);
                const eventColor = selectedCalendar ? selectedCalendar.color : selectedEvent.color;

                // 수정된 이벤트 객체 생성
                const updatedEvent = {
                    id: selectedEvent.id,
                    title,
                    calendarName,  // 선택된 캘린더로 업데이트
                    start: startDate,
                    end: adjustedEndDate.toISOString().split("T")[0], // 수정된 종료일 반영
                    memo,
                    color: eventColor, // 새로 선택된 캘린더의 색상으로 업데이트
                    allDay: true,
                };

                // 기존 이벤트 리스트에서 수정된 이벤트 반영
                setEvents(events.map(event => (event.id === selectedEvent.id ? updatedEvent : event)));
                closeModal();
            } else {
                alert('제목, 캘린더 이름, 시작 날짜 및 종료 날짜를 모두 입력해야 합니다.');
            }
        }
    };

    const handleEventClick = (info) => {
        const eventId = info.event.id; // 클릭한 이벤트의 ID
        const event = events.find(event => event.id === eventId); // 해당 ID로 이벤트 찾기
    
        if (event) {
            if (event.isHoliday) {
                alert('공휴일은 클릭할 수 없습니다.'); // 공휴일 클릭 시 알림
            } else {
                // 이벤트가 존재할 경우에만 처리
                setSelectedEvent(event);
                setTitle(event.title);
                setCalendarName(event.calendarName);
    
                const adjustedEndDate = new Date(event.end);
                adjustedEndDate.setDate(adjustedEndDate.getDate() - 1);
    
                setStartDate(event.start);
                setEndDate(adjustedEndDate.toISOString().split("T")[0]);
                setMemo(event.memo || '');
                setColor(event.color || '');
                setIsModified(false);
                openModal();
            }
        } else {
            console.error('이벤트를 찾을 수 없습니다:', eventId); // 이벤트를 찾을 수 없는 경우 오류 메시지 출력
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "title") {
            setTitle(value);
        } else if (name === "calendarName") {
            setCalendarName(value);
        } else if (name === "startDate") {
            setStartDate(value);
            
            // 시작 날짜를 선택하면 종료 날짜를 자동으로 시작 날짜와 동일하게 설정
            if (!endDate || new Date(endDate) < new Date(value)) {
                setEndDate(value); // 종료 날짜가 없거나, 시작 날짜보다 이전인 경우 업데이트
            }
        } else if (name === "endDate") {
            setEndDate(value);
        } else if (name === "memo") {
            setMemo(value);
        }

        const hasChanges =
            title !== (selectedEvent ? selectedEvent.title : '') ||
            calendarName !== (selectedEvent ? selectedEvent.calendarName : '') ||
            startDate !== (selectedEvent ? selectedEvent.start : '') ||
            endDate !== (selectedEvent ? selectedEvent.end : '') ||
            memo !== (selectedEvent ? selectedEvent.memo : '');

        setIsModified(hasChanges);
    };

    const handleEventDrop = (info) => {
        const eventId = info.event.id;
        const event = events.find(event => event.id === eventId);

        console.log('드롭된 이벤트:', event); // 디버깅용
    
        // 공휴일인 경우 드롭을 취소합니다.
        if (event && event.extendedProps && event.extendedProps.isHoliday) {
            console.log('공휴일 이벤트, 드롭 취소됨'); // 디버깅용
            info.revert(); // 드롭을 취소
            return;
        }

        const eventIndex = events.findIndex(event => event.id === eventId);
    
        if (eventIndex !== -1) {
            const updatedEvents = [...events];
    
            // 시작 날짜 업데이트 (날짜만 추출하고, 불필요한 하이픈 제거)
            const startDate = new Date(info.event.start).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).replace(/\./g, '-').replace(/\s/g, '').replace(/-$/, ''); // 불필요한 하이픈 제거
    
            // 종료 날짜 처리 (종료 날짜가 있으면 날짜만 추출, 없으면 시작 날짜와 동일하게 설정)
            let endDate;
            if (info.event.end) {
                endDate = new Date(info.event.end).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }).replace(/\./g, '-').replace(/\s/g, '').replace(/-$/, ''); // 불필요한 하이픈 제거
            } else {
                endDate = startDate;  // 종료 날짜가 없으면 시작 날짜로 설정
            }
    
            // 기존 이벤트의 시작 및 종료 날짜를 업데이트
            updatedEvents[eventIndex].start = startDate;
            updatedEvents[eventIndex].end = endDate;
    
            // 이벤트 상태를 업데이트
            setEvents(updatedEvents);
    
            // FullCalendar 상태를 직접 업데이트하여 달력에서 사라지는 문제 방지
            info.event.setStart(new Date(startDate));  // FullCalendar의 이벤트 상태도 갱신
            info.event.setEnd(new Date(endDate));      // 종료 날짜 갱신

        }
    };
    
    return (
        <CalendarBackground>
            <CalendarContainer>
                {/* 왼쪽 사이드바 */}
                <Sidebar>
                    <EventButton onClick={openModal}>이벤트 추가</EventButton>
                    {/* <EventButton onClick={openAddCalendarModal}>캘린더 추가</EventButton> */}
                    <Divider /> {/* 점선 추가 */}
                    <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        내 캘린더
        <button onClick={openAddCalendarModal} style={{ backgroundColor: '#7785BE', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}>+</button>
    </h3>
                    <CalendarList>
                        {calendarOptions.map((calendar, index) => (
                            <CalendarItem key={index}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <ColorCircle color={calendar.color} />
                                    {calendar.name}
                                </div>
                                <EditButton
                                    className="edit-btn"
                                    onClick={() => openEditCalendarModal(calendar)}
                                >
                                    수정
                                </EditButton>
                            </CalendarItem>
                        ))}
                    </CalendarList>
                </Sidebar>

                <div style={{ flex: 1 }}>
                    <CalendarToolbar>
                        <StyledFullCalendar
                            selectable={true}
                            editable={true}
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            events={events.map(event => ({ 
                                ...event,
                                color: event.color,
                            }))}
                            eventClick={handleEventClick}
                            eventDrop={handleEventDrop}
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,dayGridWeek,dayGridDay',
                            }}
                            timeZone="local"
                            eventContent={(eventInfo) => {
                                const isHoliday = eventInfo.event.extendedProps.isHoliday; // isHoliday 속성 확인
                                return (
                                    <StyledEvent color={eventInfo.event.color} style={{ cursor: isHoliday ? 'not-allowed' : 'pointer' }}>
                                        {eventInfo.event.title}
                                    </StyledEvent>
                                );
                            }}
                        />
                    </CalendarToolbar>
                </div>
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
                    <h2>{selectedEvent ? '일정 수정' : '일정 추가'}</h2>
                    <label>
                        제목:
                        <InputField
                            type="text"
                            name="title"
                            value={title}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        캘린더:
                        <SelectField
                            name="calendarName"
                            value={calendarName}
                            onChange={handleInputChange}
                        >
                            <option value="">선택하세요</option>
                            {calendarOptions.map((option, index) => (
                                <option key={index} value={option.name}>
                                    {option.name}
                                </option>
                            ))}
                        </SelectField>
                    </label>
                    <br />
                    <label>
                        시작 날짜:
                        <InputField
                            type="date"
                            name="startDate"
                            value={startDate}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        종료 날짜:
                        <InputField
                            type="date"
                            name="endDate"
                            value={endDate}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        메모:
                        <TextArea
                            name="memo"
                            value={memo}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    {selectedEvent ? (
                        <>
                            <ModalButton onClick={handleUpdateEvent} disabled={!isModified}>수정</ModalButton>
                            <ModalButton onClick={handleDeleteEvent} style={{ backgroundColor: '#7785BE' }}>삭제</ModalButton>
                        </>
                    ) : (
                        <ModalButton onClick={handleAddEvent}>추가</ModalButton>
                    )}
                    <ModalButton onClick={closeModal}>취소</ModalButton>
                </Modal>
                
                {/* 캘린더 수정 모달 */}
                <Modal isOpen={editCalendarModalIsOpen} onRequestClose={closeEditCalendarModal} style={customStyles}>
                    <h2>캘린더 수정</h2>
                    <label>
                        캘린더 이름:
                        <InputField
                            type="text"
                            name="calendarName"
                            value={calendarName}
                            onChange={(e) => setCalendarName(e.target.value)}
                        />
                    </label>
                    <ColorInputContainer>
                        <label>
                            색상:
                            <ColorPicker color={color} setColor={setColor} />
                        </label>
                    </ColorInputContainer>
                    <ModalButton onClick={handleUpdateCalendar}>수정</ModalButton>
                    <ModalButton onClick={closeEditCalendarModal}>취소</ModalButton>
                </Modal>

                <Modal isOpen={addCalendarModalIsOpen} onRequestClose={closeAddCalendarModal} style={customStyles}>
                    <h2>캘린더 추가</h2>
                    <label>
                        새 캘린더 이름:
                        <InputField
                            type="text"
                            name="calendarName"
                            value={calendarName}
                            onChange={(e) => setCalendarName(e.target.value)}
                        />
                    </label>
                    <label>
                        색상:
                        <ColorPicker color={color} setColor={setColor} /> {/* 변경된 부분 */}
                    </label>
                    <ModalButton onClick={handleAddCalendar}>추가</ModalButton>
                    <ModalButton onClick={closeAddCalendarModal}>취소</ModalButton>
                </Modal>
            </CalendarContainer>
        </CalendarBackground>
    );
};

export default Calendar;
