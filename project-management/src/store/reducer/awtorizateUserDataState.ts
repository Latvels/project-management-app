import { ActionKindAppState, SET_USER_DATA } from '../actionTypes';

interface IState {
  data: RootUser;
}

type RootUser = {
  user?: {
    _id?: string | null,
    email?: string | null,
    password?: string | null,
    name?: string | null,
  }
}

const initialState: IState = {
  data: {
  }
}

interface IAction {
  type: ActionKindAppState;
  payload?: boolean;
}

function stateReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case SET_USER_DATA: 
    {
      return {
        ...state,
        data: action.payload,
      }
    }
    default: {
      return state;
    }
  }
}

export default stateReducer;