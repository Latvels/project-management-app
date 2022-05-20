import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import react, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setDeletedItem, setIsConfirmModalOpen, setIsEditProfileModalOpen, setIsPreloaderOpen } from '../../store/action/appStateAction';
import { getUsersById, updateUser, selectUser } from '../../api/userApi';
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

  //* работает так
  const {entities: user} = useSelector(selectUser)
  // const id = user.id as string;
  // console.log('All', id, name, login )
  const getUserId = useSelector((state: RootState) => state.awtUser);
  console.log('getUserId');
  console.log(getUserId);
  console.log('entries: user');
  console.log(user);
  console.log(getUserId);
  const id = user[0].id as string;
  const name = user[0].name as string;
  const login = user[0].login as string;
  // const password = getUserId.password as string;
  // const id = getUserId.id as string;
  // const name = user[0].name as string;
  // const login = user[0].login as string;
  // const password = user[0].password as string;

  const errorMessage = useSelector((state: RootState) => state.user.error) as Error;
  const err = (errorMessage:Error)=> {
    const { message } = errorMessage
    if (message !== '' && message !== undefined) {
      console.log('error')
      return <BasicAlerts error={errorMessage}/>
      //здесь надо обнулить error в стейте, иначе при следующем открытии окна - сразу висит alert с ошибкой, а если окно не закрыл и корректируешь данные - повторно сообщение о ошибке не показывается
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
  const [ userData, setUserData ] = useState<User | Record<string, null>>({});
  
  const initialValues = {
    name: '',
    password: '',
    login: '',
  }
  //todo 

  const getUserData = async () => {
    // console.log(user);
    appDispatch(setIsPreloaderOpen(true));
    initialValues.login = login;
    initialValues.name = name;
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
    // checkFormField('login');
    checkLoginField();
    checkFormField('password');
    if (!errors.name && !errors.login && !errors.password) {
      setIsButtonDisabled(false);
    }
    return errors;
  }

  const handleClickDeleteUserButton = () => {
    appDispatch(setDeletedItem('user'));
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
        // appDispatch(setIsEditProfileModalOpen(false));
        appDispatch(setIsPreloaderOpen(true));
        const newUserData: User = {
          id: id,
          name: values.name,
          login: values.login,
          password: values.password
        };
        await appDispatch(updateUser(newUserData));
        appDispatch(setIsPreloaderOpen(false));
        if(errorMessage.message === '') {
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