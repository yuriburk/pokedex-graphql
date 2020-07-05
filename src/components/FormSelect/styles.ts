import { CSSProperties } from 'react';

export const customStyles = {
  container: (base: CSSProperties): CSSProperties => ({
    ...base,
    flex: 1,
  }),
  control: (base: CSSProperties): Record<string, unknown> => ({
    ...base,
    backgroundColor: '#232129',
    borderColor: '#232129',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#ff9000',
    },
  }),
  multiValue: (base: CSSProperties): CSSProperties => ({
    ...base,
    backgroundColor: '#1d1c24',
  }),
  multiValueLabel: (base: CSSProperties): CSSProperties => ({
    ...base,
    color: '#fff',
  }),
  menuList: (base: CSSProperties): CSSProperties => ({
    ...base,
    color: '#fff',
    backgroundColor: '#232129',
  }),
  option: (base: CSSProperties): Record<string, unknown> => ({
    ...base,
    backgroundColor: '#232129',
    '&:hover': {
      backgroundColor: '#1d1c24',
    },
  }),
};
