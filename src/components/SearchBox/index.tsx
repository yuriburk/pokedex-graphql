import React, { useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';

import { Container } from './styles';

interface ISearchProps {
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  debounceTime?: number;
  placeholder?: string;
  containerStyle?: Record<string, unknown>;
}

const SearchBox: React.FC<ISearchProps> = ({
  onChange,
  placeholder,
  containerStyle = {},
  ...rest
}) => {
  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.persist();
      onChange(event);
    },
    [onChange],
  );

  return (
    <Container style={containerStyle}>
      <input placeholder={placeholder} onChange={handleOnChange} {...rest} />
      <FiSearch />
    </Container>
  );
};

export default SearchBox;
