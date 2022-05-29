import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCreateColumnModalOpen, setIsCreateNewBoardModalOpen, setIsCreateTaskModalOpen, setIsPreloaderOpen } from '../../store/action/appStateAction';
import { boardSlise, createBoard, getBoardsById } from '../../api/boardApi';
import { AppDispatch } from '../../store/store';
import { BasicAlerts } from '../compunents';
import { RootState } from '../../store/reducer/reducer';
import { ACTION_STATUSES, Column, Error, Task, ICreateElemFormProps } from '../../typings/typings';
import { createTask, taskSlise } from '../../api/taskApi';
import { createColumn, columnSlise } from '../../api/columnApi';
import './createElemFormFormik.scss';

interface IValues {
  title: string;
  description?: string;
}

function CreateElemFormFormik(props: ICreateElemFormProps) {
  const appDispatch = useDispatch<AppDispatch>();
  const awtUser = useSelector((state: RootState) => state.awtUser);
  const boardState = useSelector((state: RootState) => state.board);
  const boardRequestStatus = useSelector((state: RootState) => state.board.boardRequestStatus);
  const taskRequestStatus = useSelector((state: RootState) => state.task.taskRequestStatus);
  const columnRequestStatus = useSelector((state: RootState) => state.column.columnRequestStatus);
  const boardRequestError: Error = useSelector((state: RootState) => state.board.error);
  const taskRequestError: Error = useSelector((state: RootState) => state.task.error);
  const columnRequestError: Error = useSelector((state: RootState) => state.column.error);
  const {resetBoardRequestStatus} = boardSlise.actions;
  const {resetTaskRequestStatus} = taskSlise.actions;
  const {resetColumnRequestStatus} = columnSlise.actions;
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const {setColumn, setTask} = boardSlise.actions;

  const { t } = useTranslation();
  const buttonText = t('createNewBoardForm:submit');
  const required = t('formValidation:required');
  const minValue = t('formValidation:minValue');
  const maxValue = t('formValidation:maxValue');
  const maxValueDescription = t('formValidation:maxValueDescription');

  const getLabels = () => {
    const labels = {
      title: '',
      description: '',
    };
    switch (props.elemType) {
      case 'board':
        labels.title = t('createNewBoardForm:boardTitle');
        labels.description = t('createNewBoardForm:boardDescription');
        break;
      case 'task':
        labels.title = t('createTaskForm:taskTitle');
        labels.description = t('createTaskForm:taskDescription');
        break;
      case 'column':
        labels.title = t('createColumnForm:columnTitle');
    }
    return labels;
  }

  const validateForm = (values: IValues): Partial<IValues> => {
    const errors: Partial<IValues> = {};

    function checkFormField(key: keyof IValues) {
      if (!values[key]) {
        errors[key] = required;
      } else if (values[key]!.length < 4) {
        errors[key] = minValue;
      }
    };

    function checkMaxLength(key: keyof IValues) {
      if (key === 'title' && values[key].length > 15) {
        errors.title = maxValue;
      }
      if (key === 'description' && values[key]!.length > 30) {
        errors.description = maxValueDescription;
      }
    }
    setIsButtonDisabled(true);
    checkFormField('title');
    checkMaxLength('title');

    if (props.elemType !== 'column') {
      checkFormField('description');
      checkMaxLength('description');
    }

    if(props.elemType !== 'column') {
      if (!errors.title && !errors.description) {
        setIsButtonDisabled(false);
      } 
    } else {
      if (!errors.title) {
        setIsButtonDisabled(false);
      }
    }

    return errors;
  }

  const initialValues = {
    title: '',
    description: '',
  };

  const getCreateElemResponse = async (values: IValues) => {
    let resp;
    switch (props.elemType) {
      case 'board':
        resp = await appDispatch(createBoard(values));
        appDispatch(setIsPreloaderOpen(false));
        if (resp.meta.requestStatus === 'fulfilled') {
          appDispatch(setIsCreateNewBoardModalOpen(false));
          appDispatch(resetBoardRequestStatus());
        }
        break;
      case 'task':
        const id = boardState.currentBoard!.id;
        const taskData: Task = {
          title: values.title,
          description: values.description,
          columnId: boardState.currentBoard!.columns![0].id,
          boardId: id,
          userId: awtUser.user!.id!,
        }
        resp = await appDispatch(createTask(taskData));
        appDispatch(setIsPreloaderOpen(false));
        if (resp.meta.requestStatus === 'fulfilled') {
          appDispatch(getBoardsById(id!))
          appDispatch(resetTaskRequestStatus());
          appDispatch(setIsCreateTaskModalOpen(false));
        }
        break;

      case 'column':
        const columnData: Column = {
          title: values.title,
          idBoard: boardState.currentBoard!.id,
        };
        resp = await appDispatch(createColumn(columnData));
        appDispatch(setIsPreloaderOpen(false));
        if (resp.meta.requestStatus === 'fulfilled') {
          appDispatch(setIsCreateColumnModalOpen(false));
          appDispatch(resetColumnRequestStatus());
          appDispatch(setColumn(resp.payload));
        }
    }
    return resp;
  }

  const getRequestStatus = () => {
    let status;
    switch (props.elemType) {
      case 'board':
        status = boardRequestStatus;
        break;
      case 'task':
        status = taskRequestStatus;
        break;
      case 'column':
        status = columnRequestStatus;
        break;
    }
    return status;
  }

  const getRequestError = () => {
    let error;
    switch (props.elemType) {
      case 'board':
        error = boardRequestError;
        break;
      case 'task':
        error = taskRequestError;
        break;
      case 'column':
        error = columnRequestError;
        break;
    }
    return error;
  }

  return (
    <>
      {getRequestStatus() === ACTION_STATUSES.REJECTED ? (
        <BasicAlerts error={getRequestError()} errorType={props.elemType} />
      ) : (
      <Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={async (values: IValues, { setSubmitting }) => {
          setSubmitting(false);
          appDispatch(setIsPreloaderOpen(true));
          await getCreateElemResponse(values);
        }}
      >
        {({ submitForm }) => (
          <Form className="form">
            <Field component={TextField} name="title" type="text" label={getLabels().title} color="info" />
            {props.elemType !== 'column' && (<Field
              component={TextField}
              name="description"
              type="text"
              label={getLabels().description}
              color="info"
            />)}
            <Button
              variant="outlined"
              color="info"
              disabled={isButtonDisabled}
              onClick={submitForm}
            >
              {buttonText}
            </Button>
          </Form>
        )}
      </Formik>
      )}
    </>
  );
}

export default CreateElemFormFormik;