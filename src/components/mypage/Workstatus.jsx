import React from 'react';
import { Box, Select, MenuItem, TextField, Button, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
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
    { id: 1, projectName: '입원(입원) 진료비 영수증 수집', taskName: '@@@ 작업', remainingTasks: '100', myTasks: '100', inspectionWaiting: '13', rejected: '000', inspectionDone: '000', deadline: '2024-09-10 23:00' },
    { id: 1, projectName: '입원(입원) 진료비 영수증 수집', taskName: '@@@ 작업', remainingTasks: '100', myTasks: '100', inspectionWaiting: '13', rejected: '000', inspectionDone: '000', deadline: '2024-09-10 23:00' },
    { id: 1, projectName: '입원(입원) 진료비 영수증 수집', taskName: '@@@ 작업', remainingTasks: '100', myTasks: '100', inspectionWaiting: '13', rejected: '000', inspectionDone: '000', deadline: '2024-09-10 23:00' },
    { id: 1, projectName: '입원(입원) 진료비 영수증 수집', taskName: '@@@ 작업', remainingTasks: '100', myTasks: '100', inspectionWaiting: '13', rejected: '000', inspectionDone: '000', deadline: '2024-09-10 23:00' },
    { id: 1, projectName: '입원(입원) 진료비 영수증 수집', taskName: '@@@ 작업', remainingTasks: '100', myTasks: '100', inspectionWaiting: '13', rejected: '000', inspectionDone: '000', deadline: '2024-09-10 23:00' },
    { id: 1, projectName: '입원(입원) 진료비 영수증 수집', taskName: '@@@ 작업', remainingTasks: '100', myTasks: '100', inspectionWaiting: '13', rejected: '000', inspectionDone: '000', deadline: '2024-09-10 23:00' },
    { id: 1, projectName: '입원(입원) 진료비 영수증 수집', taskName: '@@@ 작업', remainingTasks: '100', myTasks: '100', inspectionWaiting: '13', rejected: '000', inspectionDone: '000', deadline: '2024-09-10 23:00' },
    { id: 1, projectName: '입원(입원) 진료비 영수증 수집', taskName: '@@@ 작업', remainingTasks: '100', myTasks: '100', inspectionWaiting: '13', rejected: '000', inspectionDone: '000', deadline: '2024-09-10 23:00' },
    { id: 1, projectName: '입원(입원) 진료비 영수증 수집', taskName: '@@@ 작업', remainingTasks: '100', myTasks: '100', inspectionWaiting: '13', rejected: '000', inspectionDone: '000', deadline: '2024-09-10 23:00' },
    { id: 1, projectName: '입원(입원) 진료비 영수증 수집', taskName: '@@@ 작업', remainingTasks: '100', myTasks: '100', inspectionWaiting: '13', rejected: '000', inspectionDone: '000', deadline: '2024-09-10 23:00' },
    ];

    const Workstatus = () => {
    return (
        <div id="WorkStatus" className="tab-content">
        <h3>작업 관리</h3>
            {/* 검색바 및 필터 섹션 */}
            <div className="workstatus__filter-container">
            {/* 필터 그룹 1 */}
                <div className="workstatus__filter-group">
                <select className="workstatus__filter-select">
                    <option value="date">기한일</option>
                    {/* 추가 옵션 */}
                </select>
                <select className="workstatus__filter-select">
                    <option value="worker">작업인원</option>
                    {/* 추가 옵션 */}
                </select>
                </div>

            {/* 구분선 */}
                <div className="workstatus__filter-divider"></div>

            {/* 필터 그룹 2 */}
                <div className="workstatus__filter-group">
                <select className="workstatus__filter-select">
                    <option value="category">대분류</option>
                    {/* 추가 옵션 */}
                </select>
                <select className="workstatus__filter-select">
                    <option value="subcategory">중분류</option>
                    {/* 추가 옵션 */}
                </select>
                </div>

            {/* 검색 입력 */}
                <input type="text" className="workstatus__search-input" placeholder="검색어를 입력하세요." />

            {/* 검색 버튼 */}
                <button className="workstatus__search-btn">검색</button>
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
