import React from 'react';
import { Board, Column } from '../../typings/typings';
import { Box, Typography } from '@mui/material';
import MockColumn from './MockColumn';
import { useTranslation } from 'react-i18next';

interface IMockBoardProps {
  board: Board;
}

function MockBoard(props: IMockBoardProps) {
  const columns = props.board.columns! as Column[];

  const { t } = useTranslation();

  return (
    <>
      <Box sx={{ margin: '0.5rem 0 0 0.5rem' }}>
        <Typography component="p" sx={{ color: '#ed6c02' }}>
          {t('preview:message')}
        </Typography>
        {columns !== undefined && (
          <Box sx={{ display: 'flex', columnGap: 1, mt: 2, mb: 2 }}>
            {columns!.length > 0 &&
              columns!.map((column: Column) => {
                return <MockColumn key={column!.id} column={column}></MockColumn>;
              })}
          </Box>
        )}
      </Box>
    </>
  );
}

export default MockBoard;
