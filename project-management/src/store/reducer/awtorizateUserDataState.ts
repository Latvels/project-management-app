import { ActionKindAppState, SET_USER_DATA } from '../actionTypes';
import { All } from '../../typings/typings';
interface RootUser {
  user?: string | null;
  id?: string | null;
  email?: string | null;
  password?: string | null;
  name?: string | null;
}

const initialState: RootUser = {
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
        user: action.payload,
      }
    }
    default: {
      return state;
    }
  }
}

export default stateReducer;
