import {
  SET_USER_DATA,
  SET_DELETED_ITEM,
  SET_IS_CONFIRM_MODAL_OPEN,
  SET_IS_CREATE_NEW_BOARD_MODAL_OPEN,
  SET_IS_EDIT_PROFILE_MODAL_OPEN,
  SET_IS_PRELOADER_OPEN,
} from '../actionTypes';

export function setIsCreateNewBoardModalOpen(isOpen: boolean) {
  return { type: SET_IS_CREATE_NEW_BOARD_MODAL_OPEN, payload: isOpen };
}

export function setIsPreloaderOpen(isOpen: boolean) {
  return { type: SET_IS_PRELOADER_OPEN, payload: isOpen };
}

export function setIsEditProfileModalOpen(isOpen: boolean) {
  return { type: SET_IS_EDIT_PROFILE_MODAL_OPEN, payload: isOpen };
}

export function setIsConfirmModalOpen(isOpen: boolean) {
  return { type: SET_IS_CONFIRM_MODAL_OPEN, payload: isOpen };
}

export function setDeletedItem(deletedItem: string | null) {
  return { type: SET_DELETED_ITEM, payload: deletedItem };
}

export function setUserData(data: { email?: string; password?: string; name?: string }) {
  return { type: SET_USER_DATA, payload: data };
}
