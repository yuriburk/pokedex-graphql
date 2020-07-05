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
    justify-content: space-between;

    padding: 24px;
    border-radius: 8px;
    background-color: ${props.theme.colors.secundaryDark};
  `,
);

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LineContainer = styled.div`
  display: flex;
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
