import { ActionKindAppState, SET_IS_CREATE_NEW_BOARD_MODAL_OPEN } from '../actionTypes';

interface IAppState {
  isCreateNewBoardModalOpen: boolean;
}

const initialState: IAppState = {
  isCreateNewBoardModalOpen: false,
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
    default: {
      return state;
    }
  }
}

export default appStateReducer;