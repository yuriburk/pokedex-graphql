import React from 'react';

import { render } from '@testing-library/react';
import NotFound from 'pages/NotFound';

describe('NotFound Page', () => {
  it('should be able to render', () => {
    const { getByText } = render(<NotFound />);

    expect(getByText('404')).toBeInTheDocument();
    expect(getByText('Not Found')).toBeInTheDocument();
  });
});
