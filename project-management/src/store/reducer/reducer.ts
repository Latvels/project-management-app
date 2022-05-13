import { combineReducers } from '@reduxjs/toolkit';
import appStateReducer from './appStateReducer';

const rootReducer = combineReducers({ appState: appStateReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
