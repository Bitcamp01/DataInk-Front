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
import { getAlarmBySearch } from '../../apis/mypageApis';
import { change_searchCondition, change_searchKeyword } from '../../slices/mypageSlice';

const columns = [
    { field: 'notificationId', headerName: 'No', flex: 1, headerClassName: 'no-column-header', cellClassName: 'no-column-cell'},
    {
        field: 'notificationType',
        headerName: '알림종류',
        flex: 1,
        renderCell: (params) => {
            const category = params.value === 'NOTICE' ? '공지사항'
                : params.value === 'COMMENT' ? '댓글'
                : params.value === 'PROJECT_ASSIGNMENT' ? '프로젝트'
                : params.value === 'LABEL_REVIEW' ? '승인/반려'
                : params.value === 'TASK_UPDATED' ? '제출'
                : '';
            return <span>{category}</span>;
        },
    },
    { field: 'content', headerName: '내용', flex: 2 },
    { field: 'userName', headerName: '보낸 사람', flex: 1 },
    { field: 'createdAt', headerName: '발생 시간', flex: 1, valueFormatter: (value) => dayjs(value).format('YYYY-MM-DD')},
    {
        field: 'read',
        headerName: '상태',
        flex: 1,
        renderCell: (params) => {
            return params.value ? "읽음" : "읽지 않음";
        },
    },
];

const Alarm = () => {
    const dispatch = useDispatch();
    const notification = useSelector((state) => state.mypageSlice.notification) || [];
    const searchCondition = useSelector(state => state.mypageSlice.searchCondition);
    const searchKeyword = useSelector(state => state.mypageSlice.searchKeyword);
    const page = useSelector(state => state.mypageSlice.page);
    console.log("notification:", notification);

    // 입력용 상태 (검색 버튼을 누르기 전 임시 저장 상태)
    const [searchConditionInput, setSearchConditionInput] = useState("all");
    const [searchKeywordInput, setSearchKeywordInput] = useState("");
    const [period, setPeriod] = useState("all");
    const [inputStartDate, setInputStartDate] = useState(dayjs().subtract(1, 'month'));
    const [inputEndDate, setInputEndDate] = useState(dayjs());
    
    const changeSearchCondition = (e) => {
        setSearchConditionInput(e.target.value);
    };
    const changeSearchKeyword = (e) => {
        setSearchKeywordInput(e.target.value);
    };

    const handlePeriodChange = (event) => {
        const selectedPeriod = event.target.value;
        setPeriod(selectedPeriod);

        if (selectedPeriod === 'today') {
            setInputStartDate(dayjs().subtract(1, 'day'));
            setInputEndDate(dayjs());
        } else if (selectedPeriod === 'week') {
            setInputStartDate(dayjs().subtract(1, 'week'));
            setInputEndDate(dayjs());
        } else if (selectedPeriod === 'month') {
            setInputStartDate(dayjs().subtract(1, 'month'));
            setInputEndDate(dayjs());
        } else {
            setInputStartDate(dayjs().subtract(1, 'month'));
            setInputEndDate(dayjs());
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

    useEffect(() => {
        // 초기 로드 시 알림 리스트를 가져옴 (검색 상태를 의존성에서 제외)
        dispatch(getAlarmBySearch({
            searchCondition: searchConditionInput,
            searchKeyword: searchKeywordInput,
            page: 0,
            startDate: period === 'all' ? '' : inputStartDate.format('YYYY-MM-DDTHH:mm:ss'),
            endDate: period === 'all' ? '' : inputEndDate.format('YYYY-MM-DDTHH:mm:ss'),
        }));
    }, [dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();

         // 검색어 매핑 테이블
        const searchKeywordMap = {
            '공지사항': 'NOTICE',
            '댓글': 'COMMENT',
            '프로젝트': 'PROJECT_ASSIGNMENT',
            '승인/반려': 'LABEL_REVIEW',
            '제출': 'TASK_UPDATED',
        };

        // 입력된 검색어와 부분 일치하는 값을 찾기
        let searchKeywordMapped = searchKeywordInput;
        Object.keys(searchKeywordMap).forEach(key => {
            if (key.includes(searchKeywordInput)) {
                searchKeywordMapped = searchKeywordMap[key];
            }
        });

        dispatch(change_searchCondition(searchConditionInput));
        dispatch(change_searchKeyword(searchKeywordMapped));
        dispatch(getAlarmBySearch({
            searchCondition: searchConditionInput,
            searchKeyword: searchKeywordMapped,
            page: 0,
            startDate: period === 'all' ? '' : inputStartDate.format('YYYY-MM-DDTHH:mm:ss'),
            endDate: period === 'all' ? '' : inputEndDate.format('YYYY-MM-DDTHH:mm:ss'),
        }));
    };

    const changePage = (e, v) => {
        dispatch(getAlarmBySearch({
            searchCondition,
            searchKeyword,
            page: v - 1,
            startDate: period === 'all' ? '' : inputStartDate.format('YYYY-MM-DDTHH:mm:ss'),
            endDate: period === 'all' ? '' : inputEndDate.format('YYYY-MM-DDTHH:mm:ss'),
        }));
    };

    

    return (
        <div id="Alarm" className="tab-content">
            <h3>알림</h3>

            <form onSubmit={handleSearch}>
                <div className="alarm__filter-container">
                    <Box sx={{ minWidth: '7.5rem' }}>
                        <FormControl fullWidth size="small" sx={{ minWidth: '7.5rem' }}>
                            <InputLabel className="alarm__filter-group" 
                            sx={{ 
                                color: "#7785BE" 
                            }}>
                            카테고리</InputLabel>
                            <Select 
                                className="alarm__filter-select"
                                value={searchConditionInput}
                                label="카테고리"
                                inputProps={{
                                    notificationType: 'searchCondition'
                                }}
                                onChange={changeSearchCondition}
                                sx={commonSelectStyles}
                            >
                                <MenuItem value="all">전체</MenuItem>
                                <MenuItem value="type">알림종류</MenuItem>
                                <MenuItem value="content">내용</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    
                    <div className="alarm__filter-divider"></div>

                    <Box sx={{ minWidth: '7.5rem' }}>
                        <FormControl fullWidth size="small" sx={{ minWidth: '7.5rem' }}>
                            <InputLabel className="alarm__filter-group" 
                            sx={{ 
                                color: "#7785BE" 
                                }}>기간</InputLabel>
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
                                    value={inputStartDate}
                                    showDaysOutsideCurrentMonth
                                    format="YYYY-MM-DD"
                                    onChange={(newValue) => setInputStartDate(newValue)}
                                    maxDate={inputEndDate}
                                />
                                <DatePicker
                                    label="종료 날짜"
                                    slotProps={{ textField: { size: 'small', sx: { width: '9.375rem' }}}}
                                    value={inputEndDate}
                                    className="alarm__filter-select"
                                    onChange={(newValue) => setInputEndDate(newValue)}
                                    size="small"
                                    showDaysOutsideCurrentMonth
                                    format="YYYY-MM-DD"
                                    minDate={inputStartDate}
                                />
                            </div>
                        </LocalizationProvider>
                    )}

                    {(period === 'today' || period === 'week' || period === 'month') && (
                        <div className="alarm__filter-group" style={{ display: 'flex', gap: '0.5rem' }}>
                            <TextField
                                label="시작 날짜"
                                value={inputStartDate.format('YYYY-MM-DD')}
                                className="alarm__filter-select"
                                size="small"
                                disabled
                            />
                            <TextField
                                label="종료 날짜"
                                value={inputEndDate.format('YYYY-MM-DD')}
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
                                // value={isRead}
                                label="읽음 여부"
                                // onChange={handleReadChange}
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
                        value={searchKeywordInput}
                        onChange={changeSearchKeyword}
                        placeholder="검색어를 입력하세요."
                        size="small"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(e);
                            }
                        }}
                        variant="outlined"
                        style={{ width: '20.375rem' }}
                    />

                    <button type='submit' className="alarm__search-btn">검색</button>
                </div>

                    <Box sx={{
                        width: '84%',
                        marginBottom: '2.4375rem',
                        boxShadow: '0rem 0.25rem 1.25rem 0.3125rem rgba(0, 0, 0, 0.08)',
                        backgroundColor: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '0 auto'
                    }}>
                        <DataGrid
                            rows={notification?.content || []}
                            columns={columns}
                            getRowId={(row) => row.notificationId}
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
                            <Pagination count={notification.totalPages || 1} page={page + 1} onChange={changePage} color="primary" />
                        </Stack>
                    </div>
                </form>
            </div>
    );
};

export default Alarm;