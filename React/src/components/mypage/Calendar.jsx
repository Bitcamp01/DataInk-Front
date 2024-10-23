import React, { useState, useEffect } from 'react';
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
        cursor: pointer;y
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

    /* .fc-media-screen의 높이를 40rem로 설정 */
    .fc-media-screen {
        min-height: 40rem !important; /* 최소 높이 설정 */
    }
`;

const CalendarContainer = styled.div`
    font-family: 'Pretendard', 'NotoSansKR', sans-serif;
    display: flex; /* 사이드바와 메인 캘린더를 나란히 배치 */
    padding: 40px;
    max-width: 1500px;
    margin: 0 auto;
    background-color: #f9f9f9;
    align-items: stretch; /* 모든 자식 요소가 같은 높이를 가지도록 설정 */
    min-height: 40rem; /* 최소 높이 설정 */
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
    height: 100%; 
    min-height: 40rem;
`;

const SidebarContainer = styled.div`
    display: flex;
    justify-content: space-between; /* 왼쪽과 오른쪽 사이드바를 캘린더 양쪽에 배치 */
    width: 100%;
`;

const MainCalendar = styled.div`
    flex: 1;
    min-height: 40rem; /* 메인 캘린더도 같은 최소 높이로 설정 */
`;

// 왼쪽 사이드바
const LeftSidebar = styled.div`
    width: 230px;
    margin-right: 20px;
    background-color: #f1f1f1;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// 오른쪽 사이드바
const RightSidebar = styled.div`
    width: 230px;
    margin-left: 20px;
    background-color: #f1f1f1;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const DateHeader = styled.h3`
    margin: 0;
    padding-bottom: 10px;
    font-size: 17px;
    color: #333;
`;

const ScheduleItem = styled.div`
    margin-top: 10px;
    font-size: 14px;
    color: #333;
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
const ModalTitle = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
`;

const eventModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '30px',
        width: '420px', // 이벤트 추가 모달의 너비 설정
        height: '550px', // 이벤트 추가 모달의 높이 설정
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

const calendarModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '30px',
        width: '500px',
        height:'340px',
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

const ButtonContainer = styled.div`
    display: flex;
    margin-top: 40px;
    justify-content: flex-end;
`;

const ButtonContainer2 = styled.div`
    display: flex;
    justify-content: flex-end;
`;

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

const InputField = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 15px;
    margin-top: 10px;
    font-size: 14px;
`;

const SelectField = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 10px;
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
    border: ${props => (props.isHovered ? '2px solid lightgrey' : props.selected ? '2px solid #666' : 'none')}; 
    border-radius: 50%; /* 동그라미 모양 */
    width: 30px;
    height: 30px;
    margin: 5px 5px;
    cursor: pointer;
`;

const CustomButton = styled.button`
    background-color: ${props => props.color};
    border: ${props => props.isHovered ? '2px solid lightgray' : props.selected ? '2px solid #666' : '1px solid #777'};
    color: black; /* 텍스트 색상 */
    border-radius: 4px; /* 네모난 모양 */
    padding: 7px 14px;
    cursor: pointer;
    margin-left: 10px;
`;

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

const DateContainer = styled.div`
    display: flex;
    justify-content: space-between;  /* 두 입력 필드를 좌우로 배치 */
    gap: 20px;  /* 두 입력 필드 사이의 간격 조절 */
    margin-bottom: 10px;  /* 아래 요소들과의 간격 */
`;

const DateLabel = styled.label`
    flex: 1;  /* 입력 필드들이 동일한 너비를 갖도록 설정 */
    display: flex;
    flex-direction: column;
`;

// 색상 선택기 컴포넌트
const ColorPicker = ({ color, setColor, customColor, setCustomColor }) => {
    const [showPalette, setShowPalette] = useState(false);
    const [hoveredColor, setHoveredColor] = useState(''); // 호버된 색상 추적

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
                        <ModalButton onClick={paletteConfirm}>확인</ModalButton> {/* 확인 버튼 */}
                        <ModalButton onClick={paletteCancel}>취소</ModalButton> {/* 취소 버튼 */}
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
    const [selectedDate, setSelectedDate] = useState(null);  // 선택한 날짜 상태
    const [selectedEvent, setSelectedEvent] = useState(null);// 선택한 이벤트
    const [selectedEvents, setSelectedEvents] = useState([]);  // 선택한 날짜의 이벤트 위에꺼랑 다른거임
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [addCalendarModalIsOpen, setAddCalendarModalIsOpen] = useState(false);
    const [editCalendarModalIsOpen, setEditCalendarModalIsOpen] = useState(false); // 캘린더 수정 모달 상태
    const [title, setTitle] = useState('');
    const [calendarName, setCalendarName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [memo, setMemo] = useState('');
    const [color, setColor] = useState('');
    const [calendarOptions, setCalendarOptions] = useState([]);
    const [selectedCalendar, setSelectedCalendar] = useState(null); // 수정할 캘린더 정보 저장
    const [isModified, setIsModified] = useState(false);
    const [customColor, setCustomColor] = useState('');
    
    // 캘린더 수정 모달 열기
    const openEditCalendarModal = (calendar) => {
        setSelectedCalendar(calendar);
        setCalendarName(calendar.name);
        setColor(calendar.color);
        setCustomColor(calendar.customColor || calendar.color); // customColor 초기화
        setEditCalendarModalIsOpen(true);
    };

    // 캘린더 수정 모달 닫기
    const closeEditCalendarModal = () => {
        setEditCalendarModalIsOpen(false);
        resetForm();
    };
//---------------------------------------------------------------------------------------------------------------------------------------------
// 지금이게 드래그하면 그날짜대로 설정해서 만드는건데 하나만클릭했을떄도 모달뜨는 오류나서 얼림
    const handleSelect = (selectionInfo) => {
        const start = selectionInfo.startStr;  // 선택한 범위의 시작 날짜
        const end = new Date(selectionInfo.endStr); // 선택한 범위의 끝 날짜

        // 종료일에서 하루를 빼서 실제로 선택한 마지막 날까지 포함되도록 처리
        end.setDate(end.getDate() - 1);

        setStartDate(start);  // 모달에 표시될 시작 날짜 설정
        setEndDate(end.toISOString().split('T')[0]);  // 모달에 표시될 종료 날짜 설정
        // openModal();  // 모달 열기
    };
//---------------------------------------------------------------------------------------------------------------------------------------------
    // 날짜 클릭 핸들러
    const handleDateClick = (arg) => {
        const selectedDate = new Date(arg.dateStr);  // 선택한 날짜를 Date 객체로 변환
        setSelectedDate(arg.dateStr);  // 선택한 날짜 업데이트

        // 선택한 날짜가 이벤트 기간(start와 end 사이)에 해당하는 이벤트 필터링
        const filteredEvents = events.filter(event => {
            const eventStartDate = new Date(event.start);
            const eventEndDate = new Date(event.end);

            // 선택한 날짜가 이벤트의 시작일과 종료일 사이에 있는지 확인
            return selectedDate >= eventStartDate && selectedDate <= eventEndDate;
        });

        setSelectedEvents(filteredEvents);  // 필터링한 이벤트 설정
    };
    
    // 공휴일 데이터 가져오기
    const holidayData = {
        "2024-01-01": { dateName: "신정", locdate: 20240101 },
        "2024-02-09": { dateName: "설날연휴", locdate: 20240209 },
        "2024-02-10": { dateName: "설날", locdate: 20240210 },
        "2024-02-11": { dateName: "설날연휴", locdate: 20240211 },
        "2024-02-12": { dateName: "대체공휴일", locdate: 20240212 },
        "2024-03-01": { dateName: "삼일절", locdate: 20240301 },
        "2024-04-10": { dateName: "국회의원선거", locdate: 20240410 },
        "2024-05-05": { dateName: "어린이날", locdate: 20240505 },
        "2024-05-06": { dateName: "대체공휴일", locdate: 20240506 },
        "2024-05-15": { dateName: "부처님 오신 날", locdate: 20240515 },
        "2024-06-06": { dateName: "현충일", locdate: 20240606 },
        "2024-08-15": { dateName: "광복절", locdate: 20240815 },
        "2024-09-16": { dateName: "추석연휴", locdate: 20240916 },
        "2024-09-17": { dateName: "추석", locdate: 20240917 },
        "2024-09-18": { dateName: "추석연휴", locdate: 20240918 },
        "2024-10-03": { dateName: "개천절", locdate: 20241003 },
        "2024-10-09": { dateName: "한글날", locdate: 20241009 },
        "2024-12-25": { dateName: "크리스마스", locdate: 20241225 },
    };
    
    const getHolidayEvents = () => {
        return Object.keys(holidayData).map(date => ({
            id: holidayData[date].locdate.toString(),
            title: holidayData[date].dateName,
            start: date,
            end: date,
            allDay: true,
            isHoliday: true,
            color: '#FF6666'
        }));
    };
    
    const applyHolidays = () => {
        const holidayEvents = getHolidayEvents();
        setEvents(prevEvents => [...prevEvents, ...holidayEvents]);  // 공휴일 이벤트 추가
    };
    
    useEffect(() => {
        applyHolidays();  // 공휴일 이벤트 적용
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

    // 기본 캘린더 확인 및 생성 로직 추가
    // useEffect(() => {
    //     const fetchCalendars = async () => {
    //         try {
    //             const response = await axios.get("/src/components/mypage/Calendar", {
    //                 headers: {
    //                     'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}` // 세션에서 토큰을 가져와서 전송
    //                 }
    //             });

    //             if (response.data.length === 0) {
    //                 // 기본 캘린더가 없으면 생성
    //                 await axios.post("/src/components/mypage/Calendar", {
    //                     name: "기본 캘린더",
    //                     color: "#7785BE" // 기본 캘린더 색상
    //                 });

    //                 // 새로 추가된 캘린더 데이터를 다시 가져와서 상태 업데이트
    //                 const newResponse = await axios.get("/src/components/mypage/Calendar");
    //                 setCalendarOptions(newResponse.data);
    //             } else {
    //                 setCalendarOptions(response.data);
    //             }
    //         } catch (error) {
    //             console.error("캘린더 로드 에러:", error);
    //         }
    //     };

    //     fetchCalendars();
    // }, []); // 컴포넌트 마운트 시 실행

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
        setCalendarName(''); // 캘린더 이름 초기화
        setColor(''); // 색상 초기화
        setCustomColor(''); // 사용자화 색상 초기화
        setAddCalendarModalIsOpen(true);
    };

    const closeAddCalendarModal = () => {
        setAddCalendarModalIsOpen(false);
        setCalendarName('');
    };

    // 이벤트 삭제 처리
    const handleDeleteEvent = () => {
        if (selectedEvent && !selectedEvent.isHoliday) { // 공휴일 삭제 방지
            setEvents(events.filter(event => event.id !== selectedEvent.id));
            closeModal();
        } else {
            alert('공휴일은 삭제할 수 없습니다.');
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

    const handleInputFieldClick = (e) => {
        e.preventDefault();
        e.target.showPicker();  // date input에서 기본으로 제공되는 날짜 선택기를 강제 실행
    };
    
    return (
        <CalendarBackground>
            <CalendarContainer>
                <SidebarContainer>
                {/* 왼쪽 사이드바 */}
                    <LeftSidebar>
                        <EventButton onClick={openModal}>이벤트 추가</EventButton>
                        {/* <EventButton onClick={openAddCalendarModal}>캘린더 추가</EventButton> */}
                        <Divider /> {/* 점선 추가 */}
                        <h3 
                            style={{ 
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center' 
                            }}>
                            내 캘린더
                            <button 
                                onClick={openAddCalendarModal}
                                style={{ 
                                    backgroundColor: '#7785BE', 
                                    color: 'white', border: 'none', 
                                    borderRadius: '4px', padding: '5px 10px', 
                                    cursor: 'pointer' 
                                }}>+</button>
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
                    </LeftSidebar>

                    <MainCalendar>
                        <CalendarToolbar>
                            <StyledFullCalendar
                                selectable={true}
                                select={handleSelect}  // 드래그로 날짜 선택 시 호출되는 함수
                                editable={true}
                                plugins={[dayGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                events={events.map(event => ({ 
                                    ...event,
                                    color: event.color,
                                }))}
                                 dateClick={handleDateClick}  // 날짜 클릭 시 호출되는 함수
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
                    </MainCalendar>
                    {/* 오른쪽 사이드바 */}
                    <RightSidebar>
                        {selectedDate ? (
                            <>
                                <DateHeader>{new Date(selectedDate).toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    weekday: 'long'
                                })}</DateHeader>
                                <Divider />
                                {selectedEvents.length > 0 ? (
                                    selectedEvents.map(event => (
                                        <ScheduleItem key={event.id}>{event.title}</ScheduleItem>
                                    ))
                                ) : (
                                    <p>스케줄이 없습니다.</p>
                                )}
                            </>
                        ) : (
                            <p>날짜를 선택하세요.</p>
                        )}
                    </RightSidebar>
                </SidebarContainer>
            </CalendarContainer>

                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={eventModalStyles}>
                    <ModalTitle>{selectedEvent ? '일정 수정' : '일정 추가'}</ModalTitle>
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
                    <DateContainer>
                        <DateLabel>
                            시작 날짜:
                            <InputField
                                type="date"
                                name="startDate"
                                value={startDate}
                                onChange={handleInputChange}
                                onClick={handleInputFieldClick}
                            />
                        </DateLabel>
                        <DateLabel>
                            종료 날짜:
                            <InputField
                                type="date"
                                name="endDate"
                                value={endDate}
                                onChange={handleInputChange}
                                onClick={handleInputFieldClick}
                            />
                        </DateLabel>
                    </DateContainer>
                    <label>
                        메모:
                        <TextArea
                            name="memo"
                            value={memo}
                            onChange={handleInputChange}
                        />
                    </label>
                    <ButtonContainer2>
                        {selectedEvent ? (
                            <>
                                <ModalButton onClick={handleUpdateEvent} disabled={!isModified}>수정</ModalButton>
                                <ModalButton onClick={handleDeleteEvent} style={{ backgroundColor: '#7785BE' }}>삭제</ModalButton>
                            </>
                        ) : (
                            <ModalButton onClick={handleAddEvent}>추가</ModalButton>
                        )}
                        <ModalButton onClick={closeModal}>취소</ModalButton>
                    </ButtonContainer2>
                </Modal>

                {/* 캘린더 수정 모달 */}
                <Modal isOpen={editCalendarModalIsOpen} onRequestClose={closeEditCalendarModal} style={calendarModalStyles}>
                    <ModalTitle style={{ marginBottom: '20px' }}> 캘린더 수정</ModalTitle>
                    <label style={{ marginBottom: '10px' }}>
                        캘린더 이름:
                        <InputField
                            type="text"
                            name="calendarName"
                            value={calendarName}
                            onChange={(e) => setCalendarName(e.target.value)}
                        />
                    </label>
                    <ColorPicker color={color} setColor={setColor} customColor={customColor} setCustomColor={setCustomColor} />
                    <ButtonContainer>
                        <ModalButton onClick={handleUpdateCalendar}>수정</ModalButton>
                        <ModalButton onClick={closeEditCalendarModal}>취소</ModalButton>
                    </ButtonContainer>
                </Modal>

                <Modal isOpen={addCalendarModalIsOpen} onRequestClose={closeAddCalendarModal} style={calendarModalStyles}>
                    <ModalTitle style={{ marginBottom: '20px' }}> 캘린더 추가</ModalTitle>
                    <label style={{ marginBottom: '10px' }}>
                        새 캘린더 이름:
                        <InputField
                            type="text"
                            name="calendarName"
                            value={calendarName}
                            onChange={(e) => setCalendarName(e.target.value)}
                        />
                    </label>
                    <ColorPicker color={color} setColor={setColor} customColor={customColor} setCustomColor={setCustomColor} />
                    <ButtonContainer>
                        <ModalButton onClick={handleAddCalendar}>추가</ModalButton>
                        <ModalButton onClick={closeAddCalendarModal}>취소</ModalButton>
                    </ButtonContainer>
                </Modal>
        </CalendarBackground>
    );
};

export default Calendar;
