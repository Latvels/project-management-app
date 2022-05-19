import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import react, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setDeletedItem, setIsConfirmModalOpen, setIsEditProfileModalOpen, setIsPreloaderOpen } from '../../store/action/appStateAction';
import { getUsersById, updateUser, selectUser } from '../../api/userApi';
import './editProfileFormFormik.scss';
import store, { AppDispatch, useAppSelector } from '../../store/store';
import { useSelector } from 'react-redux';
// import { RootState } from '../../store/reducer/reducer';
import { User } from '../../typings/typings';

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
  const { id, name, login } = user;
  console.log('All', id, name, login )

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
  const userId = 'daf7c345-686d-41f8-9e78-69fb48e28b2e';

  const getUserData = async () => {
    appDispatch(setIsPreloaderOpen(true));
    const data = await appDispatch(getUsersById(userId));
    console.log(data);
    const userdata = data.payload as User;
    setUserData(userdata);
    initialValues.login = userdata.login!;
    initialValues.name = userdata.name!;
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

    setIsButtonDisabled(true);
    checkFormField('name');
    checkFormField('login');
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
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={async (values: IValues, {setSubmitting}) => {
        setSubmitting(false);
        appDispatch(setIsEditProfileModalOpen(false));
        appDispatch(setIsPreloaderOpen(true));
        const newUserData: User = {
          ...userData,
          name: values.name,
          login: values.login,
          id: userId,
          password: values.password
        };
        const resp = await appDispatch(updateUser(newUserData));
        console.log(resp); //todo ошибка
        appDispatch(setIsPreloaderOpen(false));
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
  );
}

export default EditProfileFormFormik;