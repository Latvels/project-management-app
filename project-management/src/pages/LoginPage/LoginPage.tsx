import React, {SyntheticEvent, useCallback, useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container, Input, InputLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { singIn } from '../../api/authApi';
import { getUsers, selectUser } from '../../api/userApi';
import store, { AppDispatch, useAppSelector } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../../store/action/appStateAction';

type RootUser = {
  id?: string,
  email?: string,
  password?: string,
  name?: string,
}

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const requestStatus = useAppSelector((state) => state.auth.signInStatus);

  useEffect(() => {
    if (requestStatus === 'fulfilled') {
      const qwe = store.getState().user
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataAwtorizeUser = qwe.entities.find((el: any) => {
        return el.login === email;
      })
      const awtorizUserData: RootUser = dataAwtorizeUser || {};
      const setUser = async () => {
        await dispatch(setUserData(awtorizUserData));
      }
      setUser();
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
      dispatch(getUsers());
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
