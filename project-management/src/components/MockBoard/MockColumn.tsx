import React from 'react';
import { Column, Task } from '../../typings/typings';
import { Box, Typography } from '@mui/material';
import MockTask from './MockTask';
import { boardSlise } from '../../api/boardApi';
import { useDispatch } from 'react-redux';

interface IMockColumnProps {
  column: Column;
}

function MockColumn(props: IMockColumnProps) {
  const {tasks} = props.column;
  const appDispatch = useDispatch();
  const {setCurrentColumn} = boardSlise.actions;

  const onMouseDownHandler = () => {
    appDispatch(setCurrentColumn(props.column));
  }

  return (
    <>
    <Box sx={{display: 'flex', flexDirection: 'column', rowGap: 1, backgroundColor: '#ffff8b', padding: 1, width: '250px' }} onMouseDown={onMouseDownHandler}>
    <Typography variant='h6' component='h4'>{props.column.title!}</Typography>
    {tasks !== undefined &&
      <Box sx={{display: 'flex', flexDirection: 'column', rowGap: 1}}>
        { tasks!.length > 0 && (
          tasks!.map((task: Task) => {
          return <MockTask key={task!.id} task={task}></MockTask>
          })
        )}
      </Box>
    }
    </Box>
    </>
  )
}


export default MockColumn;