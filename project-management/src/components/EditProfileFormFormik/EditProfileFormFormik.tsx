import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import react, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setDeletedItem, setDeletedId, setIsConfirmModalOpen, setIsEditProfileModalOpen, setIsPreloaderOpen } from '../../store/action/appStateAction';
import { getUsersById, updateUser } from '../../api/userApi';
import './editProfileFormFormik.scss';
import { AppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { User, Error } from '../../typings/typings';
import { RootState } from '../../store/reducer/reducer';
import { BasicAlerts } from '../compunents';
// import { err } from '../../utils/showBasicAlerts';

interface IValues {
  name: string;
  password: string,
  login: string,
}

function EditProfileFormFormik() {
  const appDispatch = useDispatch<AppDispatch>();
  
  //* работает так
  // const {entities: user} = useSelector(selectUser)
  // console.log('All', user.id, user.name, user.login)
  const getUserId = useSelector((state: RootState) => state.awtUser);

  const errorMessage = useSelector((state: RootState) => state.user.error) as Error;
  const err = (errorMessage:Error)=> {
    const { message } = errorMessage
    if(message === '' || message === undefined) {
      console.log(errorMessage)
      return <BasicAlerts error={errorMessage}/>
    }
  }

  const {t} = useTranslation();
  const nameLabel = t('editProfileForm:name');
  const loginLabel = t('editProfileForm:login');
  const passLabel = t('editProfileForm:pass');
  const submitButtonText = t('editProfileForm:submitBtn');
  const deleteButtonText = t('editProfileForm:deleteBtn');
  const minValue = t('formValidation:minValue');
  const maxValue = t('formValidation:maxValue');
  const required = t('formValidation:required');

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const initialValues = {
    name: '',
    password: '',
    login: '',
  }

  const getUserData = async () => {
    // console.log(user);
    appDispatch(setIsPreloaderOpen(true));
    const data = await appDispatch(getUsersById(getUserId.user.id));
    // console.log('2131231', data);
    const userdata = data.payload as User;
    initialValues.login = String(userdata.login);
    initialValues.name = String(userdata.name);
    initialValues.password = 'password';
    appDispatch(setIsPreloaderOpen(false));
  }

  useEffect( () => {
    getUserData();
  },[]);


  const validateForm = (values: IValues): Partial<IValues> => {
    const errors: Partial<IValues> = {};
    function checkFormField(key: keyof IValues) {
      if (!values[key]) {
        errors[key] = required;
      } else if(values[key].length < 3) {
        errors[key] = minValue;
      } else if(values[key].length > 12) {
        errors[key] = maxValue;
      }
    };

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
  }

  const handleClickDeleteUserButton = () => {
    appDispatch(setDeletedItem('user'));
    appDispatch(setDeletedId(getUserId.user.id));
    appDispatch(setIsEditProfileModalOpen(false));
    appDispatch(setIsConfirmModalOpen(true));
  }

  return (
    <>
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={async (values: IValues, {setSubmitting}) => {
        setSubmitting(false);
        appDispatch(setIsPreloaderOpen(true));
        const newUserData: User = {
          id: getUserId.user.id,
          name: values.name,
          login: values.login,
          password: values.password
        };
        await appDispatch(updateUser(newUserData));
        appDispatch(setIsPreloaderOpen(false));
        console.log(errorMessage)
        if(errorMessage.message === '' || errorMessage.message === undefined) {
          appDispatch(setIsEditProfileModalOpen(false));
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
            type="submit"
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
        </Form>
      )}
    </Formik>
    {err(errorMessage)}
    </>
  );
}

export default EditProfileFormFormik;