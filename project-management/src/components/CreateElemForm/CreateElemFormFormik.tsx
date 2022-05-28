import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCreateColumnModalOpen, setIsCreateNewBoardModalOpen, setIsPreloaderOpen } from '../../store/action/appStateAction';
import { boardSlise, createBoard } from '../../api/boardApi';
import { AppDispatch } from '../../store/store';
import { BasicAlerts } from '../compunents';
import { RootState } from '../../store/reducer/reducer';
import { ACTION_STATUSES, Column, Error, Task, ICreateElemFormProps } from '../../typings/typings';
import { createTask, taskSlise } from '../../api/taskApi';
import { createColumn, columnSlise } from '../../api/columnApi';
import './createElemFormFormik.scss';
import { ConstructionOutlined } from '@mui/icons-material';

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
        const taskData: Task = {
          title: values.description,
          description: values.description,
          columnId: boardState.currentBoard!.columns![0].id,
          boardId: boardState.currentBoard!.id,
          userId: awtUser.id!,
          done: false,
        }
        console.log(taskData);
        resp = await appDispatch(createTask(taskData));
        appDispatch(setIsPreloaderOpen(false));
        console.log(resp);
        if (resp.meta.requestStatus === 'fulfilled') {
        // resp  {
        //     "title": "test task",
        //     "done": false,
        //     "order": 1,
        //     "description": "test task description",
        //     "userId": "f9730773-8e68-4516-84ce-3ae3d90950d1",
        //     "boardId": "60d6a65b-3591-4d42-9af2-eefff9fd3427",
        //     "columnId": "3c4db36a-67d5-426a-8f20-c62b2966af11",
        //     "id": "c32dcc35-9790-416b-84a1-7dba67a1306f"
        // }
          console.log(resp);
          appDispatch(setTask(resp.payload));
          appDispatch(resetTaskRequestStatus());
        }
        break;

      case 'column':
        const columnData: Column = {
          title: values.title,
          idBoard: boardState.currentBoard!.id,
          // order: 3
 //todo "order must be a number conforming to the specified constraints"
        };
        resp = await appDispatch(createColumn(columnData));
        // console.log(resp);
        appDispatch(setIsPreloaderOpen(false));
        if (resp.meta.requestStatus === 'fulfilled') {
          //resp.payload{
          //     "id": "ff447795-3193-433e-a08e-2fb0cc6f2beb",
          //     "title": "test column",
          //     "order": 1
          // }
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
        console.log(error);
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