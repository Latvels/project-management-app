import React from 'react';
import { Board, Column } from '../../typings/typings';
import { Box, Typography } from '@mui/material';
import MockColumn from './MockColumn';

interface IMockBoardProps {
  board: Board;
}

function MockBoard(props: IMockBoardProps) {
  const columns = props.board.columns! as Column[];

  return (
    <>
    <Box sx={{margin: '0.5rem 0 0 0.5rem' }}>
      <Typography variant='h6' component='h3' sx={{textTransform: 'uppercase', color: '#ed6c02'}}>prewiev</Typography>
      {columns !== undefined && 
      <Box sx={{display: 'flex', columnGap: 1, mt:2, mb: 2 }}>
        {columns!.length > 0 && (
          columns!.map((column: Column) => {
          return <MockColumn key={column!.id} column={column}></MockColumn>
          }
        )
        )}
      </Box>}
    </Box>
    </>
  )
}

export default MockBoard;