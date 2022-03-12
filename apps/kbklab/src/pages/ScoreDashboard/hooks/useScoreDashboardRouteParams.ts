import {useMemo} from 'react';
import {matchPath, useLocation} from 'react-router-dom';
import {AppCommonRoute} from 'shared/constants';
import {ScoreDashboardRouteParams} from '../types';

export const useScoreDashboardRouteParams = (): ScoreDashboardRouteParams => {
	const {pathname} = useLocation();
	const matched = useMemo(() => matchPath<'classCode', string>(AppCommonRoute.ClassScoreDashboard, pathname), [pathname])

	return {
		classCode: (matched ? matched.params.classCode : '') || ''
	};
}
