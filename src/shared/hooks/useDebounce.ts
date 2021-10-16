import {useEffect, useState} from 'react'

export const useDebounce = <TData>(value: TData, delay = 500) => {
	const [debouncedValue, setDebouncedValue] = useState<TData>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);
	return debouncedValue;
}