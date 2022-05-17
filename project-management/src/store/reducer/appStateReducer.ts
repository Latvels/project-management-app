import { ActionKindAppState, SET_IS_CREATE_NEW_BOARD_MODAL_OPEN, SET_IS_EDIT_PROFILE_MODAL_OPEN, SET_IS_PRELOADER_OPEN } from '../actionTypes';

interface IAppState {
  isEditProfileModalOpen: boolean;
  isCreateNewBoardModalOpen: boolean;
  isPreloaderOpen: boolean;
}

const initialState: IAppState = {
  isCreateNewBoardModalOpen: false,
  isPreloaderOpen: false,
  isEditProfileModalOpen: false,
}

interface IAction {
  type: ActionKindAppState;
  payload?: boolean;
}

function appStateReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case SET_IS_CREATE_NEW_BOARD_MODAL_OPEN: 
    {
      return {
        ...state,
        isCreateNewBoardModalOpen: action.payload as boolean,
      }
    }
    case SET_IS_PRELOADER_OPEN: 
    {
      return {
        ...state,
        isPreloaderOpen: action.payload as boolean,
      }
    }
    case SET_IS_EDIT_PROFILE_MODAL_OPEN: 
    {
      return {
        ...state,
        isEditProfileModalOpen: action.payload as boolean,
      }
    }
    default: {
      return state;
    }
  }
}

export default appStateReducer;