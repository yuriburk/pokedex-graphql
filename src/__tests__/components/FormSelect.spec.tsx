import React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import FormSelect from '../../components/FormSelect';
import { getValueFromSelectRef } from 'utils/getValueFromSelectRef';

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
  it('should be able to render an single FormSelect', async () => {
    const placeholder = 'Select type';
    const label = 'Type';

    const { getByText } = render(
      <FormSelect
        placeholder={placeholder}
        label={label}
        name="types"
        options={types}
      />,
    );

    expect(getByText(placeholder)).toBeInTheDocument();
    expect(getByText(label)).toBeInTheDocument();
  });
});
