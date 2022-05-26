import { Component } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, Droppable, DropResult, DraggableLocation, DroppableProvided } from 'react-beautiful-dnd';

import { divTypes } from '../../typings/typings';
import Column from './Column';
import reorder, { reorderQuoteMap } from './reorder';
import { QuoteMap, Quote } from './testTypes';


const ParentContainer = styled.div<divTypes>`
  height: ${({ height }) => height};
  overflow-x: hidden;
  overflow-y: auto;
`;

const Container = styled.div`
  min-height: 90vh;
  min-width: 100vw;
  display: inline-flex;
`;

type Props = {
  initial: QuoteMap;
  withScrollableColumns?: boolean;
  isCombineEnabled?: boolean;
  containerHeight?: string;
};

type State = {
  columns: QuoteMap;
  ordered: string[];
};

export default class Board extends Component<Props, State> {
  
  static defaultProps = {
    isCombineEnabled: false,
  };

  state: State = {
    columns: this.props.initial,
    ordered: Object.keys(this.props.initial),
  };

  boardRef?: HTMLElement;

  onDragEnd = (result: DropResult) => {
    if (result.combine) {
      if (result.type === 'COLUMN') {
        const shallow: string[] = [...this.state.ordered];
        shallow.splice(result.source.index, 1);
        this.setState({ ordered: shallow });
        return;
      }

      const column: Quote[] = this.state.columns[result.source.droppableId];
      const withQuoteRemoved: Quote[] = [...column];
      withQuoteRemoved.splice(result.source.index, 1);
      const columns: QuoteMap = {
        ...this.state.columns,
        [result.source.droppableId]: withQuoteRemoved,
      };
      this.setState({ columns });
      return;
    }

    if (!result.destination) {
      return;
    }

    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;

    // did not move anywhere - can bail early
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // reordering column
    if (result.type === 'COLUMN') {
      const ordered: string[] = reorder(this.state.ordered, source.index, destination.index);

      this.setState({
        ordered,
      });

      return;
    }

    const data = reorderQuoteMap({
      quoteMap: this.state.columns,
      source,
      destination,
    });

    this.setState({
      columns: data.quoteMap,
    });
  };

  render() {
    const columns: QuoteMap = this.state.columns;
    const ordered: string[] = this.state.ordered;
    const { containerHeight, isCombineEnabled, withScrollableColumns } = this.props;

    const board = (
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={Boolean(containerHeight)}
        isCombineEnabled={isCombineEnabled}
      >
        {(provided: DroppableProvided) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {ordered.map((key: string, index: number) => (
              <Column
                key={key}
                index={index}
                title={key}
                quotes={columns[key]}
                isScrollable={withScrollableColumns}
                isCombineEnabled={isCombineEnabled}
              />
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    );

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {containerHeight ? (
          <ParentContainer height={containerHeight}>{board}</ParentContainer>
        ) : (
          board
        )}
      </DragDropContext>
    );
  }
}
