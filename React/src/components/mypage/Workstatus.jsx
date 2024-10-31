import React, { useState, useEffect } from 'react';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import '../../css/workstatus.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsBySearch } from '../../apis/mypageApis';
import { change_searchCondition, change_searchKeyword } from '../../slices/mypageSlice';

const columns = [
    { field: 'projectId', headerName: 'No', flex: 0.5, headerClassName: 'no-column-header', cellClassName: 'no-column-cell' },
    { field: 'name', headerName: '프로젝트명', flex: 1.5 },
    { field: 'description', headerName: '프로젝트 설명', flex: 2 },
    // { field: 'totalWorkCnt',headerName: '총 작업수',width: 225 },
    { 
        field: 'startDate', 
        headerName: '시작일', 
        flex: 1,
        valueFormatter: (value) => dayjs(value).format('YYYY-MM-DD')
    },
    { 
        field: 'endDate', 
        headerName: '기한일', 
        flex: 1,
        valueFormatter: (value) => dayjs(value).format('YYYY-MM-DD')
    },
];

const Workstatus = () => {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.mypageSlice.projects) || [];
    const searchCondition = useSelector(state => state.mypageSlice.searchCondition);
    const searchKeyword = useSelector(state => state.mypageSlice.searchKeyword);
    const page = useSelector(state => state.mypageSlice.page);

    // 입력용 상태 (검색 버튼을 누르기 전 임시 저장 상태)
    const [searchConditionInput, setSearchConditionInput] = useState("all");
    const [searchKeywordInput, setSearchKeywordInput] = useState("");
    const [period, setPeriod] = useState("all");
    const [inputStartDate, setInputStartDate] = useState(dayjs().subtract(1, 'month'));
    const [inputEndDate, setInputEndDate] = useState(dayjs());
    

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
        width: '8.75rem',
    };

    const changeSearchCondition = (e) => {
        setSearchConditionInput(e.target.value);
    };

    const changeSearchKeyword = (e) => {
        setSearchKeywordInput(e.target.value);
    };

    // 처음 렌더링 시 기본 검색 조건으로 데이터 로드
    useEffect(() => {
        dispatch(getProjectsBySearch({
            searchCondition: 'all',
            searchKeyword: '',
            page: 0,
            startDate: '',
            endDate: ''
        }));
    }, [dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(change_searchCondition(searchConditionInput));
        dispatch(change_searchKeyword(searchKeywordInput));

        dispatch(getProjectsBySearch({
            searchCondition: searchConditionInput,
            searchKeyword: searchKeywordInput,
            page,
            startDate: period === 'all' ? '' : inputStartDate.format('YYYY-MM-DDTHH:mm:ss'),
            endDate: period === 'all' ? '' : inputEndDate.format('YYYY-MM-DDTHH:mm:ss'),
        }));
    };

    const changePage = (e, v) => {
        dispatch(getProjectsBySearch({
            searchCondition,
            searchKeyword,
            page: v - 1,
            startDate: period === 'all' ? '' : inputStartDate.format('YYYY-MM-DDTHH:mm:ss'),
            endDate: period === 'all' ? '' : inputEndDate.format('YYYY-MM-DDTHH:mm:ss'),
        }));
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

    return (
        <div id="WorkStatus" className="tab-content">
            <h3>작업 관리</h3>

            <form onSubmit={handleSearch}>
                <div className="workstatus__filter-container">
                    <FormControl size="small" sx={{ minWidth: '7.5rem' }}>
                        <InputLabel sx={{ 
                            color: "#7785BE",
                            fontSize: "0.9375rem"
                            }}>
                            카테고리</InputLabel>
                        <Select
                            className="workstatus__filter-select"
                            value={searchConditionInput}
                            label="카테고리"
                            inputProps={{
                                name: 'searchCondition'
                            }}
                            onChange={changeSearchCondition}
                            sx={commonSelectStyles}
                        >
                            <MenuItem value="all">전체</MenuItem>
                            <MenuItem value="projectName">프로젝트명</MenuItem>
                            <MenuItem value="workName">프로젝트 설명</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{ minWidth: '7.5rem' }}>
                        <FormControl fullWidth size="small">
                            <InputLabel className="workstatus__filter-group"
                            sx={{
                                color: "#7785BE",
                            }}
                            >기간</InputLabel>
                            <Select
                                className="workstatus__filter-select"
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
                            <div className="workstatus__filter-group" style={{ display: 'flex', gap: '0.5rem' }}>
                                <DatePicker
                                    label="시작 날짜"
                                    slotProps={{ textField: { size: 'small', sx: { width: '9.375rem' }}}}
                                    value={inputStartDate}
                                    format="YYYY-MM-DD"
                                    onChange={(newValue) => setInputStartDate(newValue)}
                                    maxDate={inputEndDate}
                                />
                                <DatePicker
                                    label="종료 날짜"
                                    slotProps={{ textField: { size: 'small', sx: { width: '9.375rem' }}}}
                                    value={inputEndDate}
                                    format="YYYY-MM-DD"
                                    onChange={(newValue) => setInputEndDate(newValue)}
                                    minDate={inputStartDate}
                                />
                            </div>
                        </LocalizationProvider>
                    )}

                    {/* 최근 1일, 1주일, 1개월 선택 시 */}
                    {(period === 'today' || period === 'week' || period === 'month') && (
                        <div className="workstatus__filter-group" style={{ display: 'flex', gap: '0.5rem' }}>
                            <TextField
                                label="시작 날짜"
                                value={inputStartDate.format('YYYY-MM-DD')}
                                className="workstatus__filter-select"
                                size="small"
                                disabled
                            />
                            <TextField
                                label="종료 날짜"
                                value={inputEndDate.format('YYYY-MM-DD')}
                                className="workstatus__filter-select"
                                size="small"
                                disabled
                            />
                        </div>
                    )}

                    {(period === '' || period === 'all') && (
                        <div className="workstatus__filter-group" style={{ display: 'flex', gap: '0.5rem' }}>
                            <TextField
                                label="시작 날짜"
                                value=""
                                placeholder="시작 날짜"
                                className="workstatus__filter-select"
                                size="small"
                                disabled
                            />
                            <TextField
                                label="종료 날짜"
                                value=""
                                placeholder="종료 날짜"
                                className="workstatus__filter-select"
                                size="small"
                                disabled
                            />
                        </div>
                    )}


                    <TextField
                        value={searchKeywordInput}
                        onChange={changeSearchKeyword}
                        placeholder='검색어를 입력하세요.'
                        size='small'
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(e);
                            }
                        }}
                        variant='outlined'
                        sx={{ width: '25rem'}}
                    />

                    <button type='submit' className="workstatus__search-btn">검색</button>
                </div>
            </form>

            <Box sx={{ width: '83.6%',
                        marginBottom: '2.4375rem',
                        boxShadow: '0px 0.25rem 1.25rem 0.3125rem rgba(0, 0, 0, 0.08)',
                        backgroundColor: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '0 auto'
            }}>
                <DataGrid
                    rows={projects && projects.content ? projects.content : []}
                    columns={columns}
                    rowHeight={40}
                    headerHeight={50}
                    autoHeight
                    disableRowSelectionOnClick
                    getRowId={(row) => row.projectId}
                    hideFooter
                    classes={{
                        cell: 'workstatus__custom-cell',
                        columnHeader: 'workstatus__custom-header',
                    }}
                />
            </Box>

            <div className="workstatus-pagination-container">
                <Stack spacing={2} sx={{ marginBottom: '80px' }}>
                    <Pagination count={projects.totalPages || 1} page={page + 1} onChange={changePage} color="primary" />
                </Stack>
            </div>
        </div>
    );
};

export default Workstatus;
