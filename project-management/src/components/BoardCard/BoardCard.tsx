import * as React from 'react';
import {Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { setDeletedItem, setDeletedId, setIsConfirmModalOpen, setIsPreloaderOpen } from '../../store/action/appStateAction';

type Props = {
	id?: string,
	title?: string,
	description?: string,
}

function BoardCard(props: Props) {
  const appDispatch = useDispatch<AppDispatch>();
  const deleteBoard = () => {
    appDispatch(setDeletedItem('board'));
    appDispatch(setDeletedId(String(props.id)));
    appDispatch(setIsConfirmModalOpen(true));
  };


  return (
    <Box sx={{ padding: '1rem'}}>
      <Card sx={{width: '15.5rem',height: '15rem'}}>
        <Box sx={{  display: 'flex',
          justifyContent: 'space-between'
          }}>
          <CardContent>
            <Typography sx={{ fontSize: 19 }} color="text.secondary" gutterBottom>
              {props.title}
            </Typography>
          </CardContent>
          <CardActions sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            }}>
            <Button size="small" onClick={deleteBoard}><DeleteForeverIcon/></Button>
          </CardActions>
        </Box>
        
        <CardContent>
          <Typography sx={{ fontSize: 14 }}>
            {props.description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
    
  );
}

export default BoardCard;