import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container, Input, InputLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { singIn } from '../../api/authApi';
import store, { AppDispatch, useAppSelector } from '../../store/store';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { ACTION_STATUSES } from '../../typings/typings';
import { ILoginValues, useLoginPage } from './use-login-page.hook';
import Preloader from '../../components/Preloader/Preloader';
import BasicAlerts from '../../components/Alert/alerts';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../../store/action/appStateAction';
import { getUsers } from '../../api/userApi';

type RootUser = {
  id?: string;
  email?: string;
  password?: string;
  name?: string;
};
function Login() {
  const {
    initialValues,
    loginLabel,
    passLabel,
    isButtonDisabled,
    requestStatus,
    requestError,
    validateForm,
  } = useLoginPage();
  useEffect(() => {
    if (requestStatus) {
      const qwe = store.getState().user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataAwtorizeUser = qwe.entities.find((el: any) => {
        return el.login === email;
      });
      const awtorizUserData: RootUser = dataAwtorizeUser || {};
      const setUser = async () => {
        dispatch(setUserData(awtorizUserData));
      };
      setUser();
      navigate('/mainPage');
    }
  }, [requestStatus]);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <h2>{t('login:title')}</h2>
      {requestStatus === ACTION_STATUSES.PENDING ? (
        <Preloader />
      ) : (
        <Formik
          initialValues={initialValues}
          validate={validateForm}
          onSubmit={async (values: ILoginValues, { setSubmitting }) => {
            setSubmitting(false);
            const data = {
              login: values.login,
              password: values.password,
            };
            dispatch(singIn(data));
          }}
        >
          {({ submitForm }) => (
            <Form className="form">
              <Field
                component={TextField}
                name="login"
                type="email"
                label={loginLabel}
                color="info"
              />
              <Field
                component={TextField}
                name="password"
                type="password"
                label={passLabel}
                color="info"
              />
              <Button
                onClick={submitForm}
                disabled={isButtonDisabled}
                variant="outlined"
                color="info"
              >
                {t('registration:submit')}
              </Button>
              {requestStatus === ACTION_STATUSES.REJECTED && <BasicAlerts error={requestError} />}
            </Form>
          )}
        </Formik>
      )}
    </Container>
  );
}

export default Login;
