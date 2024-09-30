import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';

const columns = [
  { field: 'id', headerName: '이름', width: 150 },
  { field: 'department', headerName: '소속(부서)', width: 150 },
  { field: 'role', headerName: '역할', width: 150 },
];

const allMembersRows = [
  { id: 1, name: '김영크', department: '소속(부서)', role: '관리자' },
  { id: 2, name: '김영크', department: '소속(부서)', role: '검수자' },
  { id: 3, name: '김영크', department: '소속(부서)', role: '라벨러' },
  { id: 4, name: '김영크', department: '소속(부서)', role: '라벨러' },
  { id: 5, name: '김영크', department: '소속(부서)', role: '라벨러' },
  { id: 6, name: '김영크', department: '소속(부서)', role: '라벨러' },
  { id: 7, name: '김영크', department: '소속(부서)', role: '라벨러' },
  { id: 8, name: '김영크', department: '소속(부서)', role: '라벨러' },
  { id: 9, name: '김영크', department: '소속(부서)', role: '라벨러' },
];

export default function Table_projectList_Modal() {
  const [selectedAllMembers, setSelectedAllMembers] = React.useState([]);
  const [projectMembers, setProjectMembers] = React.useState([]);

  const handleAddMembers = () => {
    const newMembers = allMembersRows.filter((row) =>
      selectedAllMembers.includes(row.id)
    );
    setProjectMembers((prev) => [...prev, ...newMembers]);
    setSelectedAllMembers([]);
  };

  const handleRemoveMembers = () => {
    const remainingMembers = projectMembers.filter(
      (member) => !selectedAllMembers.includes(member.id)
    );
    setProjectMembers(remainingMembers);
    setSelectedAllMembers([]);
  };

  return (
    <Box sx={{ width: '100%', padding: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <h2>전체 멤버</h2>
          <p>
            프로젝트에 참여시킬 멤버를 선택 후, 화살표 아이콘을 눌러 해당
            프로젝트에 참여해주세요.
          </p>
          <DataGrid
            rows={allMembersRows}
            columns={columns}
            checkboxSelection
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            onSelectionModelChange={(newSelection) => {
              setSelectedAllMembers(newSelection);
            }}
            selectionModel={selectedAllMembers}
          />
        </Grid>

        <Grid item xs={2} container alignItems="center" justifyContent="center">
          <Stack spacing={2}>
            <Button
              variant="contained"
              onClick={handleAddMembers}
              disabled={selectedAllMembers.length === 0}
            >
              <ArrowForwardIcon />
            </Button>
            <Button
              variant="contained"
              onClick={handleRemoveMembers}
              disabled={selectedAllMembers.length === 0}
            >
              <ArrowBackIcon />
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={5}>
          <h2>프로젝트 참여 멤버</h2>
          <p>
            프로젝트에서 제외할 멤버를 선택 후, 화살표 아이콘을 눌러 해당
            프로젝트에서 제외해주세요.
          </p>
          <DataGrid
            rows={projectMembers}
            columns={columns}
            checkboxSelection
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            onSelectionModelChange={(newSelection) => {
              setSelectedAllMembers(newSelection);
            }}
            selectionModel={selectedAllMembers}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button variant="contained" color="primary">
          저장
        </Button>
      </Box>
    </Box>
  );
}
