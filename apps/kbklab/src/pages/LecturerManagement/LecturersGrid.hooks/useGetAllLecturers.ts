import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {getAllLecturers} from '../LecturersGrid.thunks';

export const useGetAllLecturers = () => {
	const dispatch = useDispatch();
	return useCallback(() => dispatch(getAllLecturers()), [dispatch])
}
