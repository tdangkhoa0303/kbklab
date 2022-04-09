import {blueGrey, green} from '@mui/material/colors';
import {useMemo} from 'react';
import {PlaygroundStatus} from './PlaygroundCard.types';

export interface UsePlaygroundStatusReturnedValues {
  color: string;
  status: PlaygroundStatus;
}

export const usePlaygroundStatus = (instanceUrl: string | undefined): UsePlaygroundStatusReturnedValues => (
  useMemo(() => {
    if(instanceUrl) {
      return {
        color: blueGrey[500],
        status: PlaygroundStatus.Disabled
      }
    }

    return {
      color: green[500],
      status: PlaygroundStatus.Open
    }
  }, [instanceUrl])
)
