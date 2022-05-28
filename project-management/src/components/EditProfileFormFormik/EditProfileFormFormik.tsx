import react, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setDeletedItem, setDeletedId, setIsConfirmModalOpen, setIsEditProfileModalOpen, setIsPreloaderOpen, setUserData } from '../../store/action/appStateAction';
import { updateUser, userSlise } from '../../api/userApi';
import { AppDispatch } from '../../store/store';
import { User, Error, ACTION_STATUSES } from '../../typings/typings';
import { RootState } from '../../store/reducer/reducer';
import { BasicAlerts } from '../compunents';
import './editProfileFormFormik.scss';

interface IValues {
  name: string;
  password: string;
  login: string;
}

function EditProfileFormFormik() {
  const appDispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.awtUser);
  const user = useSelector((state: RootState) => state.user);
  const userRequestError = useSelector((state: RootState) => state.user.error) as Error;
  const userRequestStatus = useSelector((state: RootState) => state.user.userRequestStatus);
  const {resetUserRequestStatus} = userSlise.actions;
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { t } = useTranslation();
  const nameLabel = t('editProfileForm:name');
  const loginLabel = t('editProfileForm:login');
  const passLabel = t('editProfileForm:pass');
  const submitButtonText = t('editProfileForm:submitBtn');
  const deleteButtonText = t('editProfileForm:deleteBtn');
  const minValue = t('formValidation:minValue');
  const maxValue = t('formValidation:maxValue');
  const required = t('formValidation:required');
  console.log(userData);
  console.log(user)

  const initialValues = {
    name: '',
    password: '',
    login: '',
  }

  const getUserData = async () => {
    const login = userData.user?.login as string;
    const name = userData.user?.name as string;

    initialValues.login = login;
    initialValues.name = name;
    initialValues.password = '';
  };

  useEffect(() => {
    getUserData();
  });

  const validateForm = (values: IValues): Partial<IValues> => {
    const errors: Partial<IValues> = {};
    function checkFormField(key: keyof IValues) {
      if (!values[key]) {
        errors[key] = required;
      } else if (values[key].length < 4) {
        errors[key] = minValue;
      } else if (values[key].length > 12) {
        errors[key] = maxValue;
      }
    }

    function checkLoginField() {
      if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/.test(values.login)) {
        errors.login = 'invalid email address';
      }
    }

    setIsButtonDisabled(true);
    checkFormField('name');
    checkLoginField();
    checkFormField('password');
    if (!errors.name && !errors.login && !errors.password) {
      setIsButtonDisabled(false);
    }
    return errors;
  };

  const handleClickDeleteUserButton = () => {
    const id = userData.user?.id as string;
    appDispatch(setDeletedItem('user'));
    appDispatch(setDeletedId(id));
    appDispatch(setIsEditProfileModalOpen(false));
    appDispatch(setIsConfirmModalOpen(true));
  };

  return (
    <>
      <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={async (values: IValues, {setSubmitting}) => {
        setSubmitting(false);
        appDispatch(setIsPreloaderOpen(true));
        const id = userData.user?.id as string;
        const newUserData: User = {
          id: id,
          name: values.name,
          login: values.login,
          password: values.password
        };
        const resp = await appDispatch(updateUser(newUserData));
        appDispatch(setIsPreloaderOpen(false));
        if(resp.meta.requestStatus === 'fulfilled') {
          appDispatch(setUserData(resp.payload));
          appDispatch(setIsEditProfileModalOpen(false));
          appDispatch(resetUserRequestStatus());
        }
      }}
    >
      {({ submitForm }) => (
        <Form className="form">
          <Field
            component={TextField}
            name="name"
            type="text"
            label={nameLabel}
            color="info"
          />
          <Field
            component={TextField}
            name="login"
            type="text"
            label={loginLabel}
            color="info"
          />
          <Field
            component={TextField}
            name="password"
            type="text"
            label={passLabel}
            color="info"
          />
          <Button
            variant="outlined"
            color="info"
            disabled={isButtonDisabled}
            onClick={submitForm}
          >
            {submitButtonText}
          </Button>
          <Button
            variant="outlined"
            color="warning"
            disabled={false}
            onClick={handleClickDeleteUserButton}
          >
            {deleteButtonText}
          </Button>
          {userRequestStatus === ACTION_STATUSES.REJECTED && <BasicAlerts error={userRequestError} />}
        </Form>
      )}
    </Formik>
    </>
  );
}

export default EditProfileFormFormik;
