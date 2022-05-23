import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import {
  getBoards,
  createBoard,
  updateBoards,
  getBoardsById,
  deleteBoard,
  selectBoard,
} from '../../api/boardApi';
import store, { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/header/Header';

function MainPage() {
  const { t } = useTranslation();
  //! пример
  const bdat = { id: '259132bf-2386-41b6-932a-b44a8d12010', title: 'main', description: 'page' };
  const { entities: board, loading } = useSelector(selectBoard);
  const iiid = 'dfa66578-979d-4a8e-b724-7092e7c94e0a';
  // console.log('store',  board, loading)
  const appDispatch = useDispatch<AppDispatch>();
  const testFunc = async () => {
    // await appDispatch(getBoards()) // получаю все записи
    // await appDispatch(getBoardsById(iiid)) // получаю запись
    // await appDispatch(updateBoards(bdat)) // обновление
    // await appDispatch(deleteBoard(iiid)) // удаление
    // await appDispatch(createBoard(bdat)) // создание
  };
  React.useEffect(() => {}, [appDispatch]);
  // ! конец примера
  return (
    <div>
      <h2>Main Page</h2>
      <p>{t('description:part1')}</p>
      {JSON.stringify(board)}
      <p>
        <Trans i18nKey="description:part2" />
      </p>
    </div>
  );
}

export default MainPage;
