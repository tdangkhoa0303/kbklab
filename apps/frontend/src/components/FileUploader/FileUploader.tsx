import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box, {BoxProps} from '@mui/material/Box';
import {alpha} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, {AllHTMLAttributes, PropsWithChildren, Ref, useMemo, useState,} from 'react';
import {v4 as uuid} from 'uuid';
import {useOnFileChange, useUploadingFileNames} from './FileUploader.hooks';
import {FileInputChangeHandler} from './FileUploader.types';

export interface FileUploaderProps
  extends Omit<AllHTMLAttributes<HTMLInputElement>, 'onChange'> {
  ref?: Ref<HTMLInputElement>;
  LabelProps?: Partial<BoxProps<'label'>>;
  acceptText?: string;
  onChange: FileInputChangeHandler;
}

const FileUploader: React.FC<PropsWithChildren<FileUploaderProps>> = (
  props
) => {
  const { acceptText, id, LabelProps, ref, onChange, children, ...restProps } =
    props;
  const inputId = useMemo(() => id || uuid(), [id]);
  const [files, setFiles] = useState<FileList | null>(null);

  const onFileChange = useOnFileChange(setFiles, onChange);
  const uploadingFileNames = useUploadingFileNames(files);

  return (
    <Box display="flex" position="relative" flexDirection="column">
      <Box
        component="label"
        htmlFor={inputId}
        sx={{
          padding: (theme) => theme.spacing(3),
          borderRadius: (theme) => theme.spacing(1),
          border: (theme) =>
            `2px dashed ${alpha(theme.palette.primary.main, 0.5)}`,
          color: '#8F8F8F',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.05),
        }}
        {...LabelProps}
      >
        <Box display="flex">
          <CloudUploadIcon sx={{ fontSize: (theme) => theme.spacing(4) }} />
        </Box>
        <Box>
          <Box
            component="span"
            sx={{
              fontWeight: 600,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Click to upload
          </Box>
          &nbsp;or drag and drop
        </Box>
        {children}
        {uploadingFileNames && (
          <Typography
            noWrap
            textAlign="center"
            sx={{ width: '100%', color: '#8F8F8F' }}
          >
            {uploadingFileNames}
          </Typography>
        )}
      </Box>
      <Typography
        mt={1}
        sx={{ fontStyle: 'italic', color: '#8F8F8F' }}
        variant="body2"
      >
        {acceptText}
      </Typography>
      <Box
        ref={ref}
        type="file"
        id={inputId}
        component="input"
        onChange={onFileChange}
        sx={{
          top: 0,
          left: 0,
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0,
        }}
        {...restProps}
      />
    </Box>
  );
};

const MemoizedFileUploader = React.memo(FileUploader);
export default React.forwardRef<HTMLInputElement, FileUploaderProps>(
  (props, ref) => <MemoizedFileUploader ref={ref} {...props} />
);
