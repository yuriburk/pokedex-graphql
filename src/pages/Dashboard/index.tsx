import React, { useState } from 'react';

import List from 'components/PokemonsList';

const Dashboard: React.FC = () => {
  const [count, setCount] = useState(10);

  return (
    <div>
      <h1>Dashboard</h1>
      <List count={count} />
      <button type="button" onClick={() => setCount((state) => state + 10)}>
        Ler mais
      </button>
    </div>
  );
};

export default Dashboard;
