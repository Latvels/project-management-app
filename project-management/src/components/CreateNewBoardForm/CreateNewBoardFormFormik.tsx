import { Button, LinearProgress, TextareaAutosize } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { createBoards } from '../../api/api';
import { setIsCreateNewBoardModalOpen } from '../../store/action/appStateAction';
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
  const required = t('createNewBoardForm:validation.required');
  const minValue = t('createNewBoardForm:validation.minValue');

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  const validateForm = (values: IValues): Partial<IValues> => {
    const errors: Partial<IValues> = {};
    if (!values.title) {
      errors.title = required;
    } else if (values.title.length < 3) {
      errors.title = minValue;
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
        console.log(values);
        const req = await createBoards(values);
        console.log('req', req);
        //todo обработать ошибку создания борды
        appDispatch(setIsCreateNewBoardModalOpen(false));}}
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