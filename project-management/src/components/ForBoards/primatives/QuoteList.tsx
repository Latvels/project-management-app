/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react';
import styled from '@emotion/styled';
import QuoteItem from './QuoteItem';
import { grid } from '../testConst';
import Title from './Title';
import type { Quote } from '../testTypes';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import type {
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';

import '../allCss.css'

interface StyledDivProps {
    isDragging?: boolean;
    isDraggingOver?: boolean | undefined;
    isDropDisabled?: boolean | undefined;
    isDraggingFrom?: boolean;
  }
const DraggableContainer = styled.div<StyledDivProps>``;



const scrollContainerHeight = 250;


const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${scrollContainerHeight}px;
`;

type Props = {
  listId?: string;
  listType?: string;
  quotes: Quote[];
  title?: string;
  internalScroll?: boolean;
  isDropDisabled?: boolean;
  isCombineEnabled?: boolean;
  // may not be provided - and might be null
  ignoreContainerClipping?: boolean;
  useClone?: boolean;
};

type QuoteListProps = {
  quotes: Quote[];
};

const InnerQuoteList = memo(function InnerQuoteList(props: any) {
  return props.quotes.map((quote: Quote, index: number) => (
    <Draggable key={quote.id} draggableId={quote.id} index={index}>
      {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => (
        <QuoteItem
          key={quote.id}
          quote={quote}
          isDragging={dragSnapshot.isDragging}
          isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
        />
      )}
    </Draggable>
  ));
});

type InnerListProps = {
  dropProvided: DroppableProvided;
  quotes: Quote[];
  title?: string;
};

function InnerList(props: InnerListProps) {
  const { quotes, dropProvided } = props;
  const title = props.title ? <Title>{props.title}</Title> : null;

  return (
    <>
      {title}
      <DraggableContainer className='DropZone' ref={dropProvided.innerRef}>
        <InnerQuoteList quotes={quotes} />
        {dropProvided.placeholder}
      </DraggableContainer>
    </>
  );
}

export default function QuoteList(props: Props) {
  const {
    ignoreContainerClipping,
    internalScroll,
    isDropDisabled,
    isCombineEnabled,
    listId = 'LIST',
    listType,
    quotes,
    title,
    useClone,
  } = props;

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
      
    >
      {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => (
        <DraggableContainer className='Wrapper'
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={isDropDisabled}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <div className='ScrollContainer'>
              <InnerList quotes={quotes} title={title} dropProvided={dropProvided} />
            </div>
          ) : (
            <InnerList quotes={quotes} title={title} dropProvided={dropProvided} />
          )}
        </DraggableContainer>
      )}
    </Droppable>
  );
}
