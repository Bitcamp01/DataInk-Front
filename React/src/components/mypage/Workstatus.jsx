import React, { useEffect, useState, useCallback } from 'react';
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
    { field: 'projectId', headerName: 'No', width: 100, headerClassName: 'no-column-header', cellClassName: 'no-column-cell' },
    { field: 'name', headerName: '프로젝트명', width: 300 },
    { field: 'description', headerName: '프로젝트 설명', width: 400 },
    { 
        field: 'startDate', 
        headerName: '시작일', 
        width: 180,
        valueFormatter: (value) => dayjs(value).format('YYYY-MM-DD')
    },
    { 
        field: 'endDate', 
        headerName: '기한일', 
        width: 180,
        valueFormatter: (value) => dayjs(value).format('YYYY-MM-DD')
    },
];

const Workstatus = () => {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.mypageSlice.projects) || [];
    const [period, setPeriod] = useState('all');
    const [startDate, setStartDate] = useState(dayjs().subtract(1, 'month'));
    const [endDate, setEndDate] = useState(dayjs());
    const searchCondition = useSelector(state => state.mypageSlice.searchCondition);
    const searchKeyword = useSelector(state => state.mypageSlice.searchKeyword);
    const page = useSelector(state => state.mypageSlice.page);

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

    const changeSearchCondition = (e) => {
        dispatch(change_searchCondition(e.target.value));
    };

    const changeSearchKeyword = (e) => {
        dispatch(change_searchKeyword(e.target.value));
    };

    const fetchProjects = useCallback(() => {
        dispatch(getProjectsBySearch({
            searchCondition,
            searchKeyword,
            page: page,
            startDate: period === 'all' ? '' : startDate.format('YYYY-MM-DDTHH:mm:ss'),
            endDate: period === 'all' ? '' : endDate.format('YYYY-MM-DDTHH:mm:ss'),
        }));
    }, [dispatch, searchCondition, searchKeyword, period, startDate, endDate, page]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProjects();
    };

    const handlePeriodChange = (event) => {
        const selectedPeriod = event.target.value;
        setPeriod(selectedPeriod);

        if (selectedPeriod === 'today') {
            setStartDate(dayjs().subtract(1, 'day'));
            setEndDate(dayjs());
        } else if (selectedPeriod === 'week') {
            setStartDate(dayjs().subtract(1, 'week'));
            setEndDate(dayjs());
        } else if (selectedPeriod === 'month') {
            setStartDate(dayjs().subtract(1, 'month'));
            setEndDate(dayjs());
        } else {
            setStartDate(dayjs().subtract(1, 'month'));
            setEndDate(dayjs());
        }
    };

    const changePage = (e, v) => {
        dispatch(getProjectsBySearch({
            searchCondition,
            searchKeyword,
            page: v - 1,
            startDate: period === 'all' ? '' : startDate.format('YYYY-MM-DDTHH:mm:ss'),
            endDate: period === 'all' ? '' : endDate.format('YYYY-MM-DDTHH:mm:ss'),
        }));
    };

    return (
        <div id="WorkStatus" className="tab-content">
            <h3>작업 관리</h3>

            <div className="workstatus__filter-container">
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel sx={{ color: "#7785BE" }}>카테고리</InputLabel>
                    <Select
                        className="workstatus__filter-select"
                        value={searchCondition}
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

                <Box sx={{ minWidth: 120 }}>
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
                        <div className="workstatus__filter-group" style={{ display: 'flex', gap: '8px' }}>
                            <DatePicker
                                label="시작 날짜"
                                slotProps={{ textField: { size: 'small', sx: { width: '222.4px' }}}}
                                value={startDate}
                                format="YYYY-MM-DD"
                                onChange={(newValue) => setStartDate(newValue)}
                                maxDate={endDate}
                            />
                            <DatePicker
                                label="종료 날짜"
                                slotProps={{ textField: { size: 'small', sx: { width: '222.4px' }}}}
                                value={endDate}
                                format="YYYY-MM-DD"
                                onChange={(newValue) => setEndDate(newValue)}
                                minDate={startDate}
                            />
                        </div>
                    </LocalizationProvider>
                )}

                {/* 최근 1일, 1주일, 1개월 선택 시 */}
                {(period === 'today' || period === 'week' || period === 'month') && (
                    <div className="workstatus__filter-group" style={{ display: 'flex', gap: '8px' }}>
                        <TextField
                            label="시작 날짜"
                            value={startDate.format('YYYY-MM-DD')}
                            className="workstatus__filter-select"
                            size="small"
                            disabled
                        />
                        <TextField
                            label="종료 날짜"
                            value={endDate.format('YYYY-MM-DD')}
                            className="workstatus__filter-select"
                            size="small"
                            disabled
                        />
                    </div>
                )}

                {(period === '' || period === 'all') && (
                    <div className="workstatus__filter-group" style={{ display: 'flex', gap: '8px' }}>
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
                    value={searchKeyword}
                    onChange={changeSearchKeyword}
                    placeholder='검색어를 입력하세요.'
                    size='small'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(e);
                        }
                    }}
                    variant='outlined'
                    sx={{ width: '400px'}}
                />

                <button type='submit' className="workstatus__search-btn" onClick={handleSearch}>검색</button>
            </div>

            <Box sx={{ width: '100%', marginBottom: '39px', boxShadow: '0px 4px 20px 5px rgba(0, 0, 0, 0.08)' }}>
                <DataGrid
                    rows={projects && projects.content ? projects.content : []}
                    columns={columns}
                    rowHeight={40}
                    headerHeight={50}
                    autoHeight
                    disableRowSelectionOnClick
                    getRowId={(row) => row.projectId}
                    hideFooter
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
