import { ActionKindAppState, SET_CURRENT_BOARD_ID, SET_DELETED_ID, SET_DELETED_ITEM, SET_IS_CONFIRM_MODAL_OPEN, SET_IS_CREATE_NEW_BOARD_MODAL_OPEN, SET_IS_EDIT_PROFILE_MODAL_OPEN, SET_IS_PRELOADER_OPEN, SET_LANG } from '../actionTypes';

interface IAppState {
  isEditProfileModalOpen: boolean;
  isCreateNewBoardModalOpen: boolean;
  isPreloaderOpen: boolean;
  isConfirmModalOpen: boolean;
  deletedItem?: 'board' | 'task' | 'user' | null,
  deletedId?: string | null,
  currentBoardId: string | null,
  lang: 'en' | 'ru'
}

const initialState: IAppState = {
  isCreateNewBoardModalOpen: false,
  isPreloaderOpen: false,
  isEditProfileModalOpen: false,
  isConfirmModalOpen: false,
  currentBoardId: null,
  lang: 'ru',
}

interface IAction {
  type: ActionKindAppState;
  payload?: boolean | string | null;
}

function appStateReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case SET_IS_CREATE_NEW_BOARD_MODAL_OPEN: {
      return {
        ...state,
        isCreateNewBoardModalOpen: action.payload as boolean,
      };
    }
    case SET_IS_PRELOADER_OPEN: {
      return {
        ...state,
        isPreloaderOpen: action.payload as boolean,
      };
    }
    case SET_IS_EDIT_PROFILE_MODAL_OPEN: {
      return {
        ...state,
        isEditProfileModalOpen: action.payload as boolean,
      };
    }
    case SET_IS_CONFIRM_MODAL_OPEN: {
      return {
        ...state,
        isConfirmModalOpen: action.payload as boolean,
      };
    }
    case SET_DELETED_ITEM: {
      return {
        ...state,
        deletedItem: action.payload as 'user' | 'board' | 'task' | null,
      };
    }
    case SET_DELETED_ID: 
    {
      return {
        ...state,
        deletedId: action.payload as string,
      }
    }
    case SET_CURRENT_BOARD_ID: 
    {
      return {
        ...state,
        currentBoardId: action.payload as string,
      }
    }
    case SET_LANG: 
    {
      return {
        ...state,
        lang: action.payload as 'ru' | 'en',
      }
    }
    default: {
      return state;
    }
  }
}

export default appStateReducer;
