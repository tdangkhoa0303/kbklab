import isNil from 'lodash/isNil';
import {useCallback, useState} from 'react';

export type ToggleCallback = [
	isOn: boolean,
	toggle: (isOn?: boolean) => void,
	toggleOn: VoidFunction,
	toggleOff: VoidFunction
]
export const useToggle = (initialOn: boolean): ToggleCallback => {
	const [isOn, setIsOn] = useState<boolean>(initialOn);

	const toggle = useCallback((toggleValue?: boolean) => setIsOn(previousIsOn => (
		!isNil(toggleValue) ? toggleValue : !previousIsOn
	)), [setIsOn]);
	const toggleOn = useCallback(() => setIsOn(true), [setIsOn]);
	const toggleOff = useCallback(() => setIsOn(false), [setIsOn]);

	return [isOn, toggle, toggleOn, toggleOff];
}
