import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
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
    const [searchKeyword, setSearchKeyword] = useState('');
    

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
        } else if (selectedPeriod === 'custom') {
            setStartDate(dayjs());
        }
    };

    const columns = [
        { field: 'category', headerName: '카테고리', width: 200 },
        { field: 'content', headerName: '내용', width: 380 },
        { field: 'level', headerName: '알림 레벨', width: 180 },
        { field: 'writer', headerName: '보낸 사람', width: 180 },
        { field: 'time', headerName: '발생 시간', width: 250 },
        { field: 'status', headerName: '상태', width: 200 },
    ];

    const rows = [
        { "id": 1, "category": "전체공지", "content": "시스템 상태 정상", "level": "Warning", "writer": "관리자", "time": "2024-09-27 09:02", "status": "읽지않음" },
        { "id": 2, "category": "메세지", "content": "데이터 백업 성공", "level": "Success", "writer": "시스템 관리자", "time": "2024-09-15 09:49", "status": "읽지않음" },
        { "id": 3, "category": "작업현황", "content": "서버 과부하 위험", "level": "Critical", "writer": "운영팀", "time": "2024-09-11 16:53", "status": "읽음" },
        { "id": 4, "category": "작업공지", "content": "데이터 백업 성공", "level": "Info", "writer": "관리자", "time": "2024-09-25 09:56", "status": "읽지않음" },
        { "id": 5, "category": "전체공지", "content": "백업 작업 성공적으로 완료", "level": "Notice", "writer": "관리자", "time": "2024-09-17 23:15", "status": "읽음" },
        { "id": 6, "category": "작업현황", "content": "백업 작업 성공적으로 완료", "level": "Urgent", "writer": "관리자", "time": "2024-09-27 11:19", "status": "읽음" },
        { "id": 7, "category": "전체공지", "content": "디스크 사용량 초과 알림", "level": "Notice", "writer": "기술 지원팀", "time": "2024-09-23 04:28", "status": "읽음" },
        { "id": 8, "category": "전체공지", "content": "시스템 업데이트 완료", "level": "Notice", "writer": "관리자", "time": "2024-09-19 21:12", "status": "읽지않음" },
        { "id": 9, "category": "메세지", "content": "데이터 백업 성공", "level": "Info", "writer": "시스템 관리자", "time": "2024-09-24 03:46", "status": "읽지않음" },
        { "id": 10, "category": "전체공지", "content": "보안 침해 발생", "level": "Urgent", "writer": "운영팀", "time": "2024-09-01 15:16", "status": "읽음" }
    ]

    const commonSelectStyles = {
        color: "#7785BE",
        ".MuiOutlinedInput-notchedOutline": {
            borderColor: "#7785BE",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#7785BE",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#7785BE",
        },
        ".MuiSelect-icon": {
            color: "#7785BE",
        },
        width: '140px',
    };

    return (
        <div id="Alarm" className="tab-content">
        <h3>알림</h3>
        {/* 검색바 및 필터 섹션 */}
        <div className="alarm__filter-container">
            {/* 카테고리 필터 */}
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth size="small">
                    <InputLabel className="alarm__filter-group"
                    sx={{
                        color: "#7785BE", // 라벨 폰트 색상
                    }}
                    >카테고리</InputLabel>
                    <Select 
                        className="alarm__filter-select"
                        value={category}
                        label="카테고리"
                        onChange={handleCategoryChange} // 변경 핸들러 추가
                        variant="outlined"
                        sx={commonSelectStyles}
                    >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value="all">전체</MenuItem>
                        <MenuItem value="notice">전체공지</MenuItem>
                        <MenuItem value="tasknotice">작업공지</MenuItem>
                        <MenuItem value="message">메세지</MenuItem>
                        <MenuItem value="workstatus">작업현황</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            
            <div className="alarm__filter-divider"></div>

            {/* 기간 필터 */}
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth size="small">
                    <InputLabel className="alarm__filter-group"
                    sx={{
                        color: "#7785BE", // 라벨 폰트 색상
                    }}
                    >기간</InputLabel>
                    <Select
                        className="alarm__filter-select"
                        value={period}
                        label="period"
                        onChange={handlePeriodChange}
                        variant="outlined"
                        sx={commonSelectStyles}
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
                            slotProps={{ textField: { size: 'small', sx: { width: '222.4px' }}}}
                            value={startDate}
                            showDaysOutsideCurrentMonth
                            format="YYYY-MM-DD"
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

            {(period === '' || period === 'all') && (
                <div className="alarm__filter-group" style={{ display: 'flex', gap: '8px' }}>
                    <TextField
                        label="시작 날짜"
                        value=""
                        placeholder="시작 날짜"
                        className="alarm__filter-select"
                        size="small"
                        disabled
                    />
                    <TextField
                        label="종료 날짜"
                        value=""
                        placeholder="종료 날짜"
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
                    <InputLabel id="alarm__filter-group"
                    sx={{
                        color: "#7785BE", // 라벨 폰트 색상
                    }}
                    >읽음 여부</InputLabel>
                    <Select
                        labelId="alarm__filter-select"
                        value={status}
                        label="읽음 여부"
                        onChange={handleStatusChange}
                        variant="outlined"
                        sx={commonSelectStyles}
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
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="검색어를 입력하세요."
                size="small"
                variant="outlined"
                style={{ width: '300px' }}
            />

            {/* 검색 버튼 */}
            <button type='button' className="alarm__search-btn">검색</button>
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
                hideFooter
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