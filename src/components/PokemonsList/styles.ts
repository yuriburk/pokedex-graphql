import styled from 'styled-components';

export const Container = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  list-style: none;
`;

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 15px;
  border-radius: 5px;
  margin: 5px;

  background-color: white;
`;

export const Image = styled.img`
  width: 125px;
  height: 125px;
`;

export const Title = styled.h2`
  display: flex;
  justify-content: flex-end;
  flex: 1;

  color: black;

  margin-top: 15px;
`;
