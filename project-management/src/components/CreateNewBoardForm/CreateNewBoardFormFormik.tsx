import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { createBoards } from '../../api/api';
import { setIsCreateNewBoardModalOpen, setIsPreloaderOpen } from '../../store/action/appStateAction';
import './createNewBoardFormFormik.scss';

interface IValues {
  title: string;
  description: string;
}

function CreateNewBoardFormFormik() {
  const appDispatch = useDispatch();
  const {t} = useTranslation();
  const titleLabel = t('createNewBoardForm:boardTitle');
  const descriptionLabel = t('createNewBoardForm:boardDescription');
  const buttonText = t('createNewBoardForm:submit');
  const required = t('formValidation:required');
  const minValue = t('formValidation:minValue');
  const maxValue = t('formValidation:maxValue');

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  const validateForm = (values: IValues): Partial<IValues> => {
    const errors: Partial<IValues> = {};
    setIsButtonDisabled(true);
    if (!values.title) {
      errors.title = required;
    } else if (values.title.length < 3) {
      errors.title = minValue;
    } else if (values.title.length > 12) {
      errors.title = maxValue;
    } else if (!values.description) {
      errors.description = required;
    }
    if (!errors.title && !errors.description) {
      setIsButtonDisabled(false);
    }
    return errors;
  }

  const initialValues = {
    title: '',
    description: '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={async (values: IValues, {setSubmitting}) => {
        setSubmitting(false);
        appDispatch(setIsCreateNewBoardModalOpen(false));
        appDispatch(setIsPreloaderOpen(true))
        const req = await createBoards(values);
        console.log('req', req);
        appDispatch(setIsPreloaderOpen(false));
        //todo обработать ошибку создания борды
      }}
    >
      {({ submitForm }) => (
        <Form className="form">
          <Field
            component={TextField}
            name="title"
            type="text"
            label={titleLabel}
            color="info"
          />
          <Field
            component={TextField}
            name="description"
            type="text"
            label={descriptionLabel}
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

export default CreateNewBoardFormFormik;