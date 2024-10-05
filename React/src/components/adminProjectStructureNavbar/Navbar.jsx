import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { alpha } from '@mui/material/styles';  // fade 대신 alpha 사용
import { makeStyles } from '@mui/styles';  // withStyles 대신 makeStyles 사용
import SearchIcon from '@mui/icons-material/Search';
import { connect } from 'react-redux';
import { setFileListFilter, enterToPreviousDirectoryByIndex, enterToPreviousDirectory } from '../../actions/Actions.js';
import ThreeDotsMenu from './ThreeDotsMenu.jsx';
import BreadcrumbText from '../adminProjectStructureBreadcrumb/BreadcrumbText.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: '4.3em',
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'block', // was none
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),  // fade 대신 alpha 사용
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),  // spacing.unit 대신 spacing 사용
      width: 'auto',
      display: 'block',
    },
  },
  searchIcon: {
    width: theme.spacing(9),  // spacing.unit 대신 spacing 사용
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(1),  // spacing.unit 대신 spacing 사용
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 100,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

function SearchAppBar(props) {
  const classes = useStyles();  // withStyles 대신 makeStyles 사용
  const { path, handleClickPath, handleGoBack, canGoBack, value, handleChange } = props;

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            <BreadcrumbText
              path={path}
              handleClickPath={handleClickPath}
              handleGoBack={handleGoBack}
              canGoBack={canGoBack}
              rootTitle="React Filemanager"
            />
          </Typography>
          <div className={classes.grow} />

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={value}
              onChange={handleChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <ThreeDotsMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
}

SearchAppBar.propTypes = {
  path: PropTypes.array.isRequired,
  handleClickPath: PropTypes.func.isRequired,
  handleGoBack: PropTypes.func.isRequired,
  canGoBack: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    value: state.fileListFilter || '',
    path: state.path,
    canGoBack: state.path.length > 0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (event) => {
      dispatch(setFileListFilter(event.currentTarget.value));
    },
    handleGoBack: () => {
      dispatch(enterToPreviousDirectory());
    },
    handleClickPath: (event, index) => {
      dispatch(enterToPreviousDirectoryByIndex(index));
      event.preventDefault();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchAppBar);
