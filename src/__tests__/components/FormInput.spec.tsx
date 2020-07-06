import React from 'react';

import { render, fireEvent, waitFor } from '@testing-library/react';
import FormInput from '../../components/FormInput';

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

describe('FormInput Component', () => {
  it('should be able to render an form input', () => {
    const { getByPlaceholderText } = render(
      <FormInput label="E-mail" name="email" placeholder="E-mail" />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should be able to render highlight on form input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <FormInput label="E-mail" name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const inputContainerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(inputContainerElement).toHaveStyle('border-color: #ff9000;');
      expect(inputContainerElement).toHaveStyle('color: #ff9000;');
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(inputContainerElement).not.toHaveStyle('border-color: #ff9000;');
      expect(inputContainerElement).not.toHaveStyle('color: #ff9000;');
    });
  });

  it('should be able to keep input border highlight when form input is filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <FormInput label="E-mail" name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const inputContainerElement = getByTestId('input-container');

    fireEvent.change(inputElement, {
      target: { value: 'johndoe@example.com.br' },
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(inputContainerElement).not.toHaveStyle('border-color: #ff9000;');
    });
  });
});
