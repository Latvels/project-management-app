import { memo } from 'react';
import styled from '@emotion/styled';
import { borderRadius, grid } from '../testConst';
import type { Quote } from '../testTypes';
import type { DraggableProvided } from 'react-beautiful-dnd';
import { divTypes } from '../../../typings/typings';

type Props = {
  quote: Quote;
  isDragging: boolean;
  provided: DraggableProvided;
  isClone?: boolean;
  isGroupedOver?: boolean;
  index?: number;
};

const CloneBadge = styled.div<divTypes>`
  background: #dedede;
  bottom: ${grid / 2}px;
  border: 2px solid #6e6c69;
  border-radius: 50%;
  box-sizing: border-box;
  font-size: 10px;
  position: absolute;
  right: 3px;
  top: 3px;
  transform: rotate(40deg);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.a<divTypes>`
  border-radius: ${borderRadius}px;
  border: 2px solid transparent;
  border-color: #6e6c69;
  background-color: #f4f4f4;
  box-shadow: ${({ isDragging }) =>
    isDragging ? `2px 2px 1px #6a6a6a` : 'none'};
  box-sizing: border-box;
  padding: ${grid}px;
  margin-bottom: ${grid}px;
  user-select: none;
  /* anchor overrides */
  color: #6a6a6a;
  &:hover,
  &:active {
    color: #000000;
    text-decoration: none;
  }
  &:focus {
    outline: none;
    border-color: #000000;
    box-shadow: none;
  }
  /* flexbox */
  display: flex;
`;

const Content = styled.div<divTypes>`
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

const BlockQuote = styled.div<divTypes>`
  &::before {
    content: open-quote;
  }
  &::after {
    content: close-quote;
  }
`;

function QuoteItem(props: Props) {
  const {
    quote,
    isDragging,
    isGroupedOver,
    provided,
    isClone,
    index,
  } = props;

  return (
    <Container
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      isClone={isClone}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      data-is-dragging={isDragging}
      data-testid={quote.id}
      data-index={index}
      aria-label={`quote ${quote.content}`}
    >
      {isClone ? <CloneBadge>Clone</CloneBadge> : null}
      <Content>
        <BlockQuote>{quote.content}</BlockQuote>
      </Content>
    </Container>
  );
}

export default memo(QuoteItem);
