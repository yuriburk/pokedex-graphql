import styled, { css } from 'styled-components';
import { IPokemonTypes } from 'interfaces';

export const Container = styled.div``;

export const List = styled.ul`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  list-style: none;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  cursor: pointer;
  min-height: 289px;
  padding: 14px 30px;
  border-radius: 8px;
  margin: 4px;
  background-color: ${(props) => props.theme.colors.secundaryDark};

  transition: transform ease 0.5s;

  &:hover {
    transform: translateY(-6px);
  }
`;

export const PokemonInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h2`
  color: ${(props) => props.theme.colors.primaryWhite};
  margin-top: 8px;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const TextInfo = styled.p`
  color: white;
`;

export const SpecialContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  margin-bottom: 22px;
`;

interface ISpecialInfoContainerProps {
  pokemonType: IPokemonTypes;
}

export const SpecialInfoContainer = styled.div<ISpecialInfoContainerProps>`
  padding: 4px 8px;
  margin: 4px 4px 0 0;
  border-radius: 12px;
  ${(props) => props.theme.typesColors[props.pokemonType]};
`;

export const SpecialInfo = styled.p`
  color: ${(props) => props.theme.colors.primaryWhite};
`;

export const Image = styled.img`
  width: 124px;
  height: 124px;
  border-radius: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
