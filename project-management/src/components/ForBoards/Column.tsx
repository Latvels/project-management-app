import { Component } from 'react';
import styled from '@emotion/styled';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import type { DraggableStateSnapshot } from 'react-beautiful-dnd';
import QuoteList from './primatives/QuoteList';
import { grid, borderRadius } from './testConst';
import type { Quote } from './testTypes';
import Title from './primatives/Title';
import { divTypes } from '../../typings/typings';

type Props = {
  title: string;
  quotes: Quote[];
  index: number;
  isScrollable?: boolean;
  isCombineEnabled?: boolean;
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

function Column(props:Props) {
  
    const title: string = props.title;
    const quotes: Quote[] = props.quotes;
    const index: number = props.index;

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
                {title}
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
