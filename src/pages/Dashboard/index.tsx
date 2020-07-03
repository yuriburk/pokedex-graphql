import React, { useState } from 'react';

import List from 'components/PokemonsList';
import { Button } from './styles';

const Dashboard: React.FC = () => {
  const [count, setCount] = useState(10);

  return (
    <div>
      <h1>Dashboard</h1>
      <List count={count} />
      <Button type="button" onClick={() => setCount((state) => state + 10)}>
        Ler mais
      </Button>
    </div>
  );
};

export default Dashboard;
