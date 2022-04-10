import {Tooltip} from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import React, {useCallback} from 'react';
import {ColorDot} from '../ColorDot';
import {usePlaygroundStatus} from './PlaygroundCard.hooks';
import PlaygroundCardActions, {PlaygroundCardActionsProps} from './PlaygroundCardActions';

type PickedProps = 'loading' | 'instanceUrl'

export interface PlaygroundCardProps extends Pick<PlaygroundCardActionsProps, PickedProps> {
  id: string;
  title: string;
  onStart: (id: string) => void;
  onFinish: (id: string) => void;
}

const PlaygroundCard: React.FC<PlaygroundCardProps> = (props) => {
  const {id, title, instanceUrl, onStart, onFinish, loading} = props;
  const {color, status} = usePlaygroundStatus(instanceUrl);

  const startPlayground = useCallback(() => {
    onStart(id);
  }, [onStart, id]);

  const finishPlayground = useCallback(() => {
    onFinish(id);
  }, [onFinish, id]);

  return (
    <Card sx={{
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.06)',
      padding: 2,
      borderRadius: 2,
      cursor: 'pointer',
      margin: theme => theme.spacing(1)
    }}>
      <Tooltip title={title}>
        <Typography noWrap variant="h5" fontWeight={500} mb={2}>
          {title}
        </Typography>
      </Tooltip>
      <Box display="flex" alignItems="center" mb={2}>
        <ColorDot
          color={color}
          animated={!!instanceUrl}
        />
        <Typography ml={1}>
          {status}
        </Typography>
      </Box>
      <PlaygroundCardActions
        loading={loading}
        onStart={startPlayground}
        onFinish={finishPlayground}
        instanceUrl={instanceUrl}
      />
    </Card>
  )
};

export default React.memo(PlaygroundCard);
