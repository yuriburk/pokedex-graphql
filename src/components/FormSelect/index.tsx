import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';

import { Container, Label, customStyles } from './styles';
import { getValueFromSelectRef } from 'utils/getValueFromSelectRef';

interface IProps extends SelectProps<OptionTypeBase> {
  name: string;
  placeholder?: string;
  label?: string;
}

const FormSelect: React.FC<IProps> = ({
  name,
  placeholder,
  label,
  ...rest
}) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => getValueFromSelectRef(ref, rest.isMulti),
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <ReactSelect
        placeholder={placeholder}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        styles={customStyles}
        {...rest}
      />
    </Container>
  );
};
export default FormSelect;
