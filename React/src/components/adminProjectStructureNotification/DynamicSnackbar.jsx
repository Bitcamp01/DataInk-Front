import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';  // withStyles 대신 makeStyles 사용
import Snackbar from '@mui/material/Snackbar';  // Material-UI v5
import IconButton from '@mui/material/IconButton';  // Material-UI v5
import CloseIcon from '@mui/icons-material/Close';  // Material-UI v5
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5),  // 최신 spacing 방식으로 변경
  },
}));

const DynamicSnackbar = (props) => {
  const { errorMsg, handleClose, open, notificationDuration } = props;
  const classes = useStyles();  // withStyles 대신 makeStyles를 사용해 클래스 생성

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={notificationDuration}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{errorMsg}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
};

DynamicSnackbar.propTypes = {
  errorMsg: PropTypes.string,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  notificationDuration: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    open: !!state.errorMsg,  // 에러 메시지가 있을 때만 열림
    errorMsg: state.errorMsg,
    notificationDuration: state.notificationDuration || 60000,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleClose: () => {
      dispatch({
        type: 'SET_ERROR_MSG',
        value: null,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DynamicSnackbar);
