import styled, { css } from 'styled-components';
import { IPokemonTypes } from 'interfaces';

export const Container = styled.div``;

export const List = styled.ul`
  display: flex;
  justify-content: flex-start;
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
    margin: 4px;
    background-color: ${props.theme.colors.primaryWhite};

    ${props.theme.breakpoints.lg} {
      flex: 0 49%;
      margin: 2px;
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

interface ISpecialInfoContainerProps {
  pokemonType: IPokemonTypes;
}

const typesColors = {
  Normal: css`
    background: #a8a878;
  `,
  Fire: css`
    background: #f08030;
  `,
  Fighting: css`
    background: #c03028;
  `,
  Water: css`
    background: #6890f0;
  `,
  Flying: css`
    background: #a890f0;
  `,
  Grass: css`
    background: #78c850;
  `,
  Poison: css`
    background: #a040a0;
  `,
  Electric: css`
    background: #f8d030;
  `,
  Ground: css`
    background: #e0c068;
  `,
  Psychic: css`
    background: #f85888;
  `,
  Rock: css`
    background: #b8a038;
  `,
  Ice: css`
    background: #98d8d8;
  `,
  Bug: css`
    background: #a8b820;
  `,
  Dragon: css`
    background: #7038f8;
  `,
  Ghost: css`
    background: #705898;
  `,
  Dark: css`
    background: #705848;
  `,
  Steel: css`
    background: #b8b8d0;
  `,
  Fairy: css`
    background: #ee99ac;
  `,
};

export const SpecialInfoContainer = styled.div<ISpecialInfoContainerProps>`
  padding: 4px 8px;
  margin: 4px 4px 0 0;
  border-radius: 12px;
  ${(props) => typesColors[props.pokemonType]};
`;

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
