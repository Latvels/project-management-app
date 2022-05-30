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
  useMediaQuery,
} from '@mui/material';
import './welcomePage.scss';
import women from '../../assets/woman.png';
import man from '../../assets/man.png';
import girl from '../../assets/girl.png';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

function WelcomePage() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const showMainPageButton =
    params.get('isUserActivated') && params.get('isUserActivated') === 'true';

  const onMainPageBtnClick = useCallback(() => {
    navigate(`/mainPage${search}`);
  }, [search]);

  const adaptive = useMediaQuery('(maxWidth: 599px');
  const adaptiveImgMax = useMediaQuery('(maxWidth: 600px');
  const adaptiveImgMin = useMediaQuery('(maxWidth: 700px');
  return (
    <Container sx={{ mb: 12, mt: 6 }}>
      <div className={'container--link'}>
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
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          columnGap: 2,
          mb: 2,
          justifyContent: 'center',
          rowGap: 2,
          width: '100%',
        }}
      >
        <Grid item xs={4}>
          <Card
            sx={
              adaptive
                ? { padding: 1, height: '100%', width: '100%', mb: 10 }
                : { padding: 1, height: '100%', maxWidth: '340px', mx: 2 }
            }
          >
            <CardMedia
              sx={adaptiveImgMax && adaptiveImgMin ? { width: 150 } : { width: 300 }}
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
              <Typography
                variant={adaptiveImgMax && adaptiveImgMin ? 'body1' : 'body2'}
                color="text.secondary"
              >
                {t('welcomePage:doEvgeny')}
              </Typography>
            </CardContent>
            <CardActions />
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card
            sx={
              adaptive
                ? { padding: 1, height: '100%', width: '100%', mb: 10 }
                : { padding: 1, height: '100%', maxWidth: '340px', mx: 2 }
            }
          >
            <CardMedia
              sx={adaptiveImgMax && adaptiveImgMin ? { width: 150 } : { width: 250 }}
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
                {t('welcomePage:doTatiana')}
              </Typography>
            </CardContent>
            <CardActions />
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card
            sx={
              adaptive
                ? { padding: 1, height: '100%', width: '100%', mb: 10 }
                : { padding: 1, height: '100%', maxWidth: '340px', mx: 2 }
            }
          >
            <CardMedia
              sx={adaptiveImgMax && adaptiveImgMin ? { width: 150 } : { width: 250 }}
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
                {t('welcomePage:doElizaveta')}
              </Typography>
            </CardContent>
            <CardActions />
          </Card>
        </Grid>
      </Box>

      <Box sx={{ p: 2, border: '1px solid grey' }}>
        <p className="comment-box">{t('welcomePage:DiscriptionOne')}</p>
        <p className="comment-box">{t('welcomePage:DescriptionTwo')}</p>
        <p className="comment-box">{t('welcomePage:DescriptionThree')}</p>
        <p className="comment-box">{t('welcomePage:descriptionSchool')}</p>
      </Box>
    </Container>
  );
}

export default WelcomePage;
