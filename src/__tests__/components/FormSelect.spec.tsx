import React from 'react';
import { render } from '@testing-library/react';

import FormSelect from '../../components/FormSelect';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

const types = [
  { label: 'Normal', value: 'Normal' },
  { label: 'Fire', value: 'Fire' },
];

describe('FormSelect Component', () => {
  it('should be able to render a single FormSelect', async () => {
    const placeholder = 'Select type';
    const label = 'Type';

    const { getByText, getByLabelText } = render(
      <FormSelect
        placeholder={placeholder}
        label={label}
        name="types"
        options={types}
        isMulti
      />,
    );

    expect(getByText(placeholder)).toBeInTheDocument();
    expect(getByLabelText(label)).toBeInTheDocument();
  });
});
