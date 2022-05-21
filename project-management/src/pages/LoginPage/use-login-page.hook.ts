import { useEffect, useState } from 'react';
import store, { AppDispatch, useAppSelector } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../store/action/appStateAction';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ACTION_STATUSES, Error } from '../../typings/typings';
import { CONFIG } from '../../constants/constant';
import qs from 'qs';
import { getUsers } from '../../api/userApi';
export interface ILoginValues {
  password: string;
  login: string;
}

type RootUser = {
  id?: string,
  email?: string,
  password?: string,
  name?: string,
  login?: string,
}
interface UseRegistrationReturnValues {
  initialValues: ILoginValues;
  loginLabel: string;
  passLabel: string;
  isButtonDisabled: boolean;
  requestStatus: ACTION_STATUSES;
  requestError: Error;
  validateForm: (values: ILoginValues) => void;
}

export const useLoginPage = (): UseRegistrationReturnValues => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [token, setToken] = useState(CONFIG.token);
  const requestStatus = useAppSelector((state) => state.auth.signInStatus);
  const requestError = useAppSelector((state) => state.auth.error);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const loginLabel = t('editProfileForm:login');
  const passLabel = t('editProfileForm:pass');
  const { search } = useLocation();
  const [email, setEmail] = useState('');

  useEffect(() => {
    dispatch(getUsers());
    const qwe = store.getState().user;
    const params = qs.stringify({ isUserActivated: true });
    if (requestStatus === ACTION_STATUSES.FULFILLED) {
    const dataAwtorizeUser = qwe.entities.find((el: RootUser) => {
      return el.login === email;
    })
      navigate(`/?${params}`);
      const awtorizUserData: RootUser = dataAwtorizeUser || {};
      dispatch(setUserData(awtorizUserData));
    }
  }, [requestStatus, search]);

  const initialValues: ILoginValues = {
    login: '',
    password: '',
  };

  const validateForm = (values: ILoginValues): void => {
    setEmail(values.login);
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
  };
};
