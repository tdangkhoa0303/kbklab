import React, {PropsWithChildren} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import {LocationStateWithBackground} from 'shared/constants';
import ModalOutlet from './ModalOutlet';

const ModalRoutes: React.FC<PropsWithChildren<{}>> = ({children}) => {
  const location = useLocation();
  const locationState = (location.state || {}) as LocationStateWithBackground;

  if(!locationState.background) {
    return null;
  }

  return (
    <Routes>
      <Route element={<ModalOutlet />}>
        {children}
      </Route>
    </Routes>
  )
}

export default React.memo(ModalRoutes);
