import * as React from 'react';
import {Box, Alert, IconButton, Collapse} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import store, { AppDispatch } from '../../store/store';
import { getBoards, createBoard,updateBoards, getBoardsById, deleteBoard, selectBoard } from '../../api/boardApi'

export default function BasicAlerts() {
  const [open, setOpen] = React.useState(true);
  // const { entities: board, loading, error } = useSelector(selectBoard)
  const allStore = store.getState();
  let qwe = 'Нет ошибок';
  console.log('allStore', allStore)
  if (allStore.auth.error.message !== '') {
    // TODO тут можно пределать через return свой компонент с цветами
    qwe = `${allStore.auth.error.message}-${allStore.auth.error.status}`
  }
  if (allStore.board.error.message !== '') {
    qwe = `${allStore.board.error.message}-${allStore.board.error.status}`
  }
  if (allStore.column.error.message !== '') {
    qwe = `${allStore.column.error.message}-${allStore.column.error.status}`
  }
  if (allStore.file.error.message !== '') {
    qwe = `${allStore.file.error.message}-${allStore.file.error.status}`
  }
  if (allStore.task.error.message !== '') {
    qwe = `${allStore.task.error.message}-${allStore.task.error.status}`
  }
  if (allStore.user.error.message !== '') {
    //qwe = `${allStore.user.error.message}-${allStore.user.error.status}`
    qwe = 'sdasd - 200'
  }

  React.useEffect(() => {
    setTimeout(() => {
      setOpen(false)
    }, 3000);
  }, [])

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
          {qwe}
        </Alert>
      </Collapse>
    </Box>
  );
}