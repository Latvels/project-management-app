import { memo } from 'react';
import styled from '@emotion/styled';
import QuoteItem from './QuoteItem';
import { grid } from '../../../constants/constant';
import type { Quote } from '../testTypes';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import type {
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import { divTypes } from '../../../typings/typings';


const Wrapper = styled.div<divTypes>`
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
  padding: ${grid}px;
  border: ${grid}px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 250px;
`;

const scrollContainerHeight = 250;

const DropZone = styled.div<divTypes>`
  min-height: ${scrollContainerHeight}px;
  padding-bottom: ${grid}px;
`;

const ScrollContainer = styled.div<divTypes>`
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
  ignoreContainerClipping?: boolean;
};

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


const InnerQuoteList = memo(function InnerQuoteList(props: any) {
  return props.quotes.map((quote: Quote, index: number) => (
    <Draggable key={quote.id} draggableId={quote.id} index={index}>
      {(
        dragProvided: DraggableProvided,
        dragSnapshot: DraggableStateSnapshot,
      ) => (
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
      <DropZone ref={dropProvided.innerRef}>
        <InnerQuoteList quotes={quotes} />
        {dropProvided.placeholder}
      </DropZone>
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
  } = props;

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
    >
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot,
      ) => (
        <Wrapper
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={isDropDisabled}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <ScrollContainer>
              <InnerList
                quotes={quotes}
                title={title}
                dropProvided={dropProvided}
              />
            </ScrollContainer>
          ) : (
            <InnerList
              quotes={quotes}
              title={title}
              dropProvided={dropProvided}
            />
          )}
        </Wrapper>
      )}
    </Droppable>
  );
}