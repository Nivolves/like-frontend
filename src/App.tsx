import React from 'react';
import StoreProvider from './store/context';

import Fingerprint from './components/Fingerprint/Fingerptrint';
import Header from './components/Header/Header';

type Props = {
  children?: React.ReactNode;
};

const App: React.FC<Props> = ({ children }): JSX.Element => {
  return (
    <StoreProvider>
      <Header />
      <Fingerprint />
      {children}
    </StoreProvider>
  );
};

export default App;
