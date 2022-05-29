import * as React from 'react';
import { Box, Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {
  setDeletedItem,
  setDeletedId,
  setIsConfirmModalOpen,
  setCurrentBoardId,
  setIsPreloaderOpen,
} from '../../store/action/appStateAction';
import boardIcon from '../../assets/icon.png';
import { useWindowDimensions } from '../../services/service';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {RootState} from '../../store/reducer/reducer';
import { boardSlise, getBoardsById } from '../../api/boardApi';

type Props = {
  id?: string;
  title?: string;
  description?: string;
};

function BoardCard(props: Props) {
  const appDispatch = useDispatch<AppDispatch>();
  const appState = useSelector((state: RootState) => state.appState);
  const { setBoard, resetBoardRequestStatus} = boardSlise.actions;
  const navigate = useNavigate();
  const { search } = useLocation();

  const deleteBoard = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    appDispatch(setDeletedItem('board'));
    appDispatch(setDeletedId(String(props.id)));
    appDispatch(setIsConfirmModalOpen(true));
  };

  const handleBoardCardClick = useCallback(async() => {
    appDispatch(setCurrentBoardId(props.id!));
    navigate(`/boardPage${search}`);
  }, [search]);

  const { width } = useWindowDimensions();

  return (
    <Box sx={{ padding: '1rem', cursor: 'pointer' }} component="div" onClick={handleBoardCardClick}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '15.5rem',
          height: '19rem',
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
          <CardMedia
            component="img"
            image={boardIcon}
            alt="icon"
            sx={{
              alignSelf: 'center',
              width: () => (width > 660 ? '80px' : '50px'),
              marginBottom: '1rem',
            }}
          />
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
              {props.title}
            </Typography>
            <Typography sx={{ fontSize: '1rem' }}>{props.description}</Typography>
          </CardContent>
        </Box>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button size="small" onClick={deleteBoard}>
            <DeleteForeverIcon color="warning" />
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default BoardCard;
