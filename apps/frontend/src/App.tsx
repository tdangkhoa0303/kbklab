import {LocalizationProvider} from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import {AuthOutlet, FetchAppData, PrivateOutlet, ThemeConfig,} from 'components';
import {ConfirmationModal} from 'components/ConfirmationModal';
import {useFetchUserClassLabs} from 'pages/LabDashboard/LabsGrid.hooks';
import Login from 'pages/Login';
import React, {Suspense} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import {OverlayLoader} from 'shared/components';
import {AppCommonRoute, LocationStateWithBackground} from 'shared/constants';
import {UserRole} from 'shared/models';
import theme from 'shared/theme';
import ModalRoutes from './components/Route/ModalRoutes';

const StudentDashboard = React.lazy(() => import('./pages/LabDashboard'));
const LecturerManagement = React.lazy(
  () => import('./pages/LecturerManagement')
);
const ClassManagement = React.lazy(() => import('./pages/ClassManagement'));
const ScoreDashboard = React.lazy(() => import('./pages/ScoreDashboard'));
const ClassLabDetail = React.lazy(() => import('./pages/ClassLabDetail'));
const ClassScoreDashboard = React.lazy(
  () => import('./pages/ScoreDashboard/routes/ClassScoreDashboard')
);

function App() {
  const fetchUserClassLabs = useFetchUserClassLabs();
  const location = useLocation();
  const locationState = (location.state || {}) as LocationStateWithBackground;

  return (
    <Suspense fallback={<OverlayLoader loading />}>
      <ThemeConfig theme={theme}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <ConfirmationModal>
            <FetchAppData requests={[fetchUserClassLabs]} />
            <Routes location={locationState.background ? locationState.background : location}>
              <Route element={<AuthOutlet />}>
                <Route path={AppCommonRoute.LogIn} element={<Login />} />
              </Route>
              <Route
                element={<PrivateOutlet restrictedRole={[UserRole.Student]} />}
              >
                <Route
                  path={AppCommonRoute.Root}
                  element={<StudentDashboard />}
                />
                <Route path={AppCommonRoute.Score}>Score</Route>
              </Route>
              <Route
                element={
                  <PrivateOutlet
                    restrictedRole={[UserRole.HeadDepartment, UserRole.Admin]}
                  />
                }
              >
                <Route
                  path={AppCommonRoute.LecturerManagement}
                  element={<LecturerManagement />}
                />
              </Route>
              <Route
                element={<PrivateOutlet minimumRole={UserRole.Lecturer} />}
              >
                <Route
                  path={AppCommonRoute.ClassManagement}
                  element={<ClassManagement />}
                />
                <Route
                  path={AppCommonRoute.ScoreDashboard}
                  element={<ScoreDashboard />}
                >
                  <Route path=":classCode" element={<ClassScoreDashboard />} />
                </Route>
              </Route>
            </Routes>
            <ModalRoutes>
              <Route
                path={`${AppCommonRoute.ClassLabDetail}`}
                element={<ClassLabDetail />}
              />
            </ModalRoutes>
          </ConfirmationModal>
        </LocalizationProvider>
      </ThemeConfig>
    </Suspense>
  );
}

export default App;
