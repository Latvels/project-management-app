import react from 'react';
import { BasicAlerts } from '../components/compunents';
import { Error } from '../typings/typings';

export const err = (errorMessage:Error)=> {
  const { message } = errorMessage

  if (message !== '') {
    return <BasicAlerts error={errorMessage}/>
  }
}
