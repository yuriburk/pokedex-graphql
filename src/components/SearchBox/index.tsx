import React, { useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';
import debounce from 'lodash.debounce';

import { Container } from './styles';

interface ISearchProps {
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  debounceTime?: number;
  placeholder?: string;
  containerStyle?: Record<string, unknown>;
}

const SearchBox: React.FC<ISearchProps> = ({
  onChange,
  debounceTime = 200,
  placeholder,
  containerStyle = {},
  ...rest
}) => {
  const debouncedCall = debounce((func) => func(), debounceTime);

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.persist();
      debouncedCall(onChange(event));
    },
    [debouncedCall, onChange],
  );

  return (
    <Container style={containerStyle}>
      <input placeholder={placeholder} onChange={handleOnChange} {...rest} />
      <FiSearch />
    </Container>
  );
};

export default SearchBox;
