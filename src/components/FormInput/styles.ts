import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 12px;
`;

interface IInputContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const InputContainer = styled.div<IInputContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 14px;
  border: 2px solid #232129;
  color: ${(props) =>
    props.isFocused || props.isFilled ? '#ff9000' : '#666360'};
  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}

  display: flex;
  align-items: center;

  & + div {
    margin-top: 12px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;
    width: 100%;

    &::placeholder {
      color: #666360;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 50px #232129 inset;
      -webkit-text-fill-color: #f4ede8;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
