import React, { SyntheticEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Container,
  FormControl,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
} from '@mui/material';
import './registration.scss';
import { singUp } from '../../api/authApi';
import { useDispatch } from 'react-redux';
import store, { AppDispatch } from '../../store/store';

function Registration() {
  const { t } = useTranslation();
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const changeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };
  const submit = useCallback(async (event: SyntheticEvent) => {
        event.preventDefault();
        const data = {
          password: password,
          login: login,
          name: email,
        }
        dispatch(
          singUp(data)
        );
  }, []);

  return (
    <Container>
      <h2>Please register</h2>
      <form className="formSubmit" onSubmit={submit}>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input
          onChange={changeEmail}
          type="email"
          id="my-input"
          aria-describedby="my-helper-text"
        />
        <InputLabel htmlFor="my-login">Login</InputLabel>
        <Input
          onChange={changeLogin}
          type="login"
          id="my-login"
          aria-describedby="my-helper-text"
        />
        <InputLabel htmlFor="my-password">Password</InputLabel>
        <Input
          onChange={changePassword}
          type="password"
          id="my-password"
          aria-describedby="my-helper-text"
        />
        <button>Submit</button>
      </form>
    </Container>
  );
}

export default Registration;
