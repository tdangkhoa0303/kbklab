import { ReactNode } from 'react';

export interface ConfirmationModalState {
  title: ReactNode;
  content: ReactNode;
  cancelText: string;
  confirmText: string;
  onConfirm: VoidFunction;
}
