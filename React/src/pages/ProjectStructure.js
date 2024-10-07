import React, { Component } from 'react';
import FileList from '../components/projectStructure/adminProjectStructureFileList/FileList.jsx';
import Navbar from '../components/projectStructure/adminProjectStructureNavbar/Navbar.jsx';
import ContextMenu from '../components/projectStructure/adminProjectStructureContextMenu/ContextMenu.jsx';
import Dialogs from '../components/projectStructure/adminProjectStructureDialogs/Dialogs.jsx';


import { ThemeProvider as MaterialUI, createTheme } from '@mui/material';
import { blue } from '@mui/material/colors';
import { connect } from 'react-redux';
import { setContextMenuVisible, refreshFileList } from '../actions/Actions.js';
import DynamicSnackbar from '../components/projectStructure/adminProjectStructureNotification/DynamicSnackbar.jsx';

const theme = createTheme({
    palette: {
        primary: blue,
    },
    typography: {
        useNextVariants: true, // 이 옵션은 더 이상 필요하지 않습니다.
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

        handleHideContextMenu: (event) => {
            if (! (event.target.tagName === 'INPUT' || /label/i.test(event.target.className))) {
                event.preventDefault();
            }
            dispatch(setContextMenuVisible(false));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdministratorProjectStructure);
