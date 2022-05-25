import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCreateNewBoardModalOpen, setIsPreloaderOpen } from '../../store/action/appStateAction';
import { boardSlise, createBoard } from '../../api/boardApi';
import { AppDispatch } from '../../store/store';
import { BasicAlerts } from '../compunents';
import { RootState } from '../../store/reducer/reducer';
import { ACTION_STATUSES, Error } from '../../typings/typings';
import './createNewBoardFormFormik.scss';

interface IValues {
  title: string;
  description: string;
}

function CreateNewBoardFormFormik() {
  const appDispatch = useDispatch<AppDispatch>();
  const requestStatus = useSelector((state: RootState) => state.board.boardRequestStatus);
  const requestError: Error = useSelector((state: RootState) => state.board.error);
  const {resetBoardRequestStatus} = boardSlise.actions;
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { t } = useTranslation();
  const titleLabel = t('createNewBoardForm:boardTitle');
  const descriptionLabel = t('createNewBoardForm:boardDescription');
  const buttonText = t('createNewBoardForm:submit');
  const required = t('formValidation:required');
  const minValue = t('formValidation:minValue');
  const maxValue = t('formValidation:maxValue');
  const maxValueDescription = t('formValidation:maxValueDescription');


  const validateForm = (values: IValues): Partial<IValues> => {
    const errors: Partial<IValues> = {};

    function checkFormField(key: keyof IValues) {
      if (!values[key]) {
        errors[key] = required;
      } else if (values[key].length < 3) {
        errors[key] = minValue;
      }
    };

    function checkMaxLength(key: keyof IValues) {
      if (key === 'title' && values[key].length > 15) {
        errors.title = maxValue;
      }
      if (key === 'description' && values[key].length > 30) {
        errors.description = maxValueDescription;
      }
    }
    setIsButtonDisabled(true);
    checkFormField('title');
    checkFormField('description');
    checkMaxLength('title');
    checkMaxLength('description');
    if (!errors.title && !errors.description) {
      setIsButtonDisabled(false);
    }
    return errors;
  }

  const initialValues = {
    title: '',
    description: '',
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={async (values: IValues, { setSubmitting }) => {
          setSubmitting(false);
          appDispatch(setIsPreloaderOpen(true));
          const resp = await appDispatch(createBoard(values));
          appDispatch(setIsPreloaderOpen(false));
          if (resp.meta.requestStatus === 'fulfilled') {
            appDispatch(setIsCreateNewBoardModalOpen(false));
            appDispatch(resetBoardRequestStatus());
          }
        }}
      >
        {({ submitForm }) => (
          <Form className="form">
            <Field component={TextField} name="title" type="text" label={titleLabel} color="info" />
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
            >
              {buttonText}
            </Button>
            {requestStatus === ACTION_STATUSES.REJECTED && <BasicAlerts error={requestError} />}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateNewBoardFormFormik;