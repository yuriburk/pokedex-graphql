import React, { useMemo } from 'react';

import { ListItem, List } from '../../PokemonsList/styles';
import { SkeletonThemeContainer, SkeletonItem } from '../styles';

export const PokemonSkeleton: React.FC = () => {
  const generateSkeletons = useMemo(
    () =>
      Array.from(Array(18).keys()).map((key) => (
        <ListItem key={key} data-testid="list-item">
          <SkeletonItem width={140} height={124} />
          <SkeletonItem height={15} width={80} />
          <SkeletonItem
            height={25}
            width={50}
            style={{ borderRadius: '14px', marginBottom: '24px' }}
          />
        </ListItem>
      )),
    [],
  );

  return (
    <SkeletonThemeContainer color="#202020" highlightColor="#444">
      <List>{generateSkeletons}</List>
    </SkeletonThemeContainer>
  );
};
