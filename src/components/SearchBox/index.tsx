import React from 'react';
import debounce from 'lodash.debounce';

import { Container } from './styles';

interface ISearchProps {
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  debounceTime?: number;
}

const SearchBox: React.FC<ISearchProps> = ({
  onChange,
  debounceTime = 200,
}) => {
  const debouncedCall = debounce((event) => onChange(event), debounceTime);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    debouncedCall(event);
  };

  return (
    <Container>
      <input onChange={handleOnChange} />
    </Container>
  );
};

export default SearchBox;
