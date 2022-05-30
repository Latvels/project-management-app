import styled from '@emotion/styled';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import type { DraggableStateSnapshot } from 'react-beautiful-dnd';
import QuoteList from './primatives/QuoteList';
import { grid, borderRadius } from '../../constants/constant';
import type { Quote } from './testTypes';
import { divTypes } from '../../typings/typings';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import React, { useState, useRef } from 'react';
import UseOnClickOutside from '../../utils/HookUseOnClickOutside';
import {
  Box,
  IconButton,
  Tooltip,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

type Props = {
  quotes: Quote[];
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
};

const Container = styled.div<divTypes>`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div<divTypes>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: #f4f4f4;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #d4d4d4;
  }
`;

const Title = styled.div<divTypes>`
  padding: ${grid}px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  &:focus {
    outline-offset: 2px;
  }
`;

function Column(props: Props) {
  const { t } = useTranslation();
  const [alignment, setAlignment] = useState('');

  const titleRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState(props.title || '');
  const [index, setIndex] = useState(props.index || 0);

  const [viewButtonEdit, setViewButtonEdit] = useState(true);
  const [viewEditRow, setViewEditRow] = useState(false);

  const deleteColumn = () => {};
  const buttonChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {};
  const onChangeTitle = () => {
    setViewButtonEdit(false);
  };
  const onChangeView = () => {
    setViewEditRow(viewEditRow === true ? false : true);
  };
  const onClickSubmit = () => {};
  const onClickCancel = () => {};

  const quotes: Quote[] = props.quotes;

  const clickOutsidehandler = () => {
    setViewEditRow(false);
  };
  UseOnClickOutside(titleRef, clickOutsidehandler);

  return (
    <Draggable draggableId={title} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <Header isDragging={snapshot.isDragging}>
            <Title
              isDragging={snapshot.isDragging}
              {...provided.dragHandleProps}
              aria-label={`${title} quote list`}
            >
              <Box>
                {viewEditRow ? (
                  <Box
                    ref={titleRef}
                    sx={{
                      display: 'flex',
                      width: '11.5rem',
                    }}
                  >
                    <TextField
                      onChange={onChangeTitle}
                      margin={'none'}
                      size={'small'}
                      value={title}
                      type={'string'}
                    />

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
                      alignItems: 'center',
                    }}
                    onClick={onChangeView}
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
            </Title>
          </Header>
          <QuoteList
            listId={title}
            listType="QUOTE"
            quotes={quotes}
            internalScroll={props.isScrollable}
            isCombineEnabled={Boolean(props.isCombineEnabled)}
          />
        </Container>
      )}
    </Draggable>
  );
}

export default Column;
