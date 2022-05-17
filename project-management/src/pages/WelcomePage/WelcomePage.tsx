import React from 'react';
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
import { LoginPage } from '../pages';
import women from '../../assets/woman.png';
import man from '../../assets/man.png';
import girl from '../../assets/girl.png';

function WelcomePage() {
  return (
    <Container fixed>
      <div className={'container--link'}>
        <Button variant="contained" href={'/signup'} className="registration-button">
          Register Page
        </Button>
        <LoginPage />
      </div>
      <h2>Our team</h2>
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
                Evgeny
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Frontend Dev | Team Lead
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hello, my name is Zhenya and in this project I have done: API
              </Typography>
            </CardContent>
            <CardActions>
              {/*<Button size="small">Share</Button>*/}
              {/*<Button size="small">Learn More</Button>*/}
            </CardActions>
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
                Tatiana
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Frontend Dev
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hello, my name is Tatiana and in this project I have done: Header, Footer
              </Typography>
            </CardContent>
            <CardActions>
              {/*<Button size="small">Share</Button>*/}
              {/*<Button size="small">Learn More</Button>*/}
            </CardActions>
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
                Elizaveta
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Frontend Dev
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hello, my name is Liza and in this project I have done: Welcome page, Sign In / Sign
                Up
              </Typography>
            </CardContent>
            <CardActions>
              {/*<Button size="small">Share</Button>*/}
              {/*<Button size="small">Learn More</Button>*/}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ p: 2, border: '1px solid grey' }}>
        <p className="comment-box">
          &#34;Данный проект сделан в рамках обучения в RS School на курсе React. Данная школа
          помогает изучать разные языки и фреймворки.{' '}
        </p>
        <p className="comment-box">
          К примеру данный курс по React, помог приобрести следующие навыки и знания:
          <br /> - создание приложений на React + typeScript;
          <br /> - работать с классовыми и функциональными компонентами;
          <br />
          - создавать общий стор для всех данных;
          <br /> - и многому другому.
        </p>
        <p className="comment-box">
          Сейчас вы можете неблюдать приложение нашей команды, которое было сделано в рамках
          финального таска. Данное приложение поможет вести проекты, так как в нём можно вести учет
          задач и видеть на какой стадии находится то или иное задание.&#34;
        </p>
      </Box>
    </Container>
  );
}

export default WelcomePage;
