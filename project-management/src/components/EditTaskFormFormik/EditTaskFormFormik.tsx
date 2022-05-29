import react, { useState, useEffect, ChangeEvent } from 'react';
import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setIsPreloaderOpen, setIsEditTaskModalOpen } from '../../store/action/appStateAction';
import { updateTask, taskSlise, getTaskById } from '../../api/taskApi';
import { AppDispatch } from '../../store/store';
import { Task, Error, ACTION_STATUSES } from '../../typings/typings';
import { RootState } from '../../store/reducer/reducer';
import { BasicAlerts } from '../compunents';
import { boardSlise } from '../../api/boardApi';
import './editTaskFormFormik.scss';

interface IValues {
  title: string;
  description: string;
}

function EditTaskFormFormik() {
  const appDispatch = useDispatch<AppDispatch>();
  const taskData = useSelector((state: RootState) => state.board.currentTask);
  const {changeTask} = boardSlise.actions;
  const boardState = useSelector((state: RootState) => state.board);
  const taskRequestError = useSelector((state: RootState) => state.task.error) as Error;
  const taskRequestStatus = useSelector((state: RootState) => state.task.taskRequestStatus);
  const {resetTaskRequestStatus} = taskSlise.actions;
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [taskdata, setTaskdata] = useState<Task>({});

  const { t } = useTranslation();
  const titleLabel = t('editTaskForm:title');
  const descriptionLabel = t('editTaskForm:description');
  const submitButtonText = t('editTaskForm:submit');
  const minValue = t('formValidation:minValue');
  const maxValue = t('formValidation:maxValue');
  const required = t('formValidation:required');
  const maxValueDescription = t('formValidation:maxValueDescription');

  const initialValues = {
    title: taskData!.title!,
    description: taskData!.description!,
  }

  const getTaskData = async () => {
    appDispatch(setIsPreloaderOpen(true));
    const data = {
      boardId: boardState.currentBoard!.id,
      columnId: boardState.currentColumn!.id,
      id: taskData!.id,
    }
    // const testData = {
    //   boardId: 'ecbfe8b6-6ad4-4499-8508-333f646114fe',
    //   columnId: 'e0d98128-e5a4-4ef8-a0f5-4ad54fc81bc9',
    //   id: 'fc3f4cf9-d75d-4223-b415-8b9daa29087d',
    // }
    const resp = await appDispatch(getTaskById(data));
    appDispatch(setIsPreloaderOpen(false));
    if(resp.meta.requestStatus === 'fulfilled') {
      appDispatch(resetTaskRequestStatus());
      const respData = resp.payload as Task;
      setTaskdata(respData);
    }
  };

  useEffect(() => {
    getTaskData();
  }, []);

  const validateForm = (values: IValues): Partial<IValues> => {
    const errors: Partial<IValues> = {};
    function checkFormField(key: keyof IValues) {
      if (!values[key]) {
        errors[key] = required;
      } else if (values[key].length < 4) {
        errors[key] = minValue;
      } else if (key === 'title' && values[key].length > 12) {
        errors[key] = maxValue;
      } else if (key === 'description' && values[key].length > 30) {
        errors[key] = maxValueDescription;
      }
    }

    setIsButtonDisabled(true);
    checkFormField('title');
    checkFormField('description');

    if (!errors.title && !errors.description) {
      setIsButtonDisabled(false);
    }
    return errors;
  };

  return (
    <>
      {taskRequestStatus === ACTION_STATUSES.REJECTED ? <BasicAlerts error={taskRequestError} errorType='task' /> :
      (<Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={async (values: IValues, {setSubmitting}) => {
        setSubmitting(false);
        appDispatch(setIsPreloaderOpen(true));
        console.log('boardId: ', boardState.currentBoard?.id);
        console.log('columnId: ', boardState.currentColumn?.id);
        console.log('userId: ', taskdata.userId);
        const newTaskData: Task = {
          id: String(taskdata!.id!),
          title: values.title,
          order: taskdata!.order!,
          description: values.description,
          userId: String(taskdata!.userId!),
          boardId: String(boardState.currentBoard!.id!),
          columnId: String(boardState.currentColumn!.id!),
        };
        console.log(newTaskData);
        const resp = await appDispatch(updateTask(newTaskData));
        appDispatch(setIsPreloaderOpen(false));
        if(resp.meta.requestStatus === 'fulfilled') {
          appDispatch(changeTask(resp.payload));
          appDispatch(setIsEditTaskModalOpen(false));
          appDispatch(resetTaskRequestStatus());
        }
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
          >
            {submitButtonText}
          </Button>
        </Form>
      )}
      </Formik>)}
    </>
  );
}

export default EditTaskFormFormik;
