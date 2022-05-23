import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AppDispatch, useAppSelector } from '../../store/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ACTION_STATUSES, All, Error } from '../../typings/typings';
import qs from 'qs';
import { setUserData } from '../../store/action/appStateAction';
import { useDispatch } from 'react-redux';

export interface ILoginValues {
  password: string;
  login: string;
}

interface UseRegistrationReturnValues {
  initialValues: ILoginValues;
  loginLabel: string;
  passLabel: string;
  isButtonDisabled: boolean;
  requestStatus: ACTION_STATUSES;
  requestError: Error;
  validateForm: (values: ILoginValues) => void;
  setEmail: Dispatch<SetStateAction<string>>;
}

type RootUser = {
  id?: string;
  email?: string;
  password?: string;
  name?: string;
};

export const useLoginPage = (): UseRegistrationReturnValues => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const requestStatus = useAppSelector((state) => state.auth.signInStatus);
  const requestError = useAppSelector((state) => state.auth.error);
  const currentUser = useAppSelector((state) => state.user);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const loginLabel = t('editProfileForm:login');
  const passLabel = t('editProfileForm:pass');
  const { search } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (requestStatus === ACTION_STATUSES.FULFILLED) {
      const dataAwtorizeUser = currentUser.entities.find((entity: All) => {
        return entity.login === email;
      });
      const awtorizUserData: RootUser = dataAwtorizeUser || {};
      const setUser = async () => {
        dispatch(setUserData(awtorizUserData));
      };
      setUser();
    }
  }, [requestStatus, email]);

  useEffect(() => {
    const params = qs.stringify({ isUserActivated: true });
    if (requestStatus === ACTION_STATUSES.FULFILLED) {
      navigate(`/?${params}`);
    }
  }, [requestStatus, search]);

  const initialValues: ILoginValues = {
    login: '',
    password: '',
  };

  const validateForm = (values: ILoginValues): void => {
    if (values.login && values.password) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  return {
    initialValues,
    loginLabel,
    passLabel,
    isButtonDisabled,
    requestStatus: requestStatus as ACTION_STATUSES,
    requestError: requestError as Error,
    validateForm,
    setEmail,
  };
};
