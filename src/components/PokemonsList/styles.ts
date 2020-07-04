import styled, { css } from 'styled-components';

export const Container = styled.div``;

export const List = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  list-style: none;
`;

export const ListItem = styled.li(
  (props) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 0 32%;

    ${props.theme.breakpoints.xl} {
      flex: 0 49%;
    }

    ${props.theme.breakpoints.md} {
      flex: 0 100%;
    }

    cursor: pointer;
    min-height: 185px;
    padding: 15px 30px;
    border-radius: 5px;
    margin-bottom: 2%;
    background-color: ${props.theme.colors.primaryWhite};
  `,
);

export const PokemonInfo = styled.div`
  display: flex;
  flex-direction: column;

  color: black;
`;

export const Title = styled.h2`
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const TextInfo = styled.p`
  color: gray;
`;

export const SpecialContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin-top: 15px;
`;

export const SpecialInfoContainer = styled.div(
  (props) => css`
    display: flex;
    align-items: center;

    padding: 5px;
    margin: 5px 5px 0 0;
    border-radius: 5px;
    background-color: ${props.theme.colors.secundaryDark};
  `,
);

export const SpecialInfo = styled.p(
  (props) => css`
    color: ${props.theme.colors.primaryWhite};
  `,
);

export const Image = styled.img`
  width: 115px;
  height: 115px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
