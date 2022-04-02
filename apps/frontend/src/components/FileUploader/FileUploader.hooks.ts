import {ChangeEvent, ChangeEventHandler, useCallback, useMemo} from 'react';
import {FileInputChangeHandler} from './FileUploader.types';

export const useOnFileChange = (
  setFiles: (files: FileList | null) => void,
  onChange?: FileInputChangeHandler
): ChangeEventHandler =>
  useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target || !event.target.files) {
        return;
      }

      const files = event.target.files;
      setFiles(files);
      onChange && onChange(files, event);
    },
    [onChange, setFiles]
  );

export const useUploadingFileNames = (files: FileList | null): string =>
  useMemo(() => {
    if (!files) {
      return '';
    }

    return Array.from({ length: files.length })
      .map((_, index) => files[index].name)
      .join(', ');
  }, [files]);
