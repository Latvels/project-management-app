import React from 'react';
import BoardItem from './BoardItem';
import { Droppable } from 'react-beautiful-dnd';
import { Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
interface ColumnProps {
  col: {
    id: string;
    list: string[];
  };
}
// TODO стили колонок
const BoardColumn: React.FC<ColumnProps> = ({ col: { list, id } }) => {
  const deleteColumn = () => {
    console.log('Column delete');
  };
  const addRow = () => {
    console.log('addRow');
  };

  return (
    <Box sx={{
      border: '1px solid #acacac',
      borderRadius: '2%',
      width: '17rem',
      height: 'auto',
      boxShadow: '6px 5px 0px 1px rgb(165 165 165 / 20%)',
    }}>
      <Droppable droppableId={id}>
      {(provided) => (
        <Box>
          <Box sx={{
            justifyContent: 'space-between',
            display: 'flex',
          }}>
            <Box sx={{
              display: 'flex',
              margin: 0,
              left: 0,
              paddingLeft: '0.5rem',
            }}>
            <h3>{id}</h3>
            </Box>
            <Box>
              <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    addRow();
                  }}
                >
                  <AddIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    deleteColumn();
                  }}
                >
                  <CloseIcon fontSize="inherit" />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {list.map((text, index) => (
                <BoardItem key={text} text={text} index={index} />
              ))}
              {provided.placeholder}
            </div>
          </Box>
        </Box>
      )}
      </Droppable>
    </Box>
  );
};

export default BoardColumn;
