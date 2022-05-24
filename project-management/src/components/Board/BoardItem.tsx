import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ItemProps {
  text: string
  index: number
}

const Item: React.FC<ItemProps> = ({ text, index }) => {
  const deleteRow = () => {
    console.log('ROW delete');
  };

  return (
    <Draggable draggableId={text} index={index}>
      {provided => (
        <Box sx={{
          border: '1px solid #acacac',
          borderRadius: '2%',
          padding: '0.5rem',
          margin: '0 0 0.2rem 0.2rem',
          width: '16rem',
          boxShadow: '2px 2px 0px 1px rgb(165 165 165 / 20%)',
        }}
        ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          >
        <Box>
          <Box sx={{
          justifyContent: 'flex-end',
          display: 'flex',
        }}>
          <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                deleteRow();
              }}
            >
              <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>
          {text}
        </Box>
        </Box>
      )}
    </Draggable>
  )
}

export default Item
