import { SET_IS_CREATE_NEW_BOARD_MODAL_OPEN } from '../actionTypes';

export function setIsCreateNewBoardModalOpen(isOpen: boolean) {
  return { type: SET_IS_CREATE_NEW_BOARD_MODAL_OPEN, payload: isOpen };
}