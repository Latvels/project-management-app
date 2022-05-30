import React, {useState} from 'react';
import styled from '@emotion/styled';
import { grid } from '../testConst';
import { divTypes } from '../../../typings/typings';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import { useTranslation } from 'react-i18next';

export const Title = styled.div<divTypes>`
  padding: ${grid}px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  &:focus {
    outline-offset: 2px;
  }
`;

const Ti = styled.div<divTypes>`
padding: ${grid}px;
transition: background-color ease 0.2s;
flex-grow: 1;
user-select: none;
position: relative;
&:focus {
  outline-offset: 2px;
}
`;
type Props = {
  title?: string;
  index?: number;
  isScrollable?: boolean;
  isCombineEnabled?: boolean;
  height?: string;
  isDragging?: boolean;
  isDraggingOver?: boolean | undefined;
  isDropDisabled?: boolean | undefined;
  isDraggingFrom?: boolean;
  isGroupedOver?: boolean | undefined;
  isClone?: boolean | undefined;
  children?: string; 
  'aria-label'?: string;
  'data-rbd-drag-handle-draggable-id'?: string | undefined;
  'data-rbd-drag-handle-context-id'?: string | undefined;
  'aria-describedby'?: string | undefined;
};

export const TitleBox = (props: Props) => {
  const { t } = useTranslation();
  const { title, index,isScrollable, isCombineEnabled, height,isClone, children, isDragging, isDraggingOver,isDraggingFrom, isDropDisabled  } = props;
  const [alignment, setAlignment] = useState('');
  const [viewButtonEdit, setViewButtonEdit] = useState(false);
  const deleteColumn = () => {
    
  };
  const buttonChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    
  };
  const onChangeCapture = () => {
    setViewButtonEdit(viewButtonEdit === true ? false : true);
  };
  const onClickSubmit = () => {};
  const onClickCancel = () => {};

  return (
    <Ti>
      <Box>
        {viewButtonEdit ? (
          <Box
            sx={{
              display: 'flex',
              width: '11.5rem',
            }}
          >
            <TextField margin={'none'} size={'small'} value={props.title} type={'string'} />

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
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
            onClick={onChangeCapture}
          >
            {props.title}
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
        )}
      </Box>
    </Ti>
  );
};