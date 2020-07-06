import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import Header from 'components/Header';
import { theme } from 'styles/theme';

describe('Header Component', () => {
  it('should be able to render the header', async () => {
    const title = 'Title';

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Header title="Title" />
      </ThemeProvider>,
    );

    expect(getByText(title)).toBeInTheDocument();
  });
});
