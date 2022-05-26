import { Component } from 'react';
import styled from '@emotion/styled';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import type { DraggableStateSnapshot } from 'react-beautiful-dnd';
/* eslint-disable @typescript-eslint/no-explicit-any */
import QuoteList from './primatives/QuoteList';
import { grid, borderRadius } from './testConst';
import type { Quote } from './testTypes';
import './allCss.css'

type Props = {
  title: string;
  quotes: Quote[];
  index: number;
  isScrollable?: boolean;
  isCombineEnabled?: boolean;
  useClone?: boolean;
};
interface StyledDivProps {
    isDragging: boolean;
  }
const DraggableContainer = styled.div<StyledDivProps>``;

export default class Column extends Component<Props> {
  render() {
    const title: string = this.props.title;
    const quotes: Quote[] = this.props.quotes;
    const index: number = this.props.index;
    return (
      <Draggable draggableId={title} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <div className='container' ref={provided.innerRef} {...provided.draggableProps}>
            <DraggableContainer className='header' isDragging={snapshot.isDragging}>
              <DraggableContainer
                className='title'
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
                aria-label={`${title} quote list`}
              >
                {title}
              </DraggableContainer>
            </DraggableContainer>
            <QuoteList
              listId={title}
              listType="QUOTE"
              quotes={quotes}
              internalScroll={this.props.isScrollable}
              isCombineEnabled={Boolean(this.props.isCombineEnabled)}
              useClone={Boolean(this.props.useClone)}
            />
          </div>
        )}
      </Draggable>
    );
  }
}
