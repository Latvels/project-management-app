import { ActionKindAppState, SET_DELETED_ID, SET_DELETED_ITEM, SET_IS_CONFIRM_MODAL_OPEN, SET_IS_CREATE_NEW_BOARD_MODAL_OPEN, SET_IS_EDIT_PROFILE_MODAL_OPEN, SET_IS_PRELOADER_OPEN } from '../actionTypes';

interface IAppState {
  isEditProfileModalOpen: boolean;
  isCreateNewBoardModalOpen: boolean;
  isPreloaderOpen: boolean;
  isConfirmModalOpen: boolean;
  deletedItem?: string | null,
  deletedId?: string | null,
}

const initialState: IAppState = {
  isCreateNewBoardModalOpen: false,
  isPreloaderOpen: false,
  isEditProfileModalOpen: false,
  isConfirmModalOpen: false,
}

interface IAction {
  type: ActionKindAppState;
  payload?: boolean | string | null;
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
    case SET_IS_CONFIRM_MODAL_OPEN: 
    {
      return {
        ...state,
        isConfirmModalOpen: action.payload as boolean,
      }
    }
    case SET_DELETED_ITEM: 
    {
      return {
        ...state,
        deletedItem: action.payload as string,
      }
    }
    case SET_DELETED_ID: 
    {
      return {
        ...state,
        deletedId: action.payload as string,
      }
    }
    default: {
      return state;
    }
  }
}

export default appStateReducer;