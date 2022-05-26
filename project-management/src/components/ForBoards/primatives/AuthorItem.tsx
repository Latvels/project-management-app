import styled from '@emotion/styled';
import type { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { grid } from '../testConst';
import type { Author } from '../testTypes';
import '../allCss.css'

interface StyledDivProps {
    isDragging: boolean;
  }
const DraggableContainer = styled.div<StyledDivProps>``;
type Props = {
  author: Author;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
};

export default function AuthorItem(props: Props) {
  const author = props.author;
  const provided = props.provided;
  const snapshot = props.snapshot;

  return (
    <DraggableContainer className='avatar'
      ref={(ref) => provided.innerRef(ref)}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      isDragging={snapshot.isDragging}
    ></DraggableContainer>
  );
}
