import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { isValidEmail, isValidName, isValidPassword } from '../../utils/validation';
import { useTranslation } from 'react-i18next';
import { ACTION_STATUSES, Error } from '../../typings/typings';
import Preloader from '../../components/Preloader/Preloader';
import { BasicAlerts } from '../../components/compunents';

export interface IRegistrationValues {
  name: string;
  password: string;
  login: string;
}

interface UseRegistrationReturnValues {
  initialValues: IRegistrationValues;
  nameLabel: string;
  loginLabel: string;
  passLabel: string;
  isButtonDisabled: boolean;
  validateForm: (values: IRegistrationValues) => Partial<IRegistrationValues>;
  requestStatus: ACTION_STATUSES;
  requestError: Error;
}

export const useRegistration = (): UseRegistrationReturnValues => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const nameLabel = t('editProfileForm:name');
  const loginLabel = t('editProfileForm:login');
  const passLabel = t('editProfileForm:pass');
  const requestStatus = useAppSelector((state) => state.auth.signUpStatus);
  const requestError = useAppSelector((state) => state.auth.error);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const initialValues: IRegistrationValues = {
    name: '',
    password: '',
    login: '',
  };

  const validateForm = (values: IRegistrationValues): Partial<IRegistrationValues> => {
    const errors: Partial<IRegistrationValues> = {};
    function checkFormField(key: keyof IRegistrationValues) {
      switch (key) {
        case 'name':
          {
            if (!!(values?.name && !isValidName(values?.name))) {
              errors['name'] =
                'The name must have length more than 3 and less that 12 and consist of letters';
            }
          }
          break;
        case 'login':
          {
            if (!!(values?.login && !isValidEmail(values?.login))) {
              errors['login'] = 'Email not validate';
            }
          }
          break;
        case 'password':
          {
            if (!!(values?.password && !isValidPassword(values?.password))) {
              errors['password'] = 'The password must have length more than 3 and less that 12';
            }
          }
          break;
        default: {
          return null;
        }
      }
    }

    setIsButtonDisabled(true);
    checkFormField('name');
    checkFormField('login');
    checkFormField('password');
    if (!errors.name && !errors.login && !errors.password) {
      setIsButtonDisabled(false);
    }
    return errors;
  };

  useEffect(() => {
    if (requestStatus === ACTION_STATUSES.FULFILLED) {
      navigate('/signin');
    }
  }, [requestStatus]);

  console.log(requestError);

  return {
    initialValues,
    nameLabel,
    loginLabel,
    passLabel,
    isButtonDisabled,
    validateForm,
    requestStatus: requestStatus as ACTION_STATUSES,
    requestError: requestError as Error,
  };
};
