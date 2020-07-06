import React from 'react';

import { SkeletonThemeContainer, SkeletonItem } from '../styles';
import { PokemonSkeleton } from '../Pokemons';

export const HomeSkeleton: React.FC = () => {
  return (
    <SkeletonThemeContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}
      >
        <SkeletonItem width={190} height={40} />
        <SkeletonItem width={190} height={40} />
      </div>
      <PokemonSkeleton />
    </SkeletonThemeContainer>
  );
};
