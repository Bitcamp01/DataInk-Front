import React, { useEffect, useState } from 'react';
import {
  StyledCalendarWrapper,
  StyledCalendar,
  StyledDate,
  StyledDot,
} from "./CalendarStyle";
import moment from 'moment';
import axios from 'axios';

const OwnCalendar = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [projectEndDay, setProjectEndDay] = useState([]);

  useEffect(() => {
    // 백엔드 API 요청
    const fetchEndDates = async () => {
      const token = sessionStorage.getItem('ACCESS_TOKEN');
      console.log(token);
      try {
        const response = await axios.get('https://223.130.134.24:9090/api/project-end-dates', {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        const items = response.data;
        const projectEnd = items.map(item => ({
          id: item.userId,
          endDate: moment(item.endDate).format("YYYY-MM-DD"),  // 여기서 endDate를 포맷
          projectName: item.projectName
        }));

        setProjectEndDay(projectEnd);
      } catch (error) {
        console.error('Error fetching end dates: ', error);
        if (error.response) {
          console.log('Error response data:', error.response.data);
          console.log('Error status:', error.response.status);
        } else {
          console.log('Error message:', error.message);
        }
      }
    };
  
    fetchEndDates();
  }, []);

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
          if (view === "month") {
            const formattedDate = moment(date).format("YYYY-MM-DD");
            const foundEndDate = projectEndDay.find((x) => x.endDate === formattedDate); // endDate로 비교
            
            if (foundEndDate) {
              // 날짜 비교
              const endDate = moment(foundEndDate.endDate);  // endDate에 접근
              const diffDays = endDate.diff(moment(), 'days');

              // 남은 날짜에 따라 색상 결정
              const dotColor = diffDays <= 5 ? '#FF4949' : '#7C97FE';
              
              html.push(
                <StyledDot key={formattedDate} style={{ backgroundColor: dotColor }} />
              );
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
