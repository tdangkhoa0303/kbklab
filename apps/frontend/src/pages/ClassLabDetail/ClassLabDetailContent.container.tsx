import {Icon} from '@iconify/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import {CustomReactMarkdown} from 'components';
import React, {Fragment, useCallback, useMemo} from 'react';
import {useLocationBackground} from 'shared/hooks/useLocationBackground';
import {ClassLab} from 'shared/models';
import {useFetchClassLab} from '../LabDashboard/LabsGrid.hooks';
import LabSteps from './classLabDetailContent/LabSteps';

export interface ClassLabDetailContentProps {
  classLab: ClassLab;
}

const ScrollableGridItem = styled(Grid)({
  height: '100%',
  overflow: 'auto',
});

const StyledContainer = styled(Box)(({theme}) => ({
  padding: theme.spacing(1, 2),
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  overflow: 'auto',
}));

const ClassLabDetailContentContainer: React.FC<ClassLabDetailContentProps> = (props) => {
  const {classLab} = props;
  const {
    lab: { steps, guide, title, description },
    stepSuccess,
    startDate,
    endDate,
    id: classLabId
  } = classLab;
  const locationBackground = useLocationBackground();
  const isDisplayedAsModal = !!locationBackground;

  const fetchClassLabDetail = useFetchClassLab();
  const Container = useMemo(() => isDisplayedAsModal ? Fragment : StyledContainer, [isDisplayedAsModal])

  const onRefresh = useCallback(() => fetchClassLabDetail(classLabId), [classLabId, fetchClassLabDetail])

  return (
    <Container>
      <Box
        py={1.5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          background: theme => theme.palette.common.white,
          position: isDisplayedAsModal ? 'sticky' : 'static',
          top: 0,
          zIndex: 2,
        }}
      >
        <Typography variant="h4" fontWeight={500}>
          {title}
        </Typography>
        <Button
          variant="contained"
          onClick={onRefresh}
          startIcon={<Icon icon="eva:refresh-fill" />}
        >
          Refresh
        </Button>
      </Box>
      <Typography mb={2} sx={{fontSize: (theme) => theme.spacing(2.5)}}>
        {description}
      </Typography>
      <Grid container spacing={2} pb={1} sx={{ zIndex: 2 }}>
        <Grid item sm={3} sx={{ overflow: 'auto' }}>
          <Typography
            color="primary"
            variant="h6"
            sx={{
              fontSize: (theme) => `${theme.spacing(2)} !important`,
              background: (theme) => theme.palette.common.white,
            }}
          >
            STEPS
          </Typography>
        </Grid>
        <Grid item sm={9}>
          <Typography
            color="primary"
            variant="h6"
            sx={{
              fontSize: (theme) => `${theme.spacing(2)} !important`,
              background: (theme) => theme.palette.common.white,
            }}
          >
            GUIDE
          </Typography>
        </Grid>
      </Grid>
      <Box>
        <Grid
          container
          spacing={2}
          sx={{
            overflow: 'hidden',
          }}
        >
          <ScrollableGridItem item sm={3}>
            <LabSteps
              steps={steps}
              stepSuccess={stepSuccess}
              startDate={startDate}
              endDate={endDate}
            />
          </ScrollableGridItem>
          <ScrollableGridItem item sm={9}>
            <CustomReactMarkdown>{guide}</CustomReactMarkdown>
          </ScrollableGridItem>
        </Grid>
      </Box>
    </Container>
  )
}

export default React.memo(ClassLabDetailContentContainer);
