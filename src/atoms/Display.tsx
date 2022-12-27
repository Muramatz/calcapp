import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode,
}

const Display: React.FC<Props> = (props) => {
  const {
    children,
  } = props;
  return (
    <Wrap>{children}</Wrap>
  );
};

const Wrap = styled.div`
  text-align: right;
  font-size: 2.4rem;
  min-height: 4rem;
  line-height: 4rem;
  padding: 0px 12px;
  text-align: right;
  background-color: #888;
  border: solid 1px #888;
  color: #fff;
  vertical-align: bottom;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
`

export default Display;