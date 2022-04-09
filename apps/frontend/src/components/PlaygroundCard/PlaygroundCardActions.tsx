import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import React from 'react';

export interface PlaygroundCardActionsProps {
  loading: boolean;
  instanceUrl: string | undefined;
  onStart: VoidFunction;
  onFinish: VoidFunction;
}

const PlaygroundCardActions: React.FC<PlaygroundCardActionsProps> = (props) => {
  const {loading, instanceUrl, onStart, onFinish} = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        {instanceUrl ? (
          <Button
            fullWidth
            disabled={loading}
            variant="outlined"
            component="a"
            href={instanceUrl}
            target="_blank"
            endIcon={<ArrowForwardIcon />}
          >
            Start
          </Button>
        ) : (
          <Button
            fullWidth
            disabled={loading}
            variant="outlined"
            onClick={onStart}
            endIcon={<ArrowForwardIcon />}
          >
            Start
          </Button>
        )}
      </Grid>
      <Grid item xs={6}>
        {instanceUrl && (
          <Button fullWidth variant="contained" onClick={onFinish}>
            Finish
          </Button>
        )}
      </Grid>
    </Grid>
  )
};

export default React.memo(PlaygroundCardActions);
