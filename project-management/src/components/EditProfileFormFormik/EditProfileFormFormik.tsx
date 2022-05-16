import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import react, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { updateUserData1 } from '../../api/api';
import { setIsEditProfileModalOpen, setIsPreloaderOpen } from '../../store/action/appStateAction';
import { User1 } from '../../typings/typings';
import './editProfileFormFormik.scss';

interface IValues {
  name: string;
  password: string,
  login: string,
}

function EditProfileFormFormik() {
  // todo use state
  const id = '';
// eebd290b-93dc-4f15-b8a7-c40f3315aa0b
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlZWJkMjkwYi05M2RjLTRmMTUtYjhhNy1jNDBmMzMxNWFhMGIiLCJsb2dpbiI6InVzZXJMb2dpbiIsImlhdCI6MTY1MjcxMDAzOH0.D7LxzYpRc0_lsZIRqFXHwmaTjWxlM9T8L-QxLpvP1-8
  const appDispatch = useDispatch();
  const {t} = useTranslation();
  // const emailLabel = t('editProfileForm:email');
  const nameLabel = t('editProfileForm:name');
  const loginLabel = t('editProfileForm:login');
  const passLabel = t('editProfileForm:pass');
  const buttonText = t('editProfileForm:submit');
  // const invalidEmail = t('formValidation:minValue');
  // const invalidEmail = t('formValidation:invalidEmail');
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
    // } else if(!values.email) {
    //   errors.email = required;
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //   errors.email = invalidEmail;
    // }
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

  return (
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={async (values: IValues, {setSubmitting}) => {
        setSubmitting(false);
        appDispatch(setIsEditProfileModalOpen(false));
        appDispatch(setIsPreloaderOpen(true))
        const newUserData: User1 = {
          name: values.name,
          login: values.login,
          password: values.password
        };
        const req = await updateUserData1(id, newUserData);
        console.log('req', req);
        appDispatch(setIsPreloaderOpen(false));
        //todo обработать ошибки api
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
          {/* <Field
            component={TextField}
            name="email"
            type="email"
            label={emailLabel}
            color="info"
          /> */}
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