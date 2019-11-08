import React from 'react';
import { Button, Input } from 'antd';

import { useRootData } from '../../hooks/useRootData';

import './Search.scss';

const Search: React.FC = (): JSX.Element => {
  const { setQuery, setQueryPhotos, query } = useRootData(({ setQuery, setQueryPhotos, query }) => ({
    setQuery,
    setQueryPhotos,
    query: query.get(),
  }));

  return (
    <div className="search-container">
      <div className="input-container">
        <Input
          placeholder="Search"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setQuery(e.target.value)}
        />
      </div>
      <Button type="primary" shape="circle" icon="search" onClick={() => setQueryPhotos()} />
    </div>
  );
};

export default Search;
