import Typography from '@mui/material/Typography';
import {FileInputChangeHandler, FileUploader} from 'components';
import React from 'react';
import {ALLOW_FILE_TYPES} from './ImportDataUploader.constants';

export interface ImportDataUploaderProps {
  onImportingFileChange: FileInputChangeHandler;
  sampleFileUrl: string;
}

const ImportDataUploader: React.FC<ImportDataUploaderProps> = (props) => {
  const { onImportingFileChange, sampleFileUrl } = props;

  return (
    <FileUploader
      onChange={onImportingFileChange}
      accept={ALLOW_FILE_TYPES}
      acceptText="File: CSV, Excel"
    >
      <Typography variant="body2" sx={{ zIndex: 2 }}>
        The uploading file must be followed the&nbsp;
        <Typography
          component="a"
          href={sampleFileUrl}
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            fontStyle: 'underline',
          }}
        >
          Sample file
        </Typography>
        &nbsp;format
      </Typography>
    </FileUploader>
  );
};

export default React.memo(ImportDataUploader);
