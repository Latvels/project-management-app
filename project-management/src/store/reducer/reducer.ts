import { combineReducers } from '@reduxjs/toolkit';
import appStateReducer from './appStateReducer';
import boardReducer from '../../api/boardApi';
import userReducer from '../../api/userApi';
import authReducer from '../../api/authApi';
import columnReducer from '../../api/columnApi';
import taskReducer from '../../api/taskApi';
import fileReducer from '../../api/fileApi';

const rootReducer = combineReducers({
    appState: appStateReducer,
    board: boardReducer,
    user: userReducer,
    auth: authReducer,
    column: columnReducer,
    task: taskReducer,
    file: fileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
