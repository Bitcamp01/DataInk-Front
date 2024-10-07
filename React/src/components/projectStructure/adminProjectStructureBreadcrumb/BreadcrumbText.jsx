import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';  // Material-UI v5
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';  // Material-UI v5
import Button from '@mui/material/Button';  // Material-UI v5
import './BreadcrumbText.css';

const useStyles = makeStyles((theme) => ({
  lastPath: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  paths: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

function BreadcrumbText({ handleClickPath, path, rootTitle, handleGoBack, canGoBack }) {
  const classes = useStyles();
  
  const separator = <span>&gt;</span>;
  const rootPath = (
    <span onClick={(e) => handleClickPath(e, -1, path)} data-index={0}>
      {rootTitle} {path.length ? separator : ''}
    </span>
  );
  const lastPath = [...path].pop() || rootTitle;

  const directories = path.map((dir, index) => (
    <span key={index} data-index={index} onClick={(e) => handleClickPath(e, index, path)}>
      <span>{dir}</span> {path.length - 1 !== index ? separator : ''}&nbsp;
    </span>
  ));

  return (
    <div className="BreadcrumbText">
      <div className={classes.lastPath}>
        <Button onClick={handleGoBack} color="inherit" type="button" style={{ display: canGoBack ? 'inline-flex' : 'none' }}>
          <KeyboardArrowLeftIcon />
        </Button>
        {lastPath}
      </div>
      <div className={classes.paths}>
        {rootPath} {directories}
      </div>
    </div>
  );
}

export default BreadcrumbText;
