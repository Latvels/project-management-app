import React from 'react';
import BoardItem from './BoardItem';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Button, IconButton, Tooltip, TextField, ToggleButton, ToggleButtonGroup, Divider, InputBase, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ColumnProps {
  col: {
    id: string;
    list: string[];
  };
}
// TODO стили колонок
const BoadrBox: React.FC<ColumnProps> = ({ col: { list, id } }) => {

  const { t } = useTranslation();
  // кнопки
  const [alignment, setAlignment] = React.useState('');
  const [viewButtonEdit, setViewButtonEdit] = React.useState(false);

  const deleteColumn = () => {
    console.log('Column delete');
  };
  const addRow = () => {
    console.log('addRow');
  };
  const buttonChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    console.log('textBTN',newAlignment,event )
  };
  const onChangeCapture = () => {
    setViewButtonEdit(viewButtonEdit === true ? false : true);
  }
  const onClickSubmit = () => {

  }
  const onClickCancel = () => {

  }

  return (
    <Box sx={{
      border: '1px solid #acacac',
      borderRadius: '2%',
      width: '18rem',
      height: 'auto',
      boxShadow: '6px 5px 0px 1px rgb(165 165 165 / 20%)',
    }}>
      <Droppable droppableId={id}>
       {(provided) => (
         <div {...provided.droppableProps} ref={provided.innerRef} >
         {list.map((text, index) => (
           <BoardItem key={text} text={text} index={index} />
         ))}
         {provided.placeholder}
       </div>
       )}
      </Droppable>
    </Box>
  );
};

export default BoadrBox;
