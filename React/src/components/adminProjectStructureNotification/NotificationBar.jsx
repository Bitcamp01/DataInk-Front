import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';  // Material-UI v5
import ErrorIcon from '@mui/icons-material/Error';  // Material-UI v5
import InfoIcon from '@mui/icons-material/Info';  // Material-UI v5
import WarningIcon from '@mui/icons-material/Warning';  // Material-UI v5
import { green, amber } from '@mui/material/colors';  // Material-UI v5
import SnackbarContent from '@mui/material/SnackbarContent';  // Material-UI v5
import { makeStyles } from '@mui/styles';  // withStyles 대신 makeStyles 사용
import { connect } from 'react-redux';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

// 첫 번째 스타일 (MySnackbarContent용)
const useStyles1 = makeStyles((theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),  // spacing.unit 대신 spacing 사용
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function MySnackbarContent(props) {
  const { open, className, message, variant, ...other } = props;
  const classes = useStyles1();
  const Icon = variantIcon[variant];

  return open ? (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      {...other}
    />
  ) : null;
}

MySnackbarContent.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

// 두 번째 스타일 (CustomizedSnackbars용)
const useStyles2 = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),  // spacing.unit 대신 spacing 사용
  },
}));

function CustomizedSnackbars(props) {
  const { open, errorMsg } = props;
  const classes = useStyles2();

  return (
    <MySnackbarContent
      variant="error"
      open={open}
      className={classes.margin}
      message={errorMsg}
    />
  );
}

CustomizedSnackbars.propTypes = {
  open: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    open: !!state.errorMsg,
    errorMsg: state.errorMsg,
  };
};

export default connect(mapStateToProps)(CustomizedSnackbars);
