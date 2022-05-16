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
import { LoginPage, Registration } from '../pages';
import './welcomePage.scss';

function WelcomePage() {
  return (
    <Container fixed>
      <div className={'container--link'}>
        <Button variant="contained" href={'/registration'} className="registration-button">
          Register Page
        </Button>
        <LoginPage />
      </div>
      <h2>Welcome Page</h2>
      <h3>Our team</h3>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia component="img" alt="Evgeny" height="140" image="" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Evgeny
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Frontend Dev | Team Lead
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur est, voluptas
                eaque facere dignissimos architecto nisi veritatis mollitia. Nihil, odio!
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="Tatiana"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tatiana
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Frontend Dev
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur est, voluptas
                eaque facere dignissimos architecto nisi veritatis mollitia. Nihil, odio!
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="Elizaveta"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Elizaveta
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Frontend Dev
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur est, voluptas
                eaque facere dignissimos architecto nisi veritatis mollitia. Nihil, odio!
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia component="img" alt="Evgeny" height="140" image="" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Evgeny
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Frontend Dev | Team Lead
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur est, voluptas
                eaque facere dignissimos architecto nisi veritatis mollitia. Nihil, odio!
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="Tatiana"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tatiana
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Frontend Dev
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur est, voluptas
                eaque facere dignissimos architecto nisi veritatis mollitia. Nihil, odio!
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="Elizaveta"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Elizaveta
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Frontend Dev
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur est, voluptas
                eaque facere dignissimos architecto nisi veritatis mollitia. Nihil, odio!
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ p: 2, border: '1px solid grey' }}>
        <Button>Save</Button>
      </Box>
    </Container>
  );
}

export default WelcomePage;
