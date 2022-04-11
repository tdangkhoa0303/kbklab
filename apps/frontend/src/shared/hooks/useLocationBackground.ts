import {useMemo} from 'react';
import {Location, useLocation} from 'react-router-dom';
import {LocationStateWithBackground} from '../constants';

export const useLocationBackground = (): Location | null => {
  const location = useLocation();
  const locationState = (location.state || {}) as LocationStateWithBackground;
  return useMemo(() => locationState.background || null, [locationState.background])
}
