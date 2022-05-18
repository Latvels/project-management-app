import React, { SyntheticEvent, useCallback, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Button, Container, Input, InputLabel, Link } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { setIsEditProfileModalOpen, setIsPreloaderOpen } from '../../store/action/appStateAction';
import { User } from '../../typings/typings';
import { TextField } from 'formik-mui';
import { useDispatch } from 'react-redux';
import { singIn } from '../../api/authApi';
import { AppDispatch } from '../../store/store';
import { Navigate } from 'react-router-dom';

interface IValues {
  name: string;
  password: string;
  login: string;
}

function Login() {
  // todo use state
  const dispatch = useDispatch<AppDispatch>();
  const appDispatch = useDispatch();
  const { t } = useTranslation();
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const initialValues = {
    name: '',
    password: '',
    login: '',
  };
  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const changeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };
  const submit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();
      const data = {
        password: password,
        login: login,
        name: email,
      };
      dispatch(singIn(data));
      console.log(data, password, login, email);
      setRedirect(true);
    },
    [password, login, email]
  );
  if (redirect) {
    return <Navigate to={'/mainPage'} />;
  }

  return (
    <Container>
      <h2>Please enter</h2>
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

export default Login;
