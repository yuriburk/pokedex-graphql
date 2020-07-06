import React from 'react';

import { render } from '@testing-library/react';
import Button from 'components/Button';

describe('Button Component', () => {
  it('should be able to render a button', () => {
    const { getByText } = render(
      <Button>
        <p>Botão</p>
      </Button>,
    );

    expect(getByText('Botão')).toBeInTheDocument();
  });

  it('should be able to render a button loading', () => {
    const { getByText } = render(<Button loading={true} />);

    expect(getByText('Loading...')).toBeInTheDocument();
  });
});
