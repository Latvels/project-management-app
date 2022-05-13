import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Button, Link } from '@mui/material';

function Login() {
  const { t } = useTranslation();
  return (
    <Button variant="contained" href={'/login'} className="registration-button">
      Login Page
    </Button>
  );
}

export default Login;
