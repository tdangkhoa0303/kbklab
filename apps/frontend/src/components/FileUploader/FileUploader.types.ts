import { ChangeEvent } from 'react';

export type FileInputChangeHandler = (
  files: FileList | null,
  event: ChangeEvent<HTMLInputElement>
) => void;
