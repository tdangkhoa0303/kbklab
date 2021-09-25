import {useEffect} from 'react';

export const useMounting = (callback: VoidFunction): void => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(callback, []);
}