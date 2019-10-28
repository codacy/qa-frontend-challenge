import React, { useContext } from 'react';
import { ListContext } from '../contexts/ListContext';
import { useTriggerOnView } from '../hooks/useTriggerOnView';

export const List: React.FC = () => {
  const { commits, isLoading, loadMore, error } = useContext(ListContext)

  const ref = useTriggerOnView(loadMore);

  return (
    <div>
      <div>
        <button type="submit" onClick={loadMore}>Start Loading Commits</button>
        {error && (
          <div>{error}</div>
        )}
      </div>
      <h1>Commits</h1>
      <div>{commits.map(commit =>
        <div key={commit.hash}>{commit.hash}</div>
      )}</div>
      {<div style={{ height: '1px' }} ref={ref} />}
      {isLoading && <div>Loading...</div>}
    </div>
  )
}
