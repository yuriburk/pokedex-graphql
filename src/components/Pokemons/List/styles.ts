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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 0 32%;

    cursor: pointer;
    min-height: 285px;
    padding: 14px 30px;
    border-radius: 4px;
    margin: 1% 0;
    background-color: ${props.theme.colors.primaryWhite};

    ${props.theme.breakpoints.lg} {
      flex: 0 49%;
    }

    ${props.theme.breakpoints.sm} {
      flex: 0 100%;
    }

    transition: transform ease 0.5s;

    &:hover {
      transform: translateY(-8px);
    }
  `,
);

export const PokemonInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: black;
`;

export const Title = styled.h2`
  margin-top: 8px;
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
  justify-content: center;
  flex-wrap: wrap;

  margin-top: 14px;
`;

export const SpecialInfoContainer = styled.div(
  (props) => css`
    padding: 4px 8px;
    margin: 4px 4px 0 0;
    border-radius: 12px;
    background-color: ${props.theme.colors.secundaryDark};
  `,
);

export const SpecialInfo = styled.p(
  (props) => css`
    color: ${props.theme.colors.primaryWhite};
  `,
);

export const Image = styled.img`
  width: 114px;
  height: 114px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
