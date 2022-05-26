import React from 'react';
import BoardItem from './BoardItem';
import { Droppable } from 'react-beautiful-dnd';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  InputBase,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import EditOffIcon from '@mui/icons-material/EditOff';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

interface ColumnProps {
  col: {
    id: string;
    list: string[];
  };
}
// TODO стили колонок
const BoardColumn: React.FC<ColumnProps> = ({ col: { list, id } }) => {
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
  const buttonChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    console.log('textBTN', newAlignment, event);
  };
  const onChangeCapture = () => {
    setViewButtonEdit(viewButtonEdit === true ? false : true);
  };
  const onClickSubmit = () => {};
  const onClickCancel = () => {};

  return (
    <Box
      sx={{
        border: '1px solid #acacac',
        borderRadius: '2%',
        width: '18rem',
        height: 'auto',
        boxShadow: '6px 5px 0px 1px rgb(165 165 165 / 20%)',
      }}
    >
      <Droppable droppableId={id}>
        {(provided) => (
          <Box>
            <Box
              sx={{
                justifyContent: 'space-between',
                display: 'flex',
              }}
            >
              {/* тут будет инпут для title */}
              {viewButtonEdit ? (
                <Box
                  sx={{
                    display: 'flex',
                    margin: 0,
                    left: 0,
                    padding: '0.7rem',
                  }}
                >
                  <TextField margin={'none'} size={'small'} value={id} type={'string'} />
                  <ToggleButtonGroup
                    color="primary"
                    disabled={viewButtonEdit}
                    value={alignment}
                    exclusive={true}
                    size={'small'}
                    onChange={buttonChange}
                  >
                    <ToggleButton size={'small'} value="submit" onClick={onClickSubmit}>
                      <Tooltip title={t('boardPage:submit')}>
                        <EditIcon fontSize="inherit" />
                      </Tooltip>
                    </ToggleButton>
                    <ToggleButton size={'small'} value="cancel" onClick={onClickCancel}>
                      <Tooltip title={t('boardPage:cancel')}>
                        <EditOffIcon fontSize="inherit" />
                      </Tooltip>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    margin: 0,
                    left: 0,
                    padding: '0.7rem',
                  }}
                  onClick={onChangeCapture}
                >
                  {id}
                </Box>
              )}
              <Box>
                <Tooltip title={t('boardPage:delColumn')}>
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
                </Tooltip>
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
