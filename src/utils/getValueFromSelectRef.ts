import { OptionTypeBase } from 'react-select';

export const getValueFromSelectRef = (ref: any, isMulti?: boolean): any => {
  if (isMulti) {
    if (!ref.state.value) {
      return [];
    }
    return ref.state.value.map((option: OptionTypeBase) => option.value);
  }
  if (!ref.state.value) {
    return '';
  }

  return ref.state.value.value;
};
