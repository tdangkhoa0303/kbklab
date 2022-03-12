import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {getAllLabs} from '../CreateClassLabButton.thunks';

export const useGetAllLabs = () => {
	const dispatch = useDispatch();
	return useCallback(() => dispatch(getAllLabs()), [dispatch]);
};
