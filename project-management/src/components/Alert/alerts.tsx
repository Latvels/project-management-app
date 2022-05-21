import * as React from 'react';
import { Box, Alert, IconButton, Collapse, AlertTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Error } from '../../typings/typings';
import { useTranslation } from 'react-i18next';

type Props = {
  error: Error;
};

export default function BasicAlerts(props: Props) {
  const [open, setOpen] = React.useState(true);
  const { status, message } = props.error;
  const { t } = useTranslation();

  React.useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
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
              onClick={() => {
                setOpen(false);
              }}
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
