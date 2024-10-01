import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl  } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import '../../css/alarm.css'; // 스타일 임포트

const Alarm = () => {
    // State for period filter and date range
    const [category, setCategory] = useState(''); // 카테고리 상태 추가
    const [status, setStatus] = useState('');
    const [period, setPeriod] = useState('');
    const [startDate, setStartDate] = useState(dayjs().subtract(1, 'day'));
    const [endDate] = useState(dayjs()); // 종료 날짜는 오늘 날짜로 고정
    

    // 카테고리 선택 핸들러
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    // 기간 선택 드롭다운 변경 핸들러
    const handlePeriodChange = (event) => {
        const selectedPeriod = event.target.value;
    setPeriod(selectedPeriod);

    // 각 기간에 맞는 날짜 설정
    if (selectedPeriod === 'today') {
        setStartDate(dayjs().subtract(1, 'day'));
    } else if (selectedPeriod === 'week') {
        setStartDate(dayjs().subtract(1, 'week'));
    } else if (selectedPeriod === 'month') {
        setStartDate(dayjs().subtract(1, 'month'));
    }
};

const columns = [
    { field: 'category', headerName: '카테고리', width: 200 },
    { field: 'content', headerName: '내용', width: 200 },
    { field: 'level', headerName: '알림 레벨', width: 200 },
    { field: 'time', headerName: '발생 시간', width: 200 },
    { field: 'status', headerName: '상태', width: 200 },
];

const rows = [
    { id: 1, category: '작업공지', content: '네트워크 개선 작업 안내', level: 'info', time: '2024-09-10 23:00', status: '읽지않음' },
    { id: 2, category: '작업공지', content: '네트워크 개선 작업 안내', level: 'info', time: '2024-09-10 23:00', status: '읽음' },
    { id: 3, category: '작업공지', content: '네트워크 개선 작업 안내', level: 'info', time: '2024-09-10 23:00', status: '읽음' },
    { id: 4, category: '작업공지', content: '네트워크 개선 작업 안내', level: 'info', time: '2024-09-10 23:00', status: '읽지않음' },
];
    return (
        <div id="Alarm" className="tab-content">
        <h3>알림</h3>
        {/* 검색바 및 필터 섹션 */}
        <div className="alarm__filter-container">
            {/* 카테고리 필터 */}
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth size="small">
                    <InputLabel className="alarm__filter-group">카테고리</InputLabel>
                    <Select 
                        className="alarm__filter-select"
                        value={category}
                        label="카테고리"
                        onChange={handleCategoryChange} // 변경 핸들러 추가
                        variant="outlined"
                    >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value="all">전체</MenuItem>
                        <MenuItem value="notice">공지사항</MenuItem>
                        <MenuItem value="message">메세지</MenuItem>
                        <MenuItem value="workstatus">작업상태</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            
            <div className="alarm__filter-divider"></div>

            {/* 기간 필터 */}
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth size="small">
                    <InputLabel className="alarm__filter-group">기간</InputLabel>
                    <Select
                        className="alarm__filter-select"
                        value={period}
                        label="period"
                        onChange={handlePeriodChange}
                        variant="outlined"
                    >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value="all">기간전체</MenuItem>
                        <MenuItem value="custom">직접입력</MenuItem>
                        <MenuItem value="today">최근 1일</MenuItem>
                        <MenuItem value="week">최근 1주일</MenuItem>
                        <MenuItem value="month">최근 1개월</MenuItem>
                    </Select>
                </FormControl>
            </Box>

                {/* 기간에 따른 날짜 선택 */}
                {period === 'custom' && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className="alarm__filter-group" style={{ display: 'flex', gap: '8px' }}>
                            {/* 시작 날짜 선택 가능 */}
                            <DatePicker
                                label="시작 날짜"
                                slotProps={{ textField: { size: 'small' }}}
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                                maxDate={endDate} // 종료 날짜를 넘어갈 수 없음
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        className="alarm__filter-select"
                                    />
                                )}
                            />
                            {/* 종료 날짜: 현재 날짜로 고정 */}
                            <TextField
                                label="종료 날짜"
                                value={endDate.format('YYYY-MM-DD')}
                                className="alarm__filter-select"
                                size="small"
                                disabled
                            />
                        </div>
                    </LocalizationProvider>
                )}

                {/* 최근 1일, 1주일, 1개월 선택 시 */}
                {(period === 'today' || period === 'week' || period === 'month') && (
                        <div className="alarm__filter-group" style={{ display: 'flex', gap: '8px' }}>
                            <TextField
                                label="시작 날짜"
                                value={startDate.format('YYYY-MM-DD')}
                                className="alarm__filter-select"
                                size="small"
                                disabled
                            />
                            <TextField
                                label="종료 날짜"
                                value={endDate.format('YYYY-MM-DD')}
                                className="alarm__filter-select"
                                size="small"
                                disabled
                            />
                        </div>
                    )}

            <div className="alarm__filter-divider"></div>
             {/* 읽음 여부 필터 */}
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth size="small">
                    <InputLabel id="alarm__filter-group">읽음 여부</InputLabel>
                    <Select
                        labelId="alarm__filter-select"
                        value={status}
                        label="읽음 여부"
                        onChange={handleStatusChange}
                        variant="outlined"
                    >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value="all">읽음 여부</MenuItem>
                        <MenuItem value="read">읽음</MenuItem>
                        <MenuItem value="unread">읽지 않음</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* 검색 입력 */}
        <TextField
            type="text"
            className="alarm__search-input"
            placeholder="검색어를 입력하세요."
            size="small"
            variant="outlined"
            style={{ width: '250px', marginLeft: '8px' }} // 너비 조정 및 마진 추가
        />

            {/* 검색 버튼 */}
            <button className="alarm__search-btn">검색</button>
        </div>

        {/* 데이터 그리드 섹션 */}
        <Box sx={{ width: '100%', marginBottom: '39px', boxShadow: '0px 4px 20px 5px rgba(0, 0, 0, 0.08)' }}>
            <DataGrid
            rows={rows}
            columns={columns}
            rowHeight={40}
            headerHeight={50}
            autoHeight
            disableRowSelectionOnClick
            classes={{
                cell: 'alarm__custom-cell',
                columnHeader: 'alarm__custom-header',
            }}
            />
        </Box>

        {/* 페이지네이션 섹션 */}
        <div className="alarm__pagination-container">
            <Stack spacing={2} sx={{ marginBottom: '80px' }}>
            <Pagination count={10} color="primary" />
            </Stack>
        </div>
        </div>
    );
    };

    export default Alarm;
