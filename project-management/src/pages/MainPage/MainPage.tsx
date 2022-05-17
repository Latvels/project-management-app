import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import { getBoards, createBoard,updateBoards, getBoardsById, deleteBoard, selectBoard } from '../../api/boardApi'
import store, { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';

function MainPage() {
  const { t } = useTranslation();
  const bdat = {id:'dfa66578-979d-4a8e-b724-7092e7c94e0a', title: 'main', description: 'page'}
  const { entities: board, loading } = useSelector(selectBoard)
  const iiid = 'dfa66578-979d-4a8e-b724-7092e7c94e0a'
  console.log('store',  board, loading)
  const appDispatch = useDispatch<AppDispatch>();
  const testFunc = async () => {
    // await appDispatch(getBoards()) // получаю все записи 
    // await appDispatch(getBoardsById(bdat.id)) // получаю запись 
    // await appDispatch(updateBoards(bdat)) // обновление
    // await appDispatch(deleteBoard(iiid)) // удаление
    // await appDispatch(createBoard(bdat)) // создание
  }
  React.useEffect(() => {
    testFunc();
  }, [appDispatch])

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
