import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {finishLabThunk} from '../thunks';
import {FinishLabCallback} from '../types';

export const useFinishLab = (): FinishLabCallback => {
	const dispatch = useDispatch();
	return useCallback((params) => dispatch(finishLabThunk(params)), [dispatch])
};
