import React, { Component } from 'react';
import FileList from '../components/projectStructure/adminProjectStructureFileList/FileList.jsx';
import Navbar from '../components/projectStructure/adminProjectStructureNavbar/Navbar.jsx';
import ContextMenu from '../components/projectStructure/adminProjectStructureContextMenu/ContextMenu.jsx';
import Dialogs from '../components/projectStructure/adminProjectStructureDialogs/Dialogs.jsx';


import {ThemeProvider as MaterialUI, createTheme, Button} from '@mui/material';
import { blue } from '@mui/material/colors';
import {connect} from 'react-redux';
import {setContextMenuVisible, refreshFileList, goToParentDirectory} from '../actions/Actions.js';
import DynamicSnackbar from '../components/projectStructure/adminProjectStructureNotification/DynamicSnackbar.jsx';
import TreeView from "../components/projectStructure/adminProjectStructureTreeView/TreeView";

const theme = createTheme({
    palette: {
        primary: blue,
    }
});

class AdministratorProjectStructure extends Component {

    componentDidMount() {
        this.props.init();
    };

    render() {
        return (
                <MaterialUI theme={theme}>
                    <div onClick={this.props.handleHideContextMenu} onContextMenu={this.props.handleHideContextMenu}>
                        <Navbar />
                        <Button variant="outlined" onClick={this.props.goToParentDirectory}>
                            상위 폴더로 이동
                        </Button>
                        {/*<TreeView/>*/}
                        <FileList />
                        <ContextMenu />
                        <DynamicSnackbar />
                        <Dialogs />
                    </div>
                </MaterialUI>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(refreshFileList());
        },
        goToParentDirectory: () => {
            dispatch(goToParentDirectory());  // 상위 폴더 이동 액션 디스패치
        },
        handleHideContextMenu: (event) => {
            if (! (event.target.tagName === 'INPUT' || /label/i.test(event.target.className))) {
                event.preventDefault();
            }
            dispatch(setContextMenuVisible(false));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdministratorProjectStructure);
