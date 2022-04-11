import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import {GridContextProvider, PageTitle, useObtainGridValues} from 'components';
import React, {useCallback, useMemo} from 'react';
import {Navigate, Outlet, useNavigate} from 'react-router-dom';
import {AppCommonRoute} from 'shared/constants';
import {useAllClasses} from '../ClassManagement/ClassesGrid.hooks';
import ExportToCSVButton from './components/ExportToCSVButton';
import {useScoreDashboardRouteParams} from './hooks';

const ScoreDashboard: React.FC = () => {
  const [gridValues, obtainGridValues] = useObtainGridValues();
  const {classCode} = useScoreDashboardRouteParams();
  const allClasses = useAllClasses();
  const navigate = useNavigate();

  const handleTabChange = useCallback((_, code: string) => {
    navigate(`${AppCommonRoute.ScoreDashboard}/${code}`)
  }, [navigate])

  const outletContextValues = useMemo(
    () => ({
      obtainGridValues,
      classCode,
    }),
    [classCode, obtainGridValues]
  );

  return (
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
          {!classCode && <Navigate to={`${AppCommonRoute.ScoreDashboard}/${allClasses[0].code}`} />}
          <Outlet context={outletContextValues} />
        </GridContextProvider>
      ) : (
        <Alert variant="filled" severity="info" sx={{width: 'fit-content'}}>
          You have no class to show. Please try to create a class and get back later.
        </Alert>
      )}
    </Stack>
  );
};

export default React.memo(ScoreDashboard);
