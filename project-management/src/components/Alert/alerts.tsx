import * as React from 'react';
import { Box, Alert, IconButton, Collapse, AlertTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Error } from '../../typings/typings';
import { useTranslation } from 'react-i18next';
import {useDispatch} from 'react-redux';
import { boardSlise } from '../../api/boardApi';
import { setIsConfirmModalOpen, setIsCreateNewBoardModalOpen } from '../../store/action/appStateAction';
import { TIMEOUT_FOR_ALERT } from '../../constants/constant';

type Props = {
  error: Error;
};

export default function BasicAlerts(props: Props) {
  const [open, setOpen] = React.useState(true);
  const { resetBoardRequestStatus } = boardSlise.actions;
  const appDispatch = useDispatch();
  const { status, message } = props.error;
  const { t } = useTranslation();

  const closeAlert = () => {
    setOpen(false);
    appDispatch(resetBoardRequestStatus());
  } 

  React.useEffect(() => {
    setTimeout(() => {
      closeAlert();
      appDispatch(setIsConfirmModalOpen(false));
      appDispatch(setIsCreateNewBoardModalOpen(false));
    }, TIMEOUT_FOR_ALERT );
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={closeAlert}
              // onClick={() => {
              //   setOpen(false);
              // }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>{status}</AlertTitle>
          {t('errors:Error:')} <strong>{message}</strong>
        </Alert>
      </Collapse>
    </Box>
  );
}
