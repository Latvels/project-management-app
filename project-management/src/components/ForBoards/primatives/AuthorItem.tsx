import styled from '@emotion/styled';
import type { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { grid } from '../testConst';
import type { Column } from '../testTypes';
import { divTypes } from '../../../typings/typings';

const DraggableContainer = styled.div<divTypes>``;
type Props = {
  author: Column;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
};

export default function AuthorItem(props: Props) {
  const author = props.author;
  const provided = props.provided;
  const snapshot = props.snapshot;

  return (
    <DraggableContainer
      className="avatar"
      ref={(ref) => provided.innerRef(ref)}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      isDragging={snapshot.isDragging}
    ></DraggableContainer>
  );
}
