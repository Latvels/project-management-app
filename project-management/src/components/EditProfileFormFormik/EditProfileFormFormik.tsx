import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../../api/api';
import { setIsEditProfileModalOpen, setIsPreloaderOpen } from '../../store/action/appStateAction';
import { User } from '../../typings/typings';
import './editProfileFormFormik.scss';

interface IValues {
  name: string;
  email: string;
}

function EditProfileFormFormik() {
  const appDispatch = useDispatch();
  const {t} = useTranslation();
  const emailLabel = t('editProfileForm:email');
  const nameLabel = t('editProfileForm:name');
  const buttonText = t('editProfileForm:submit');
  // const invalidEmail = t('formValidation:minValue');
  const invalidEmail = t('formValidation:invalidEmail');
  const minValue = t('formValidation:minValue');

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  const validateForm = (values: IValues): Partial<IValues> => {
    const errors: Partial<IValues> = {};
    setIsButtonDisabled(true);
    if (values.name.length < 3) {
      errors.name = minValue;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = invalidEmail;
    }
    if (!errors.name && !errors.email) {
      setIsButtonDisabled(false);
    }
    return errors;
  }

  const initialValues = {
    name: '',
    email: '',
  }

  // todo use state
  const id = '';

  return (
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={async (values: IValues, {setSubmitting}) => {
        setSubmitting(false);
        appDispatch(setIsEditProfileModalOpen(false));
        appDispatch(setIsPreloaderOpen(true))
        const newUserData: User = {
          id: +id,
          email: values.email,
          name: values.name,
          completed: true,
        };
        const req = await updateUserData(id, newUserData);
        console.log('req', req);
        appDispatch(setIsPreloaderOpen(false));
        //todo обработать ошибку создания борды
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
            name="email"
            type="email"
            label={emailLabel}
            color="info"
          />
          <Button
            variant="outlined"
            color="info"
            disabled={isButtonDisabled}
            onClick={submitForm}
            type="submit"
          >
            {buttonText}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default EditProfileFormFormik;