import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import { useWindowDimensions } from '../../services/service';
import schoolLogo from '../../assets/rs_school_js.svg';
import gitHubLogo from '../../assets/GitHub.png';

interface Developers {
  id: number;
  nickName: string;
  gitLink: string;
}

export default function Footer() {
  const { width } = useWindowDimensions();
  const developers = [
    { id: 1, nickName: 'elizavetachizh', gitLink: 'https://github.com/elizavetachizh' },
    { id: 2, nickName: 'Tatsiana-Vaitovich', gitLink: 'https://github.com/Tatsiana-Vaitovich' },
    { id: 3, nickName: 'Latvels', gitLink: 'https://github.com/Latvels' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bottom: 0,
        position: 'fixed',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 1,
          px: 1,
          mt: 'auto',
          display: 'flex',
          flexFlow: 'row',
          justifyContent: 'space-around',
          placeItems: 'end',

          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            placeItems: 'center',
          }}
        >
          <Link color="inherit" href="https://rs.school/">
            <img alt="RS School logo" src={schoolLogo} height="35" />
          </Link>
        </Box>

        <Box
          sx={{
            justifyContent: 'space-evenly',
            placeItems: 'center',
            display: () => (width > 660 ? 'flex' : 'none'),
          }}
        >
          {developers.map((item: Developers) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                margin: '0.5rem',
              }}
            >
              <Link
                underline="none"
                color="inherit"
                href={item.gitLink}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  placeItems: 'center',
                  margin: '0 0.5rem 0 0.5rem',
                }}
              >
                <Avatar alt="gitHub link" src={gitHubLogo} sx={{ height: 20, width: 20 }} />
                <Typography variant="h6" display="block" sx={{ marginLeft: '7px' }}>
                  {item.nickName}
                </Typography>
              </Link>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            placeItems: 'center',
            marginBottom: 0,
          }}
        >
          <Typography className="footer-data" variant="h5" display="block">
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
