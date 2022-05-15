import { Button, LinearProgress, TextareaAutosize } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import './createNewBoardFormFormik.scss';

interface Values {
  title: string;
  description: string;
}

function CreateNewBoardFormFormik() {
  const {t} = useTranslation();
  const titleLabel = t('createNewBoardForm:boardTitle');
  const descriptionLabel = t('createNewBoardForm:boardDescription');
  const buttonText = t('createNewBoardForm:submit');
  const required = t('createNewBoardForm:validation.required');
  const minValue = t('createNewBoardForm:validation.minValue');


  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
      }}
      validate={(values) => {
        const errors: Partial<Values> = {};
        if (!values.title) {
          errors.title = required;
        } else if (values.title.length < 3) {
          errors.title = minValue;
        } else if (!values.description) {
          errors.description = required;
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          console.log(values);
      }}
    >
      {({ submitForm, isSubmitting }) => (
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
            // aria-label="empty textarea"
            // component={TextareaAutosize}
            // label={descriptionLabel}
            // name="description"
            // placeholder={descriptionLabel}
            // color="info"
            // className="form__field--textArea"
            // required
          />
          {isSubmitting && <LinearProgress />}
          <Button
            variant="outlined"
            color="info"
            disabled={isSubmitting}
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