import React from 'react';

import { Container } from './styles';

interface IHeaderProps {
  title: string;
}

const Header: React.FC<IHeaderProps> = ({ title, children }) => (
  <Container>
    <h1>{title}</h1>
    {children}
  </Container>
);

export default Header;
