import { ActionKindAppState, SET_USER_DATA } from '../actionTypes';

interface RootUser {
  // ! может вы придумаете какой тут тип должен быть
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any,
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
