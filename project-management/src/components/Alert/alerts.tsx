import * as React from 'react';
import { Box, Alert, IconButton, Collapse, AlertTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Error } from '../../typings/typings';
// import { useTranslation } from 'react-i18next';
import {useDispatch} from 'react-redux';
import { boardSlise } from '../../api/boardApi';
import { setIsConfirmModalOpen, setIsCreateColumnModalOpen, setIsCreateNewBoardModalOpen, setIsCreateTaskModalOpen, setIsEditProfileModalOpen, setIsEditTaskModalOpen } from '../../store/action/appStateAction';
import { TIMEOUT_FOR_ALERT } from '../../constants/constant';
import { userSlise } from '../../api/userApi';
import { taskSlise } from '../../api/taskApi';
import { columnSlise } from '../../api/columnApi';

type Props = {
  error: Error;
  errorType?: 'board' | 'task' | 'column' | 'user';
};

export default function BasicAlerts(props: Props) {
  const [open, setOpen] = React.useState(true);
  const { resetBoardRequestStatus } = boardSlise.actions;
  const { resetTaskRequestStatus } = taskSlise.actions;
  const { resetUserRequestStatus } = userSlise.actions;
  const { resetColumnRequestStatus } = columnSlise.actions;
  const appDispatch = useDispatch();
  const { status, message } = props.error;

  const resetStatuses = () => {
    switch (props.errorType) {
      case 'board':
        appDispatch(resetBoardRequestStatus());
        break;
      case 'user':
        appDispatch(resetUserRequestStatus());
        break;
      case 'column':
        appDispatch(resetColumnRequestStatus());
        break;
      case 'task':
        appDispatch(resetTaskRequestStatus());
    }
  }

  const closeModals = () => {
    appDispatch(setIsConfirmModalOpen(false));
    switch (props.errorType) {
      case 'board':
        appDispatch(setIsCreateNewBoardModalOpen(false));
        break;
      case 'user':
        appDispatch(setIsEditProfileModalOpen(false));
        break;
      case 'column':
        appDispatch(setIsCreateColumnModalOpen(false));
        break;
      case 'task':
        appDispatch(setIsCreateTaskModalOpen(false));
        appDispatch(setIsEditTaskModalOpen(false));
    }
  }

  const closeAlert = () => {
    closeModals();
    resetStatuses();
    setOpen(false);
  }

  React.useEffect(() => {
    const timer = setTimeout(closeAlert, TIMEOUT_FOR_ALERT );
    return () => {clearTimeout(timer)};
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        { props.errorType !== undefined ? (
          <Alert severity="error">
            <AlertTitle sx={{textTransform: 'uppercase'}}>{status ? status : 'rejected'}</AlertTitle>
            <strong>{message}</strong>
          </Alert>
        ) :
        (<Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={closeAlert}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle sx={{textTransform: 'uppercase'}}>{status ? status : 'rejected'}</AlertTitle>
          <strong>{message}</strong>
        </Alert>)
        }
      </Collapse>
    </Box>
  );
}
