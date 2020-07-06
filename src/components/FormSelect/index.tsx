import React, { useRef, useEffect, CSSProperties } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';

import { Container, Label, customStyles } from './styles';

interface IProps extends SelectProps<OptionTypeBase> {
  name: string;
  label?: string;
  controlStyles?: CSSProperties;
}

const FormSelect: React.FC<IProps> = ({
  name,
  label,
  controlStyles,
  ...rest
}) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        styles={customStyles(controlStyles)}
        {...rest}
      />
    </Container>
  );
};
export default FormSelect;
