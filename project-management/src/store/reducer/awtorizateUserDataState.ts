import { ActionKindAppState, SET_USER_DATA } from '../actionTypes';
import { All, User } from '../../typings/typings';

interface RootUser {
  user?: User | null;
  id?: string | null;
  email?: string | null;
  password?: string | null;
  name?: string | null;
}

const initialState: RootUser = {};

interface IAction {
  type: ActionKindAppState;
  payload?: boolean | User;
}

function stateReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        user: action.payload as User,
      };
    }
    default: {
      return state;
    }
  }
}

export default stateReducer;
