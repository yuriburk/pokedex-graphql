import React, { ButtonHTMLAttributes } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? <SyncLoader size={10} /> : children}
  </Container>
);

export default Button;
