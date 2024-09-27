import React, { useState } from 'react';
import {
  StyledCalendarWrapper,
  StyledCalendar,
  StyledDate,
  StyledDot,
} from "./CalendarStyle";
import moment from 'moment';

const OwnCalendar = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const attendDay = ["2024-09-06", "2024-09-17"]; // 출석한 날짜 예시

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setActiveStartDate(today);
    setDate(today);
  };

  return (
    <StyledCalendarWrapper>
      <StyledCalendar
        value={date}
        onChange={handleDateChange}
        formatDay={(locale, date) => moment(date).format("D")}
        formatYear={(locale, date) => moment(date).format("YYYY")}
        formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
        formatShortWeekday={(locale, date) => moment(date).format("ddd")}
        calendarType="gregory"
        showNeighboringMonth={true}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        activeStartDate={activeStartDate === null ? undefined : activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) =>
          setActiveStartDate(activeStartDate)
        }
        tileContent={({ date, view }) => {
          let html = [];
          if (view === "month") { // view가 'month'일 때
            // 해당 날짜가 출석한 날짜인지 확인
            if (attendDay.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              html.push(<StyledDot key={moment(date).format("YYYY-MM-DD")} />);
              console.log(moment(date).format("YYYY-MM-DD"));
            }
          }
          return <>{html}</>;
        }}
      />
      <StyledDate onClick={handleTodayClick}>Today</StyledDate> 
    </StyledCalendarWrapper>
  );
};

export default OwnCalendar;
