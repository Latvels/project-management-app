import { SET_IS_CREATE_NEW_BOARD_MODAL_OPEN, SET_IS_PRELOADER_OPEN } from '../actionTypes';

export function setIsCreateNewBoardModalOpen(isOpen: boolean) {
  return { type: SET_IS_CREATE_NEW_BOARD_MODAL_OPEN, payload: isOpen };
}

export function setIsPreloaderOpen(isOpen: boolean) {
  return { type: SET_IS_PRELOADER_OPEN, payload: isOpen };
}