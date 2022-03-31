import { CSSProperties } from 'react';

export const cssLayout: Record<string, CSSProperties> = {
  flex: {
    display: 'flex',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  centerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalCenter: {
    justifyContent: 'center',
  },
  verticalCenter: {
    alignItems: 'center',
  },
};
