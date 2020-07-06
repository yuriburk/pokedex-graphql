import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { HomeSkeleton } from 'components/Skeleton/Home';

const PokemonsSkeletonWrapper = () => (
  <ThemeProvider theme={theme}>
    <HomeSkeleton />
  </ThemeProvider>
);

describe('PokemonsSkeleton Component', () => {
  afterEach(cleanup);

  it('should be able to take a snapshot', () => {
    const { asFragment } = render(<PokemonsSkeletonWrapper />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should be able to render 18 list items', async () => {
    const { getAllByTestId } = render(<PokemonsSkeletonWrapper />);

    const items = getAllByTestId('list-item');

    expect(items).toHaveLength(18);
  });
});
