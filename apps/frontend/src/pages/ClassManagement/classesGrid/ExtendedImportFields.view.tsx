import { FormikTextField } from 'components';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { Option } from 'shared/constants';

export interface ExtendedImportFieldsViewProps {
  lecturerOptions: Option[];
  isLecturer: boolean;
}

const ExtendedImportFieldsView: React.FC<ExtendedImportFieldsViewProps> = (
  props
) => {
  const { lecturerOptions, isLecturer } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormikTextField
          fullWidth
          name="classCode"
          label="Class Code"
          placeholder="Enter class code"
          helperText="Format IAxxxx. Ex: IA1403"
        />
      </Grid>
      <Grid item xs={6}>
        <FormikTextField
          select
          fullWidth
          label="Lecturer"
          name="lecturerId"
          disabled={isLecturer}
          placeholder="Select lecturer"
        >
          {lecturerOptions.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </FormikTextField>
      </Grid>
    </Grid>
  );
};

export default React.memo(ExtendedImportFieldsView);
