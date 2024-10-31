import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateEvent, deleteEvent } from '../../apis/mypageApis';

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
        width: '415px', // 이벤트 추가 모달의 너비 설정
        height: '595px', // 이벤트 추가 모달의 높이 설정
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
    font-size: 25px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
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
    font-size: 15px;
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
    margin-top: 5px;
    font-size: 14px;
`;

// 일정에서 캐릭터 선택 필드()
const SelectField = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 5px;
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
    margin-top: 5px;
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
const EventEditModal = ({ isOpen, closeEditEventModal, selectedEvent}) => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.eventSlice.events);
    const calendars = useSelector((state) => state.calendarSlice.calendars);
    const [title, setTitle] = useState('');
    const [calendarName, setCalendarName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [memo, setMemo] = useState('');
    const [color, setColor] = useState('');
    const [isModified, setIsModified] = useState(false);

    // 모달이 열릴 때 selectedEvent를 기반으로 초기 상태 설정
    useEffect(() => {
        if (isOpen && selectedEvent) { // 모달이 열리고 selectedEvent가 있을 때만 초기화
            setTitle(selectedEvent.title);
            setCalendarName(selectedEvent.calendarName);
            setStartDate(new Date(selectedEvent.start).toISOString().split("T")[0]);
            setEndDate(new Date(selectedEvent.end).toISOString().split("T")[0]);
            setMemo(selectedEvent.memo || '');
            setColor(selectedEvent.color);
            setIsModified(false);
        }
    }, [isOpen, selectedEvent]); // isOpen과 selectedEvent의 변경을 감지

    const handleUpdateEvent = (() => {
        if (selectedEvent) {
            if (title && startDate && endDate) {
                if (new Date(startDate) > new Date(endDate)) {
                    alert('종료일은 시작일보다 늦어야 합니다.');
                    return;
                }
    
                // 종료 날짜에 1일을 더해주는 로직 유지
                let adjustedEndDate = new Date(endDate);
                adjustedEndDate.setDate(adjustedEndDate.getDate());
    
                 // 선택한 calendarId에 맞는 calendarName과 color 찾아오기
                const selectedCalendar = calendars.find(option => option.calendarName === calendarName);
                const calendarId = selectedCalendar ? selectedCalendar.id : null;
                const eventColor = selectedCalendar ? selectedCalendar.color : null;
    
                const updatedEvent = {
                    id: selectedEvent.id,
                    calendarId, // calendarId를 반드시 포함
                    title: title || selectedEvent.title,
                    calendarName, // 찾은 calendarName 할당
                    startDate: new Date(startDate).toISOString() || selectedEvent.startDate,
                    endDate: new Date(adjustedEndDate).toISOString() || selectedEvent.endDate,
                    memo: memo || selectedEvent.memo,
                    color: eventColor, // 찾은 color 할당
                    allDay: selectedEvent.allDay,
                };
                
                dispatch(updateEvent(updatedEvent));
                closeEditEventModal();
            } else {
                alert('제목, 캘린더 이름, 시작 날짜 및 종료 날짜를 모두 입력해야 합니다.');
            }
        }
    });

    // 이벤트 삭제 처리
    const handleDeleteEvent = () => {
        if (selectedEvent && !selectedEvent.isHoliday) {
            dispatch(deleteEvent(selectedEvent.id));
            closeEditEventModal();
        } else {
            alert('공휴일은 삭제할 수 없습니다.');
        }
    };

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
            <Modal isOpen={isOpen} onRequestClose={closeEditEventModal} style={eventModalStyles}>
                <ModalTitle>일정 수정</ModalTitle>
                <label>
                제목
                <InputField
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />
                </label>
                <br />
                <label>
                캘린더
                <SelectField
                    name="calendarName"
                    value={calendarName}
                    onChange={handleInputChange}
                >
                    <option value="">선택하세요</option>
                        {(calendars || []).map((option, index) => (
                            <option key={index} value={option.calendarName}>
                                {option.calendarName}
                            </option>
                        ))}
                </SelectField>
                </label>
                <br />
                <DateContainer>
                <DateLabel>
                    시작 날짜
                    <InputField
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={handleInputChange}
                    onClick={handleInputFieldClick}
                    />
                </DateLabel>
                <DateLabel>
                    종료 날짜
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
                메모
                <TextArea
                    name="memo"
                    value={memo}
                    onChange={handleInputChange}
                />
                </label>
                <ButtonContainer2>
                <ModalButton onClick={handleUpdateEvent} disabled={!isModified}>수정</ModalButton>
                <ModalButton onClick={handleDeleteEvent}>삭제</ModalButton>
                <ModalButton onClick={closeEditEventModal}>취소</ModalButton>
                </ButtonContainer2>
            </Modal>
    );
};

export default EventEditModal;