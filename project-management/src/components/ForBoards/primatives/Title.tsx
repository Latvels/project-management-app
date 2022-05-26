import styled from '@emotion/styled';
import { grid } from '../testConst';
/* eslint-disable @typescript-eslint/no-explicit-any */
export default styled.h4`
  padding: ${grid}px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  &:focus {
    outline-offset: 2px;
  }
`;
