import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';  // Material-UI v5
import Grid from '@mui/material/Grid';  // Material-UI v5
import { makeStyles } from '@mui/styles';  // withStyles 대신 makeStyles 사용

const useStyles = makeStyles((theme) => ({
  progress: {
    margin: theme.spacing(10),  // spacing.unit 대신 spacing 사용
  },
}));

function Loader(props) {
  const classes = useStyles();  // withStyles 대신 makeStyles 사용
  return (
    <Grid container justifyContent="center">  {/* justify 대신 justifyContent 사용 (v5 변경) */}
      <CircularProgress className={classes.progress} color="secondary" />
    </Grid>
  );
}

Loader.propTypes = {
  classes: PropTypes.object,
};

export default Loader;
