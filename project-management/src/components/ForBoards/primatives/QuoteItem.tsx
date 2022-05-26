/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react';
import styled from '@emotion/styled';
import { borderRadius, grid } from '../testConst';
import type { Quote, AuthorColors } from '../testTypes';
import type { DraggableProvided } from 'react-beautiful-dnd';

import '../allCss.css'

interface StyledDivProps {
    isDragging?: boolean;
    isDraggingOver?: boolean | undefined;
    isGroupedOver?: boolean | undefined;
    isClone?: boolean | undefined;
  }
const DraggableContainer = styled.div<StyledDivProps>``;

type Props = {
  quote: Quote;
  isDragging: boolean;
  provided: DraggableProvided;
  isClone?: boolean;
  isGroupedOver?: boolean;
  index?: number;
};

const imageSize = 40;

const Container = styled.a`
  border-radius: ${borderRadius}px;
  border: 2px solid transparent;
  box-sizing: border-box;
  padding: ${grid}px;
  min-height: ${imageSize}px;
  margin-bottom: ${grid}px;
  user-select: none;
  /* anchor overrides */
  &:hover,
  &:active {
    text-decoration: none;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
  /* flexbox */
  display: flex;
`;


const Content = styled.div`
  /* flex child */
  flex-grow: 1;
  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%;
  /* flex parent */
  display: flex;
  flex-direction: column;
`;

const BlockQuote = styled.div`
  &::before {
    content: open-quote;
  }
  &::after {
    content: close-quote;
  }
`;

const Footer = styled.div`
  display: flex;
  margin-top: ${grid}px;
  align-items: center;
`;

const Author = styled.small`
  flex-grow: 0;
  margin: 0;
  border-radius: ${borderRadius}px;
  font-weight: normal;
  padding: ${grid / 2}px;
`;

const QuoteId = styled.small`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0;
  font-weight: normal;
  text-overflow: ellipsis;
  text-align: right;
`;

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent
function QuoteItem(props: Props) {
  const { quote, isDragging, isGroupedOver, provided, isClone, index } = props;

  return (
    <DraggableContainer
      className='Container2'
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      isClone={isClone}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      data-is-dragging={isDragging}
      data-testid={quote.id}
      data-index={index}
      aria-label={`${quote.author.name} quote ${quote.content}`}
    >
      {isClone ? <div className='CloneBadge'>Clone</div> : null}
      <Content>
        <BlockQuote>{quote.content}</BlockQuote>
        <Footer>
          <Author>{quote.author.name}</Author>
          <QuoteId>id:{quote.id}</QuoteId>
        </Footer>
      </Content>
    </DraggableContainer>
  );
}

export default memo(QuoteItem);
