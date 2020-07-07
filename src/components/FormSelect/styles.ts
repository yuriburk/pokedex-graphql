import { CSSProperties } from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  margin-bottom: 12px;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 12px;
`;

export const customStyles = {
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
      borderColor: '#78c850',
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
  singleValue: (base: CSSProperties): Record<string, unknown> => ({
    ...base,
    color: '#fff',
  }),
};
