import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import '../../css/workstatus.css';

const columns = [
    { field: 'id', headerName: 'No', width: 100, headerClassName: 'no-column-header', cellClassName: 'no-column-cell' },
    { field: 'projectName', headerName: '프로젝트명', width: 300 },
    { field: 'taskName', headerName: '작업명', width: 250 },
    { field: 'remainingTasks', headerName: '잔여작업', width: 110 },
    { field: 'myTasks', headerName: '내 작업수', width: 110 },
    { field: 'inspectionWaiting', headerName: '검수대기', width: 110 },
    { field: 'rejected', headerName: '반려', width: 110 },
    { field: 'inspectionDone', headerName: '검수완료', width: 110 },
    { field: 'deadline', headerName: '기한일', width: 180 },
];

const rows = [
        { id: 1, projectName: '설정 가능한 모듈형 공구', taskName: 'natus 작업', remainingTasks: '63', myTasks: '25', inspectionWaiting: '20', rejected: '003', inspectionDone: '011', deadline: '2024-07-21 22:47' },
        { id: 2, projectName: '객체 기반의 안정적 유연성', taskName: 'quae 작업', remainingTasks: '121', myTasks: '48', inspectionWaiting: '39', rejected: '005', inspectionDone: '009', deadline: '2024-07-10 17:11' },
        { id: 3, projectName: '출판된 지역적 융합', taskName: 'quos 작업', remainingTasks: '145', myTasks: '143', inspectionWaiting: '32', rejected: '017', inspectionDone: '026', deadline: '2024-01-02 13:41' },
        { id: 4, projectName: '특별한 객체 지향적 도전', taskName: 'totam 작업', remainingTasks: '165', myTasks: '54', inspectionWaiting: '25', rejected: '002', inspectionDone: '030', deadline: '2024-05-01 09:44' },
        { id: 5, projectName: '완벽히 설정된 실시간 인트라넷', taskName: 'libero 작업', remainingTasks: '170', myTasks: '123', inspectionWaiting: '43', rejected: '020', inspectionDone: '008', deadline: '2024-05-05 06:14' },
        { id: 6, projectName: '적응된 고도 기반 인트라넷', taskName: 'repellendus 작업', remainingTasks: '88', myTasks: '141', inspectionWaiting: '41', rejected: '005', inspectionDone: '009', deadline: '2024-09-03 07:27' },
        { id: 7, projectName: '더 작아진 멀티미디어 컨셉', taskName: 'autem 작업', remainingTasks: '125', myTasks: '87', inspectionWaiting: '38', rejected: '017', inspectionDone: '017', deadline: '2024-08-11 15:34' },
        { id: 8, projectName: '안정적인 다이나믹 알고리즘', taskName: 'magnam 작업', remainingTasks: '154', myTasks: '49', inspectionWaiting: '9', rejected: '007', inspectionDone: '015', deadline: '2024-04-11 13:42' },
        { id: 9, projectName: '자가 이용 가능한 분리형 인코딩', taskName: 'laboriosam 작업', remainingTasks: '140', myTasks: '123', inspectionWaiting: '16', rejected: '015', inspectionDone: '010', deadline: '2024-04-29 18:42' },
        { id: 10, projectName: '크로스 그룹 6세대 솔루션', taskName: 'exercitationem 작업', remainingTasks: '160', myTasks: '52', inspectionWaiting: '28', rejected: '010', inspectionDone: '027', deadline: '2024-01-18 20:09' }
];

const Workstatus = () => {
    const [category, setCategory] = useState('');
    const [period, setPeriod] = useState('');
    const [startDate, setStartDate] = useState(dayjs().subtract(1, 'day'));
    const [endDate] = useState(dayjs()); // 종료 날짜는 오늘 날짜로 고정
    const [searchKeyword, setSearchKeyword] = useState('');

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
        width: '140px',
    };

    return (
        <div id="WorkStatus" className="tab-content">
            <h3>작업 관리</h3>

            {/* 검색바 및 필터 섹션 */}
            <div className="workstatus__filter-container">
                {/* 카테고리 필터 */}
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel sx={{ color: "#7785BE" }}>카테고리</InputLabel>
                    <Select
                        className="workstatus__filter-select"
                        value={category}
                        label="카테고리"
                        onChange={(e) => setCategory(e.target.value)}
                        sx={commonSelectStyles}
                    >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value="all">전체</MenuItem>
                        <MenuItem value="projectName">프로젝트명</MenuItem>
                        <MenuItem value="workName">작업명</MenuItem>
                    </Select>
                </FormControl>

            {/* 구분선 */}
            <div className="workstatus__filter-divider"></div>

                {/* 필터 그룹 2 */}
                {/* 기간 필터 */}
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth size="small">
                    <InputLabel className="workstatus__filter-group"
                    sx={{
                        color: "#7785BE", // 라벨 폰트 색상
                    }}
                    >기간</InputLabel>
                    <Select
                        className="workstatus__filter-select"
                        value={period}
                        label="period"
                        onChange={handlePeriodChange}
                        variant="outlined"
                        sx={{
                            color: "#7785BE", // 선택된 값의 폰트 색깔 변경
                            ".MuiOutlinedInput-notchedOutline": {
                                borderColor: "#7785BE", // Select의 외곽선 색깔 변경
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#7785BE", // 호버 시 외곽선 색깔 변경
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#7785BE", // 포커스된 상태에서의 외곽선 색상
                            },
                            ".MuiSelect-icon": {
                                color: "#7785BE", // 드롭다운 아이콘의 색상 변경
                            },
                            width: '130px',
                        }}
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
                        <div className="workstatus__filter-group" style={{ display: 'flex', gap: '8px' }}>
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
                                        className="workstatus__filter-select"
                                    />
                                )}
                            />
                            {/* 종료 날짜: 현재 날짜로 고정 */}
                            <TextField
                                label="종료 날짜"
                                value={endDate.format('YYYY-MM-DD')}
                                className="workstatus__filter-select"
                                size="small"
                                disabled
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

                <div className="alarm__filter-divider"></div>

                {/* 검색 입력 */}
                <TextField
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="검색어를 입력하세요."
                    size="small"
                    variant="outlined"
                    sx={{ width: '400px'}}
                />

                {/* 검색 버튼 */}
                <button type='button' className="workstatus__search-btn">검색</button>
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
                        cell: 'custom-cell',
                        columnHeader: 'custom-header',
                    }}
                />
            </Box>

            {/* 페이지네이션 섹션 */}
            <div className="workstatus-pagination-container">
                <Stack spacing={2} sx={{ marginBottom: '80px' }}>
                    <Pagination count={10} color="primary" />
                </Stack>
            </div>
        </div>
    );
};

export default Workstatus;
