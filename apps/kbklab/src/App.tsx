import {LocalizationProvider} from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import {AuthOutlet, FetchAppData, PrivateOutlet, ThemeConfig} from 'components';
import {ConfirmationModal} from 'components/ConfirmationModal';
import {useFetchUserClassLabs} from 'pages/LabDashboard/LabsGrid.hooks';
import Login from 'pages/Login';
import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {OverlayLoader} from 'shared/components'
import {AppCommonRoute} from 'shared/constants';
import {UserRole} from 'shared/models';
import theme from 'shared/theme';

const StudentDashboard = React.lazy(() => import('./pages/LabDashboard'));
const LecturerManagement = React.lazy(() => import('./pages/LecturerManagement'));
const ClassManagement = React.lazy(() => import('./pages/ClassManagement'));
const ScoreDashboard = React.lazy(() => import('./pages/ScoreDashboard'));
const ClassScoreDashboard = React.lazy(() => import('./pages/ScoreDashboard/routes/ClassScoreDashboard'))

function App() {
	const fetchUserClassLabs = useFetchUserClassLabs();

	return (
		<Suspense fallback={<OverlayLoader loading />}>
			<ThemeConfig theme={theme}>
				<LocalizationProvider dateAdapter={DateAdapter}>
					<ConfirmationModal>
						<FetchAppData requests={[fetchUserClassLabs]} />
						<Routes>
							<Route element={<AuthOutlet />}>
								<Route path={AppCommonRoute.LogIn} element={<Login />} />
							</Route>
							<Route element={<PrivateOutlet restrictedRole={[UserRole.Student]} />}>
								<Route path={AppCommonRoute.Root} element={<StudentDashboard />} />
								<Route path={AppCommonRoute.Score}>Score</Route>
							</Route>
							<Route element={<PrivateOutlet restrictedRole={[UserRole.HeadDepartment, UserRole.Admin]} />}>
								<Route path={AppCommonRoute.LecturerManagement} element={<LecturerManagement />} />
							</Route>
							<Route element={<PrivateOutlet minimumRole={UserRole.Lecturer} />}>
								<Route path={AppCommonRoute.ClassManagement} element={<ClassManagement />} />
								<Route path={AppCommonRoute.ScoreDashboard} element={<ScoreDashboard />}>
									<Route path=":classCode" element={<ClassScoreDashboard />} />
								</Route>
							</Route>
						</Routes>
					</ConfirmationModal>
				</LocalizationProvider>
			</ThemeConfig>
		</Suspense>
	);
}

export default App;
