import styled from '@emotion/styled';
import { grid } from '../testConst';
import { divTypes } from '../../../typings/typings';


export default styled.div<divTypes>`
  padding: ${grid}px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  color: #6a6a6a;
  user-select: none;
  position: relative;
  &:focus {
    outline-offset: 2px;
  }
`;
