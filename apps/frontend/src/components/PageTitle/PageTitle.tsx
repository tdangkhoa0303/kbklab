import Box, {BoxProps} from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

export interface PageTitleProps extends BoxProps {
  title: string;
  PageAction?: React.FC;
}

const PageTitle: React.FC<PageTitleProps> = (props) => {
  const { title, PageAction, ...restProps } = props;

  return (
    <Box
      mb={2}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      {...restProps}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: (theme) => theme.spacing(3.5),
          fontWeight: 500,
          lineHeight: 'unset',
        }}
      >
        {title}
      </Typography>
      {PageAction && <PageAction />}
    </Box>
  );
};

export default React.memo(PageTitle);
