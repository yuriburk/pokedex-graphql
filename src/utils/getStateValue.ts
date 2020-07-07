import { OptionTypeBase } from 'react-select';

const getStateValue = (ref: any, isMulti?: boolean): any => {
  if (isMulti) {
    if (!ref.state.value) {
      return [];
    }

    return ref.state.value.map((option: OptionTypeBase) => option.value);
  }
  if (!ref.state.value || !ref.state.value.value) {
    return '';
  }

  return ref.state.value.value;
};

export default getStateValue;
