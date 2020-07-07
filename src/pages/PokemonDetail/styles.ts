import styled, { css } from 'styled-components';
import { Form as UnForm } from '@unform/web';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Form = styled(UnForm)(
  (props) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    ${props.theme.breakpoints.xl} {
      flex-direction: column;
    }

    padding: 24px;
    border-radius: 8px;
    background-color: ${props.theme.colors.secundaryDark};
  `,
);

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h2 {
    word-break: break-word;
  }
`;

export const Image = styled.img`
  border-radius: 50%;
  width: 182px;
  height: 182px;
  margin-bottom: 14px;
`;

export const TextInfo = styled.p`
  font-weight: bold;
  color: ${(props) => props.theme.colors.secundaryWhite};
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 14px;
`;

export const Fieldset = styled.fieldset`
  border: 0;
`;

export const LineContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 8px 0;

  div {
    margin: 0;
  }

  div + div {
    margin-left: 8px;
  }
`;

export const SpecialContainer = styled.div`
  display: flex;
  flex: 1;
`;

export const EvolutionContainer = styled.div`
  margin: 12px 0;
`;
