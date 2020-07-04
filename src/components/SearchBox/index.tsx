import React, { useCallback } from 'react';
import debounce from 'lodash.debounce';

import { Container } from './styles';

interface ISearchProps {
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  debounceTime?: number;
  placeholder?: string;
}

const SearchBox: React.FC<ISearchProps> = ({
  onChange,
  debounceTime = 200,
  placeholder,
  ...rest
}) => {
  const debouncedCall = debounce((event) => onChange(event), debounceTime);

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.persist();
      debouncedCall(event);
    },
    [debouncedCall],
  );

  return (
    <Container>
      <input placeholder={placeholder} onChange={handleOnChange} {...rest} />
    </Container>
  );
};

export default SearchBox;
