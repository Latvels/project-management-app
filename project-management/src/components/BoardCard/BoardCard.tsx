import * as React from 'react';
import {Box, Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { setDeletedItem, setDeletedId, setIsConfirmModalOpen, setCurrentBoardId } from '../../store/action/appStateAction';
import boardIcon from '../../assets/icon.png';
import { useWindowDimensions } from '../../services/service';
import { useNavigate } from 'react-router-dom';

type Props = {
	id?: string,
	title?: string,
	description?: string,
}

function BoardCard(props: Props) {
  const appDispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const deleteBoard = (e: React.MouseEvent<HTMLElement> ) => {
    e.stopPropagation();
    appDispatch(setDeletedItem('board'));
    appDispatch(setDeletedId(String(props.id)));
    appDispatch(setIsConfirmModalOpen(true));
  };

  const handleBoardCardClick = () => {
    appDispatch(setCurrentBoardId(props.id!));
    navigate('/boardPage');
  }

  const { width } = useWindowDimensions();

  return (
    <Box
      sx={{ padding: '1rem', cursor: 'pointer'}}
      component='div'
      onClick={handleBoardCardClick}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '15.5rem',
          height: '19rem',
          padding: '1rem'
          }}>
        <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <CardMedia
            component="img"
            
            image={boardIcon}
            alt="icon"
            color='secondary'
            sx={{
              alignSelf: 'center',
              width: () => (width > 660 ? '80px' : '50px'),
            }}
          />
          <CardContent>
            <Typography sx={{ fontSize: '1.3rem', textTransform: 'uppercase'}} variant='h6' component='h4' color='text.secondary' gutterBottom>
              {props.title}
            </Typography>
            <Typography sx={{ fontSize: '1rem' }}>
            {props.description}
          </Typography>
          </CardContent>
          </Box>
          <CardActions sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            }}>
            <Button size="small" onClick={deleteBoard}><DeleteForeverIcon color='warning' /></Button>
          </CardActions>
      </Card>
    </Box>
    
  );
}

export default BoardCard;