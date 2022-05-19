import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/store';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ACTION_STATUSES } from '../../typings/typings';
import { CONFIG } from '../../constants/constant';
import qs from 'qs';

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
  validateForm: (values: ILoginValues) => void;
}

export const useLoginPage = (): UseRegistrationReturnValues => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [token, setToken] = useState(CONFIG.token);
  const requestStatus = useAppSelector((state) => state.auth.signInStatus);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const loginLabel = t('editProfileForm:login');
  const passLabel = t('editProfileForm:pass');
  const { search } = useLocation();

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
    validateForm,
  };
};
