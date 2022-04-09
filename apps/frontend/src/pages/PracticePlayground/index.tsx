import Box from '@mui/material/Box';
import {PageTitle} from 'components';
import React from 'react';
import {useMounting} from 'shared/hooks';
import PlaygroundGrid from './PlaygroundGrid';
import {useFetchPlaygrounds} from './PlaygroundGrid.hooks';

const PracticePlayground: React.FC = () => {
  const fetchPlaygrounds = useFetchPlaygrounds();

  useMounting(() => {
    fetchPlaygrounds()
  })

  return (
    <Box display="flex" flexGrow={2} flexDirection="column">
      <PageTitle title="Practice Playground" />
      <PlaygroundGrid />
    </Box>
  )
};

export default React.memo(PracticePlayground);
