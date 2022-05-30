import {
  SET_DELETED_ID,
  SET_USER_DATA,
  SET_DELETED_ITEM,
  SET_IS_CONFIRM_MODAL_OPEN,
  SET_IS_CREATE_NEW_BOARD_MODAL_OPEN,
  SET_IS_EDIT_PROFILE_MODAL_OPEN,
  SET_IS_PRELOADER_OPEN,
  SET_CURRENT_BOARD_ID,
  SET_LANG,
  SET_IS_CREATE_TASK_MODAL_OPEN,
  SET_IS_CREATE_COLUMN_MODAL_OPEN,
  SET_IS_EDIT_TASK_MODAL_OPEN,
} from '../actionTypes';

export function setIsCreateNewBoardModalOpen(isOpen: boolean) {
  return { type: SET_IS_CREATE_NEW_BOARD_MODAL_OPEN, payload: isOpen };
}
export function setIsCreateColumnModalOpen(isOpen: boolean) {
  return { type: SET_IS_CREATE_COLUMN_MODAL_OPEN, payload: isOpen };
}

export function setIsCreateTaskModalOpen(isOpen: boolean) {
  return { type: SET_IS_CREATE_TASK_MODAL_OPEN, payload: isOpen };
}

export function setIsEditTaskModalOpen(isOpen: boolean) {
  return { type: SET_IS_EDIT_TASK_MODAL_OPEN, payload: isOpen };
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

export function setDeletedId(deletedId: string | null) {
  return { type: SET_DELETED_ID, payload: deletedId };
}

export function setCurrentBoardId(boardId: string | null) {
  return { type: SET_CURRENT_BOARD_ID, payload: boardId };
}

export function setLang(lang: 'ru' | 'en') {
  return { type: SET_LANG, payload: lang };
}

export function setUserData(data: { email?: string; password?: string; name?: string }) {
  return { type: SET_USER_DATA, payload: data };
}
