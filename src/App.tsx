import React from 'react';
import { ListProvider } from './contexts/ListContext';
import { List } from './components/List';

const App: React.FC = () => (
  <ListProvider>
    <List />
  </ListProvider>
)

export default App;
