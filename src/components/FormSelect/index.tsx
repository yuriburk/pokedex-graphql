import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';

import getStateValue from 'utils/getStateValue';
import { Container, Label, customStyles } from './styles';

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
      getValue: (ref: any) => getStateValue(ref, rest.isMulti),
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      {label && <Label htmlFor={name}>{label}</Label>}
      <ReactSelect
        inputId={name}
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
