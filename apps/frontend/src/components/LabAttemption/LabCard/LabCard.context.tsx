import get from 'lodash/get';
import React, {useContext, useMemo} from 'react';
import {ClassLab} from 'shared/models';

export type LabCardContextValue = ClassLab;

const LabCardContext = React.createContext<LabCardContextValue | null>(null);

export const LabCardProvider = LabCardContext.Provider;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useLabField = (path: string): any => {
  const lab = useContext(LabCardContext);
  return useMemo(() => (lab ? get(lab, path) : null), [path, lab]);
};
