import React from 'react';
import GridLoader from 'react-spinners/GridLoader';

import { LoadingContainer } from './styles';

const Loading: React.FC = () => (
  <LoadingContainer>
    <GridLoader color="white" />
  </LoadingContainer>
);

export default Loading;
