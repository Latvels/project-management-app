import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import react, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setDeletedItem, setIsConfirmModalOpen, setIsEditProfileModalOpen, setIsPreloaderOpen } from '../../store/action/appStateAction';
import { User } from '../../typings/typings';
import { updateUser } from '../../api/userApi';
import './editProfileFormFormik.scss';

interface IValues {
  name: string;
  password: string,
  login: string,
}

function EditProfileFormFormik() {
  // todo use state
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

  const initialValues = {
    name: '',
    password: '',
    login: '',
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
          name: values.name,
          login: values.login,
          password: values.password
        };
        // await appDispatch(updateUser(newUserData));
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