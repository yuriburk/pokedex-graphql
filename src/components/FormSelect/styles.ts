import { CSSProperties } from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 8px;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 2px;
`;

export const customStyles = (
  controlStyles?: CSSProperties,
): Record<string, unknown> => ({
  container: (base: CSSProperties): CSSProperties => ({
    ...base,
    flex: 1,
  }),
  control: (base: CSSProperties): Record<string, unknown> => ({
    ...base,
    backgroundColor: '#232129',
    borderColor: '#232129',
    padding: '6px',
    boxShadow: 'none',
    borderRadius: '10px',
    '&:hover': {
      borderColor: '#ff9000',
    },
    ...controlStyles,
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
  singleValue: (base: CSSProperties): Record<string, unknown> => ({
    ...base,
    color: '#fff',
  }),
});
