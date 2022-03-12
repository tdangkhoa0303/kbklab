import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {attemptLabThunk} from '../thunks';
import {AttemptLabCallback, AttemptLabPayload} from '../types';

export const useAttemptLab = (): AttemptLabCallback => {
	const dispatch = useDispatch();
	return useCallback((params: AttemptLabPayload) => dispatch(attemptLabThunk(params)), [dispatch])
}
