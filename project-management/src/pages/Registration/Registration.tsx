import React, { SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container, Input, InputLabel } from '@mui/material';
import './registration.scss';
import { singUp } from '../../api/authApi';
import { TextField } from 'formik-mui';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { isValidEmail, isValidName, isValidPassword } from '../../utils/validation';
import { setUserData } from '../../store/action/appStateAction';
import { IRegistrationValues, useRegistration } from './use-registration.hook';
import { ACTION_STATUSES } from '../../typings/typings';
import Preloader from '../../components/Preloader/Preloader';
import BasicAlerts from '../../components/Alert/alerts';
import { Field, Form, Formik } from 'formik';
function Registration() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const {
    initialValues,
    nameLabel,
    loginLabel,
    passLabel,
    isButtonDisabled,
    validateForm,
    requestStatus,
    requestError,
  } = useRegistration();

  return (
    <Container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
      <h2>{t('registration:title')}</h2>

      {requestStatus === ACTION_STATUSES.REJECTED ? <BasicAlerts error={requestError} /> : 
        (<Formik
          initialValues={initialValues}
          validate={validateForm}
          onSubmit={async (values: IRegistrationValues, { setSubmitting }) => {
            setSubmitting(false);
            const data = {
              name: values.name,
              login: values.login,
              password: values.password,
            };
            dispatch(singUp(data));
          }}
        >
          {({ submitForm }) => (
            <Form className="form">
              <Field component={TextField} name="name" type="text" label={nameLabel} color="info" />
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
            </Form>
          )}
        </Formik>
      )}
    </Container>
  );
}

export default Registration;
