import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { singIn } from '../../api/authApi';
import { AppDispatch } from '../../store/store';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { ACTION_STATUSES } from '../../typings/typings';
import { ILoginValues, useLoginPage } from './use-login-page.hook';
import Preloader from '../../components/Preloader/Preloader';
import BasicAlerts from '../../components/Alert/alerts';

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const {
    initialValues,
    loginLabel,
    passLabel,
    isButtonDisabled,
    requestStatus,
    requestError,
    validateForm,
  } = useLoginPage();

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
