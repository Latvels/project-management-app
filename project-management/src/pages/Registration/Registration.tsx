import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import './registration.scss';

function Registration() {
  const { t } = useTranslation();
  return (
    <Button variant="contained" href={'/registration'} className="registration-button">
      Register Page
    </Button>
  );
}

export default Registration;
