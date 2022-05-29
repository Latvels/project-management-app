import React from 'react';
import { Task } from '../../typings/typings';
import { Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { setDeletedId, setDeletedItem, setIsConfirmModalOpen } from '../../store/action/appStateAction';
import { boardSlise } from '../../api/boardApi';

interface IMockTaskProps {
  task: Task;
}

function MockColumn(props: IMockTaskProps) {
  const {title, description, id} = props.task;
  const appDispatch = useDispatch();
  const {setCurrentTask} = boardSlise.actions;

  const deleteTask = (e: React.MouseEvent<HTMLElement>) => {
    appDispatch(setCurrentTask(props.task));
    appDispatch(setDeletedItem('task'));
    appDispatch(setDeletedId(String(id)));
    appDispatch(setIsConfirmModalOpen(true));
  };

  return (
    <>
      <Box >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <CardContent>
            <Typography
              sx={{
                fontSize: '1.3rem',
                textTransform: 'uppercase',
                marginBottom: '0.7rem',
              }}
              variant="h6"
              component="h4"
              color="text.secondary"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography sx={{ fontSize: '1rem' }}>{description}</Typography>
          </CardContent>
        </Box>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button size="small" onClick={deleteTask}>
            <DeleteForeverIcon color="warning" />
          </Button>
        </CardActions>
      </Card>

      </Box>
    </>
  )
}


export default MockColumn;