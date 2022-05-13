import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

function Registration() {
  const { t } = useTranslation();
  return (
      <a href={'/registration'}>Register Page</a>
  );
}

export default Registration;
