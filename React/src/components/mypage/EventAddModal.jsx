import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from '../../apis/mypageApis';
import { setEvents } from '../../slices/eventSlice';

// 이벤트 모달 스타일
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
        height: '600px', // 이벤트 추가 모달의 높이 설정
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

// 모달 이름 (모달안에 제목 캘린더, 일정 둘 다 씀)
const ModalTitle = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
`;

// 일정 안에 버튼들 감싸는 컨테이너 (일정사용)
const ButtonContainer2 = styled.div`
    display: flex;
    justify-content: flex-end;
`;

// 모든 모달버튼 나오게할때(즉, 누르면 모달이 나올때 캘린더, 일정 전부사용)
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

// 캘린더, 일정 인풋필드
const InputField = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 15px;
    margin-top: 10px;
    font-size: 14px;
`;

// 일정에서 캐릭터 선택 필드()
const SelectField = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 10px;
    margin-bottom: 15px;
    font-size: 14px;
`;

// 일정에서 메모
const TextArea = styled.textarea`
    width: 167%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 15px;
    font-size: 14px;
    height: 100px;
`;

// 일정 추가및 수정시 날짜 선택할때 사용
const DateContainer = styled.div`
    display: flex;
    justify-content: space-between;  /* 두 입력 필드를 좌우로 배치 */
    gap: 20px;  /* 두 입력 필드 사이의 간격 조절 */
    margin-bottom: 10px;  /* 아래 요소들과의 간격 */
`;

// 일정 추가및 수정시 날짜 선택할때 사용
const DateLabel = styled.label`
    flex: 1;  /* 입력 필드들이 동일한 너비를 갖도록 설정 */
    display: flex;
    flex-direction: column;
`;
const EventAddModal = ({isOpen, closeAddEventModal}) => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.eventSlice.events);
    const calendars = useSelector((state) => state.calendarSlice.calendars);
    const [selectedEvent, setSelectedEvent] = useState(null);// 선택한 이벤트
    const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
    const [calendarName, setCalendarName] = useState(selectedEvent ? selectedEvent.calendarName : '');
    const [startDate, setStartDate] = useState(selectedEvent ? selectedEvent.start : '');
    const [endDate, setEndDate] = useState(selectedEvent ? selectedEvent.end : '');
    const [memo, setMemo] = useState(selectedEvent ? selectedEvent.memo : '');
    const [isModified, setIsModified] = useState(false);

    const handleAddEvent = async () => {
        if (title && calendarName && startDate) {
            const selectedCalendar = calendars.find(option => option.calendarName === calendarName);
            const calendarId = selectedCalendar ? selectedCalendar.id : null;
            const eventColor = selectedCalendar ? selectedCalendar.color : null;
    
            if (!calendarId) {
                alert('유효한 캘린더를 선택해야 합니다.');
                return;
            }
    
            setStartDate(`${startDate}T00:00:00.000Z`);
            setEndDate(`${endDate}T00:00:00.000Z`);
    
            dispatch(addEvent({ 
                calendarId, 
                title, 
                startDate,
                endDate,
                memo
            }))
            .unwrap()
            .then((newEvent) => {             
                const adjustedEvent = {
                    ...newEvent,
                    color: newEvent.color || eventColor,
                    allDay: true,
                };
    
                setEvents([...events, adjustedEvent]);
                closeAddEventModal();
            })
            .catch((error) => {
                console.error("이벤트 추가 에러:", error);
            });
        } else {
            alert('제목, 캘린더 이름, 시작 날짜를 모두 입력해야 합니다.');
        }
    };
    
    // useEffect로 events 상태가 변경될 때마다 새로운 이벤트가 캘린더에 반영되도록 설정
    useEffect(() => {
        if (events && events.length > 0) {
        }
    }, [events]);

    useEffect(() => {
        if (isOpen) {
            setTitle('');
            setCalendarName('');
            setStartDate('');
            setEndDate('');
            setMemo('');
        }
    }, [isOpen]);

    const handleInputFieldClick = (e) => {
        e.preventDefault();
        e.target.showPicker();  // date input에서 기본으로 제공되는 날짜 선택기를 강제 실행
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

    return (
            <Modal isOpen={isOpen} onRequestClose={closeAddEventModal} style={eventModalStyles}>
                <ModalTitle>일정 추가</ModalTitle>
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
                    {calendars.map((option, index) => (
                    <option key={index} value={option.calendarName}>
                        {option.calendarName}
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
                <ModalButton onClick={handleAddEvent}>추가</ModalButton>
                <ModalButton onClick={closeAddEventModal}>취소</ModalButton>
                </ButtonContainer2>
            </Modal>
    );
};

export default EventAddModal;