import * as React from 'react';
import {Box, Alert, IconButton, Collapse} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import store, { AppDispatch } from '../../store/store';

export default function BasicAlerts() {
  const [open, setOpen] = React.useState(true);
	console.log('store', store)

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
					severity="info"
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
          
        </Alert>
      </Collapse>
    </Box>
  );
}