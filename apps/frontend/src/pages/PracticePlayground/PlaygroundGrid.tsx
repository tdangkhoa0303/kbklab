import Grid from '@mui/material/Grid';
import {PlaygroundCard} from 'components';
import React from 'react';
import {
  useAllPlaygrounds,
  useFinishPlayground,
  useIsStartingPlayground,
  useStartPlayground
} from './PlaygroundGrid.hooks';

const PlaygroundGrid: React.FC = () => {
  const allPlaygrounds = useAllPlaygrounds();
  const isStartingPlayground = useIsStartingPlayground();

  const startPlayground = useStartPlayground();
  const finishPlayground = useFinishPlayground();

  return (
    <Grid container overflow="auto">
      {allPlaygrounds.map(({id, title, url}) => (
        <Grid item xs={6} lg={4} key={id}>
          <PlaygroundCard
            id={id}
            title={title}
            instanceUrl={url}
            onStart={startPlayground}
            onFinish={finishPlayground}
            loading={isStartingPlayground}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default React.memo(PlaygroundGrid);
