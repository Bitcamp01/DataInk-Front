import React from 'react'
import SearchComponent from '../components/labelling/SearchComponent'
import CustomTreeView from '../components/labelling/TreeView'
import DataGridDemo from '../components/Table'
import { Grid } from '@mui/material'

const labelling = () => {
  return (
    <Grid container>
      <SearchComponent/>
      <Grid container>
        <Grid item xs={1}>
          <CustomTreeView/>
        </Grid>

        <Grid item xs={1.5}>
        </Grid> 

        <Grid item flex={1} sx={{ marginTop: '8.625rem', marginRight: '3rem' }}>
          <DataGridDemo />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default labelling