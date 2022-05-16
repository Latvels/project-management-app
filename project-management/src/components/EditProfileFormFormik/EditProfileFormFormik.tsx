import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import react, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { updateUserData, deleteUser } from '../../api/api';
import { setIsEditProfileModalOpen, setIsPreloaderOpen } from '../../store/action/appStateAction';
import { User } from '../../typings/typings';
import './editProfileFormFormik.scss';

interface IValues {
  name: string;
  password: string,
  login: string,
}

function EditProfileFormFormik() {
  // todo use state
  const id = '';
  const appDispatch = useDispatch();
  const {t} = useTranslation();
  const nameLabel = t('editProfileForm:name');
  const loginLabel = t('editProfileForm:login');
  const passLabel = t('editProfileForm:pass');
  const submitButtonText = t('editProfileForm:submitBtn');
  const deleteButtonText = t('editProfileForm:deleteBtn');
  const minValue = t('formValidation:minValue');
  const maxValue = t('formValidation:maxValue');
  const required = t('formValidation:required');

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const validateForm = (values: IValues): Partial<IValues> => {
    const errors: Partial<IValues> = {};
    setIsButtonDisabled(true);
    if (!values.name) {
      errors.name = required;
    } else if(values.name.length < 3) {
      errors.name = minValue;
    } else if(values.name.length > 12) {
      errors.login = maxValue;
    } else if(!values.login) {
      errors.login = required;
    } else if(values.login.length < 3) {
      errors.login = minValue;
    } else if(values.login.length > 12) {
      errors.login = maxValue;
    } else if(!values.password) {
      errors.password = required;
    } else if(values.password.length < 3) {
      errors.password = minValue;
    } else if(values.password.length > 12) {
      errors.password = maxValue;
    }
    if (!errors.name && !errors.login && !errors.password) {
      setIsButtonDisabled(false);
    }
    return errors;
  }

  const initialValues = {
    name: '',
    password: '',
    login: '',
  }

  const handleClickDeleteUserButton = async () => {
    appDispatch(setIsEditProfileModalOpen(false));
    appDispatch(setIsPreloaderOpen(true));
    await deleteUser(id);
    appDispatch(setIsPreloaderOpen(false));
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
          name: values.name,
          login: values.login,
          password: values.password
        };
        await updateUserData(id, newUserData);
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