import { useCallback } from 'react';

export const useVoidCallback = (fn: VoidFunction): VoidFunction =>
  useCallback<VoidFunction>(() => fn(), [fn]);
