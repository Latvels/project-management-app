import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

function Login() {
  const { t } = useTranslation();
  return (
      <a href={'/login'}>Login Page</a>
  );
}

export default Login;
