import React, { useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import './welcomePage.scss';
import women from '../../assets/woman.png';
import man from '../../assets/man.png';
import girl from '../../assets/girl.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function WelcomePage() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const showMainPageButton =
    params.get('isUserActivated') && params.get('isUserActivated') === 'true';

  const onMainPageBtnClick = useCallback(() => {
    navigate('/mainPage');
  }, []);

  return (
    <Container sx={{ mb: 12, mt: 6 }}>
      <div className={'container--lin'}>
        {showMainPageButton ? (
          <Button variant="contained" onClick={onMainPageBtnClick} className="registration-button">
            {t('welcomePage:mainPageBtn')}
          </Button>
        ) : (
          <div className={'div--button'}>
            <Button variant="contained" href={'/signup'} className="registration-button">
              {t('welcomePage:singUp')}
            </Button>
            <Button variant="contained" href={'/signin'} className="registration-button">
              {t('welcomePage:signIn')}
            </Button>
          </div>
        )}
      </div>
      <h2>{t('welcomePage:team')}</h2>
      <Grid sx={{ mb: 5 }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ width: 200 }}
              className="card--media"
              component="img"
              alt="Evgeny"
              image={man}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {t('welcomePage:Evgeny')}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Frontend Dev | Team Lead
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hello, my name is Zhenya and in this project I have done: API, Footer
              </Typography>
            </CardContent>
            <CardActions />
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ width: 200 }}
              className="card--media"
              component="img"
              alt="Tatiana"
              image={women}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {t('welcomePage:Tatiana')}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Frontend Dev
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hello, my name is Tatiana and in this project I have done: Header, Create new board
              </Typography>
            </CardContent>
            <CardActions />
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ width: 200 }}
              className="card--media"
              component="img"
              alt="Elizaveta"
              image={girl}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {t('welcomePage:Elizaveta')}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Frontend Dev
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hello, my name is Liza and in this project I have done: Welcome page, Sign In / Sign
                Up
              </Typography>
            </CardContent>
            <CardActions />
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ p: 2, border: '1px solid grey' }}>
        <p className="comment-box">{t('welcomePage:DiscriptionOne')}</p>
        <p className="comment-box">{t('welcomePage:DescriptionTwo')}</p>
        <p className="comment-box">{t('welcomePage:DescriptionThree')}</p>
      </Box>
    </Container>
  );
}

export default WelcomePage;
