import React from 'react';
import { Column, Task } from '../../typings/typings';
import { Box, Button, Typography } from '@mui/material';
import MockTask from './MockTask';
import { boardSlise } from '../../api/boardApi';
import { useDispatch } from 'react-redux';
import {
  setDeletedId,
  setDeletedItem,
  setIsConfirmModalOpen,
} from '../../store/action/appStateAction';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface IMockColumnProps {
  column: Column;
}

function MockColumn(props: IMockColumnProps) {
  const { tasks } = props.column;
  const appDispatch = useDispatch();
  const { setCurrentColumn } = boardSlise.actions;

  const onMouseDownHandler = () => {
    appDispatch(setCurrentColumn(props.column));
  };

  const deleteColumn = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    appDispatch(setCurrentColumn(props.column));
    appDispatch(setDeletedItem('column'));
    appDispatch(setDeletedId(String(props.column.id)));
    appDispatch(setIsConfirmModalOpen(true));
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 1,
          backgroundColor: '#ffff8b',
          padding: 1,
          width: '250px',
        }}
        onMouseDown={onMouseDownHandler}
      >
        <Typography variant="h6" component="h4">
          {props.column.title!}
        </Typography>
        <Box>
          <Button size="small" onClick={deleteColumn}>
            <DeleteForeverIcon color="warning" />
          </Button>
        </Box>
        {tasks !== undefined && (
          <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}>
            {tasks!.length > 0 &&
              tasks!.map((task: Task) => {
                return <MockTask key={task!.id} task={task}></MockTask>;
              })}
          </Box>
        )}
      </Box>
    </>
  );
}

export default MockColumn;
