import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode,
  onClick?: () => void;
  isColored: boolean;
}

const Button: React.FC<Props> = (props) => {
  const {
    children,
    isColored,
    onClick
  } = props;
  return (
    <StyledButton onClick={() => onClick ? onClick() : ''} isColored={isColored}>{children}</StyledButton>
  );
};

const StyledButton = styled.button<{isColored: boolean}>`
  position: relative;
  display: block;
  padding: 20px 10px;
  font-size: 2rem;
  width: 20%;
  overflow: hidden;
  border-width: 0;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
  background-color: ${props => (props.isColored ? '#2ecc71' : '#dcdcdc')};
  color: ${props => (props.isColored ? '#ecf0f1' : '#2ecc71')};
  transition: background-color .3s;
  &:hover {
    background-color: ${props => (props.isColored ? '#27ae60' : '#C6C6C6')};
  }
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0;
    padding-top: 0;
    border-radius: 100%;
    background-color: rgba(236, 240, 241, .3);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  &:active:before {
    width: 120%;
    padding-top: 120%;
    transition: width .2s ease-out, padding-top .2s ease-out;
  }
`

export default Button;