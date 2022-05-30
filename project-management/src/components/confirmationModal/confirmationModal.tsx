import react from 'react';
import { Backdrop, Box, Modal, Fade, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducer/reducer';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { useTranslation } from 'react-i18next';
import { TIMEOUT_FOR_MODAL } from '../../constants/constant';
import {
  setDeletedItem,
  setIsConfirmModalOpen,
  setIsPreloaderOpen,
} from '../../store/action/appStateAction';
import { AppDispatch } from '../../store/store';
import { deleteUser, userSlise } from '../../api/userApi';
import { boardSlise, deleteBoard } from '../../api/boardApi';
import { deleteTask, taskSlise } from '../../api/taskApi';
import { authSlise } from '../../api/authApi';
import { ACTION_STATUSES, Error, Task } from '../../typings/typings';
import { useNavigate } from 'react-router-dom';
import { BasicAlerts } from '../compunents';
import './confirmationModal.scss';
import { columnSlise, deleteColumn } from '../../api/columnApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ConfirmationModal() {
  const navigate = useNavigate();
  const appState = useSelector((state: RootState) => state.appState);
  const appDispatch = useDispatch<AppDispatch>();
  const boardState = useSelector((state: RootState) => state.board);
  const boardRequestStatus = useSelector((state: RootState) => state.board.boardRequestStatus);
  const boardRequestError: Error = useSelector((state: RootState) => state.board.error);
  const { resetBoardRequestStatus, removeTask, removeColumn } = boardSlise.actions;
  const taskRequestStatus = useSelector((state: RootState) => state.task.taskRequestStatus);
  const taskRequestError: Error = useSelector((state: RootState) => state.task.error);
  const { resetTaskRequestStatus } = taskSlise.actions;
  const userRequestStatus = useSelector((state: RootState) => state.user.userRequestStatus);
  const userRequestError: Error = useSelector((state: RootState) => state.user.error);
  const { resetUserRequestStatus } = userSlise.actions;
  const columnRequestStatus = useSelector((state: RootState) => state.column.columnRequestStatus);
  const columnRequestError: Error = useSelector((state: RootState) => state.column.error);
  const { resetColumnRequestStatus } = columnSlise.actions;

  const { resetStatuses } = authSlise.actions;
  const deletedItem = appState.deletedItem as 'user' | 'board' | 'task' | 'column';

  const { t } = useTranslation();
  const title = t('confirmationModal:title');
  const commonText = t('confirmationModal:commonText');
  const deleteUserText = t('confirmationModal:deleteUserText');
  const deleteTaskText = t('confirmationModal:deleteTaskText');
  const deleteBoardText = t('confirmationModal:deleteBoardText');
  const deleteColumnText = t('confirmationModal:deleteColumnText');
  const buttonYesText = t('confirmationModal:buttonYes');
  const buttonNoText = t('confirmationModal:buttonNo');

  const handleClose = () => {
    appDispatch(setIsConfirmModalOpen(false));
    switch (deletedItem) {
      case 'board':
        appDispatch(resetBoardRequestStatus());
        break;
      case 'task':
        appDispatch(resetTaskRequestStatus());
        break;
      case 'column':
        appDispatch(resetColumnRequestStatus());
        break;
      case 'user':
        appDispatch(resetUserRequestStatus());
    }
  };

  const getConfirmationText = (): string => {
    switch (deletedItem) {
      case 'user':
        return `${commonText} ${deleteUserText}?`;
        break;
      case 'board':
        return `${commonText} ${deleteBoardText}?`;
        break;
      case 'column':
        return `${commonText} ${deleteColumnText}?`;
        break;
      case 'task':
        return `${commonText} ${deleteTaskText}?`;
    }
  };

  const logOut = () => {
    appDispatch(resetStatuses());
    navigate('/');
  };

  const handleYesClick = async () => {
    if (deletedItem === 'user') {
      appDispatch(setIsPreloaderOpen(true));
      const resp = await appDispatch(deleteUser(String(appState.deletedId)));
      appDispatch(setIsPreloaderOpen(false));
      if (resp.meta.requestStatus === 'fulfilled') {
        appDispatch(setIsConfirmModalOpen(false));
        appDispatch(resetUserRequestStatus());
        logOut();
      }
    } else if (deletedItem === 'board') {
      appDispatch(setIsPreloaderOpen(true));
      const resp = await appDispatch(deleteBoard(String(appState.deletedId)));
      appDispatch(setIsPreloaderOpen(false));
      if (resp.meta.requestStatus === 'fulfilled') {
        appDispatch(resetBoardRequestStatus());
        appDispatch(setIsConfirmModalOpen(false));
      }
    } else if (deletedItem === 'column') {
      appDispatch(setIsPreloaderOpen(true));
      const reqData = {
        idBoard: boardState.currentBoard!.id,
        id: appState.deletedId!,
      };
      const resp = await appDispatch(deleteColumn(reqData));
      appDispatch(setIsPreloaderOpen(false));
      if (resp.meta.requestStatus === 'fulfilled') {
        appDispatch(resetColumnRequestStatus());
        appDispatch(removeColumn(reqData));
        appDispatch(setIsConfirmModalOpen(false));
      }
    } else if (deletedItem === 'task') {
      appDispatch(setIsPreloaderOpen(true));
      const taskData: Task = {
        columnId: boardState.currentColumn!.id,
        boardId: boardState.currentBoard!.id,
        id: boardState.currentTask!.id,
      };
      const resp = await appDispatch(deleteTask(taskData));
      appDispatch(setIsPreloaderOpen(false));
      if (resp.meta.requestStatus === 'fulfilled') {
        appDispatch(resetTaskRequestStatus());
        appDispatch(removeTask(taskData));
        appDispatch(setIsConfirmModalOpen(false));
      }
    }
  };

  const handleNoClick = () => {
    appDispatch(setDeletedItem(null));
    appDispatch(setIsConfirmModalOpen(false));
  };

  const getRequestStatus = () => {
    let status;
    switch (deletedItem) {
      case 'board':
        status = boardRequestStatus;
        break;
      case 'task':
        status = taskRequestStatus;
        break;
      case 'user':
        status = userRequestStatus;
        break;
      case 'column':
        status = columnRequestStatus;
        break;
    }
    return status;
  };

  const getRequestError = () => {
    let error;
    switch (deletedItem) {
      case 'board':
        error = boardRequestError;
        break;
      case 'task':
        error = taskRequestError;
        break;
      case 'user':
        error = userRequestError;
        break;
      case 'column':
        error = columnRequestError;
        break;
    }
    return error;
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={appState.isConfirmModalOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: TIMEOUT_FOR_MODAL,
      }}
    >
      <Fade in={appState.isConfirmModalOpen}>
        <Box sx={style}>
          <Box component="div" className="modal__title" sx={{ mb: 2 }}>
            <WarningAmberOutlinedIcon color="warning" sx={{ mr: 2 }}></WarningAmberOutlinedIcon>
            <Typography id="transition-modal-title" variant="h6" component="h4" color="warning">
              {title}
            </Typography>
          </Box>
          <Box>
            {getRequestStatus() === ACTION_STATUSES.REJECTED ? (
              <BasicAlerts error={getRequestError()} errorType={deletedItem} />
            ) : (
              <Box>
                <Box component="div" className="modal__text-wrapper" sx={{ mb: 2 }}>
                  <Typography id="transition-modal-title" variant="h6" component="h6">
                    <p>{getConfirmationText()}</p>
                  </Typography>
                </Box>
                <Box component="div" className="modal__buttons" sx={{ mb: 2 }}>
                  <Button
                    variant="outlined"
                    color="warning"
                    disabled={false}
                    onClick={handleYesClick}
                    type="button"
                    className="modal__button"
                  >
                    {buttonYesText}
                  </Button>
                  <Button
                    variant="outlined"
                    color="warning"
                    disabled={false}
                    onClick={handleNoClick}
                    type="button"
                    className="modal__button"
                  >
                    {buttonNoText}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ConfirmationModal;
