import React, { SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container, Input, InputLabel } from '@mui/material';
import './registration.scss';
import { singUp } from '../../api/authApi';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { isValidEmail, isValidName, isValidPassword } from '../../utils/validation';
import { setUserData } from '../../store/action/appStateAction';

function Registration() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const requestStatus = useAppSelector((state) => state.auth.signUpStatus);
  const isButtonDisabled = useMemo<boolean>(() => {
    return !isValidEmail(email) || !isValidName(name) || !isValidPassword(password);
  }, [email, name, password]);

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
  };

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };

  const changeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  useEffect(() => {
    if (requestStatus === 'fulfilled') {
      navigate('/signin');
    }
  }, [requestStatus]);

  const submit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();
      const data = {
        password: password,
        login: email,
        name: name,
      };
      dispatch(singUp(data));
    },
    [password, name, email]
  );

  return (
    <Container>
      <h2>{t('registration:title')}</h2>
      <form className="formSubmit">
        <InputLabel htmlFor="email">{t('registration:email')}</InputLabel>
        <Input
          name={'login'}
          id={'email'}
          onChange={changeEmail}
          type="email"
          error={!!(email && !isValidEmail(email))}
        />
        {!!(email && !isValidEmail(email)) && <span>Email not validate</span>}
        <InputLabel htmlFor="name">{t('registration:name')}</InputLabel>
        <Input
          id={'name'}
          onChange={changeLogin}
          type="text"
          name={'name'}
          error={!!(name && !isValidName(name))}
        />
        {!!(name && !isValidName(name)) && <span>The name must contain only letters</span>}
        <InputLabel htmlFor="password">{t('registration:password')}</InputLabel>
        <Input
          id={'password'}
          onChange={changePassword}
          type="password"
          name={'password'}
          error={!!(password && !isValidPassword(password))}
        />
        {!!(password && !isValidPassword(password)) && <span>Please enter more than 5 characters</span>}
        <Button disabled={isButtonDisabled} onClick={submit}>
          {t('registration:submit')}
        </Button>
        {requestStatus === 'rejected' && <span>User login already exists!</span>}
      </form>
    </Container>
  );
}

export default Registration;
