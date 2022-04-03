import Typography from '@mui/material/Typography';
import React, {ReactNode} from 'react';

export interface LabStepsItemContentProps {
  subTitle: string;
  description: ReactNode;
}

const LabStepsItemContent: React.FC<LabStepsItemContentProps> = (props) => {
  const {subTitle, description} = props;

  return (
    <>
      {Boolean(subTitle) && (
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: (theme) => theme.spacing(1.5),
          }}
          variant="body2"
        >
          {subTitle}
        </Typography>
      )}
      <Typography mb={1} variant="body1" sx={{ color: '#333333' }}>
        {description}
      </Typography>
    </>
  );
};

export default React.memo(LabStepsItemContent);
