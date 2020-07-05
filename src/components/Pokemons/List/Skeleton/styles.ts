import styled from 'styled-components';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export const SkeletonThemeContainer = styled(SkeletonTheme).attrs((props) => ({
  color: props.theme.colors.secundaryDark,
  highlightColor: props.theme.colors.primaryDark,
}))``;

export const SkeletonItem = styled(Skeleton)`
  border-radius: '4px';
`;
