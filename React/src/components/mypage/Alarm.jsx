import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import '../../css/alarm.css'; // 스타일 임포트
// import { getProjectsBySearch } from '../../apis/mypageApis';
// import { change_searchCondition, change_searchKeyword } from '../../slices/mypageSlice';

const columns = [
    { field: 'category', headerName: '카테고리', flex: 1 },
    { field: 'content', headerName: '내용', flex: 2 },
    { field: 'writer', headerName: '보낸 사람', flex: 1 },
    { field: 'time', headerName: '발생 시간', flex: 1 },
    { field: 'status', headerName: '상태', flex: 1 },
];

const Alarm = () => {
    // State for period filter and date range
    const [category, setCategory] = useState(''); // 카테고리 상태 추가
    const [notification, setNotification] = useSelector((state) => state.mypageSlice.notification) || [];
    const [status, setStatus] = useState('');
    const [period, setPeriod] = useState('');
    const [startDate, setStartDate] = useState(dayjs().subtract(1, 'day'));
    const [endDate, setEndDate] = useState(dayjs()); // 종료 날짜는 오늘 날짜로 고정
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
        width: '7.5rem',
    };

    return (
        <div id="Alarm" className="tab-content">
            <h3>알림</h3>
            
            <div className="alarm__filter-container">
                <Box sx={{ minWidth: '7.5rem' }}>
                    <FormControl fullWidth size="small" sx={{ minWidth: '7.5rem' }}>
                        <InputLabel className="alarm__filter-group" sx={{ color: "#7785BE" }}>카테고리</InputLabel>
                        <Select 
                            className="alarm__filter-select"
                            value={category}
                            label="카테고리"
                            onChange={handleCategoryChange}
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

                <Box sx={{ minWidth: '7.5rem' }}>
                    <FormControl fullWidth size="small" sx={{ minWidth: '7.5rem' }}>
                        <InputLabel className="alarm__filter-group" sx={{ color: "#7785BE" }}>기간</InputLabel>
                        <Select
                            className="alarm__filter-select"
                            value={period}
                            label="기간"
                            onChange={handlePeriodChange}
                            variant="outlined"
                            sx={commonSelectStyles}
                        >
                            <MenuItem value="all">기간전체</MenuItem>
                            <MenuItem value="custom">직접입력</MenuItem>
                            <MenuItem value="today">최근 1일</MenuItem>
                            <MenuItem value="week">최근 1주일</MenuItem>
                            <MenuItem value="month">최근 1개월</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {period === 'custom' && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className="alarm__filter-group" style={{ display: 'flex', gap: '0.5rem' }}>
                            <DatePicker
                                label="시작 날짜"
                                slotProps={{ textField: { size: 'small', sx: { width: '9.375rem' }}}}
                                value={startDate}
                                showDaysOutsideCurrentMonth
                                format="YYYY-MM-DD"
                                onChange={(newValue) => setStartDate(newValue)}
                                maxDate={endDate}
                                renderInput={(params) => (
                                    <TextField {...params} className="alarm__filter-select" />
                                )}
                            />
                            <DatePicker
                                label="종료 날짜"
                                slotProps={{ textField: { size: 'small', sx: { width: '9.375rem' }}}}
                                value={endDate}
                                className="alarm__filter-select"
                                onChange={(newValue) => setEndDate(newValue)}
                                size="small"
                                showDaysOutsideCurrentMonth
                                format="YYYY-MM-DD"
                                minDate={startDate}
                            />
                        </div>
                    </LocalizationProvider>
                )}

                {(period === 'today' || period === 'week' || period === 'month') && (
                    <div className="alarm__filter-group" style={{ display: 'flex', gap: '0.5rem' }}>
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
                    <div className="alarm__filter-group" style={{ display: 'flex', gap: '0.5rem' }}>
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

                <Box sx={{ minWidth: '7.5rem' }}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="alarm__filter-group" sx={{ color: "#7785BE" }}>읽음 여부</InputLabel>
                        <Select
                            labelId="alarm__filter-select"
                            value={status}
                            label="읽음 여부"
                            onChange={handleStatusChange}
                            variant="outlined"
                            sx={commonSelectStyles}
                        >
                            <MenuItem value="all">읽음 여부</MenuItem>
                            <MenuItem value="read">읽음</MenuItem>
                            <MenuItem value="unread">읽지 않음</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <TextField
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="검색어를 입력하세요."
                    size="small"
                    variant="outlined"
                    style={{ width: '24.375rem' }}
                />

                <button type='button' className="alarm__search-btn">검색</button>
            </div>

            <Box sx={{
                width: '95%',
                marginBottom: '2.4375rem',
                boxShadow: '0rem 0.25rem 1.25rem 0.3125rem rgba(0, 0, 0, 0.08)',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto'
            }}>
                <DataGrid
                    rows={notification}
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

            <div className="alarm__pagination-container">
                <Stack spacing={2} sx={{ marginBottom: '5rem' }}>
                    <Pagination count={10} color="primary" />
                </Stack>
            </div>
        </div>
    );
};

export default Alarm;