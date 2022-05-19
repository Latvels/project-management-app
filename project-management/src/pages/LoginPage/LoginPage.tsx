import React, {SyntheticEvent, useCallback, useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container, Input, InputLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { singIn } from '../../api/authApi';
import {AppDispatch, useAppSelector} from '../../store/store';
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const requestStatus = useAppSelector((state) => state.auth.signInStatus);

  useEffect(() => {
    if (requestStatus === 'fulfilled') {
      navigate('/mainPage');
    }
  }, [requestStatus]);


  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const submit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();
      const data = {
        password: password,
        login: email,
      };
      dispatch(singIn(data));
    },
    [password, email]
  );

  return (
    <Container>
      <h2>Please enter</h2>
      <form className="formSubmit" onSubmit={submit}>
        <InputLabel htmlFor="email">{t('registration:email')}</InputLabel>
        <Input onChange={changeEmail} type="email" id="email" name={'login'} />
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input onChange={changePassword} type="password" id="password" name={'password'} />
        <Button onClick={submit}>Submit</Button>
        {requestStatus === 'rejected' && <span>User was not founded!</span>}
      </form>
    </Container>
  );
}

export default Login;
