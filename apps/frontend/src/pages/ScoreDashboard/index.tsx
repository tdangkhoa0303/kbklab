import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import {GridContextProvider, PageTitle, useObtainGridValues} from 'components';
import React, {useCallback, useMemo} from 'react';
import {Navigate, Outlet, useNavigate} from 'react-router-dom';
import {OverlayLoader} from 'shared/components';
import {AppCommonRoute} from 'shared/constants';
import {useAllClasses, useIsFetchingClasses} from '../ClassManagement/ClassesGrid.hooks';
import ExportToCSVButton from './components/ExportToCSVButton';
import {useScoreDashboardRouteParams} from './hooks';

const ScoreDashboard: React.FC = () => {
  const [gridValues, obtainGridValues] = useObtainGridValues();
  const {classCode} = useScoreDashboardRouteParams();
  const allClasses = useAllClasses();
  const navigate = useNavigate();
  const isFetchingClasses = useIsFetchingClasses();

  const handleTabChange = useCallback((event, code: string) => {
    navigate(`${AppCommonRoute.ScoreDashboard}/${code}`)
  }, [navigate]);

  const isValidClassCode = useMemo(() => allClasses.some(currentClass => currentClass.code === classCode), [allClasses, classCode])

  const outletContextValues = useMemo(
    () => ({
      obtainGridValues,
      classCode,
    }),
    [classCode, obtainGridValues]
  );

  return (
    <OverlayLoader loading={isFetchingClasses}>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <PageTitle mb={0} title="Score Dashboard" />
        {allClasses.length ? (
          <GridContextProvider value={gridValues}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Tabs
                value={classCode}
                variant="scrollable"
                scrollButtons="auto"
                onChange={handleTabChange}
              >
                {allClasses.map(({code}) => (
                  <Tab key={code} label={code} value={code} />
                ))}
              </Tabs>
              <ExportToCSVButton classCode={classCode} />
            </Stack>
            {!isValidClassCode && <Navigate to={`${AppCommonRoute.ScoreDashboard}/${allClasses[0].code}`} />}
            <Outlet context={outletContextValues} />
          </GridContextProvider>
        ) : (
          <Alert variant="filled" severity="info" sx={{width: 'fit-content'}}>
            You have no class to show or the URL is invalid. Please try to create a class and get back later.
          </Alert>
        )}
      </Stack>
    </OverlayLoader>
  );
};

export default React.memo(ScoreDashboard);
