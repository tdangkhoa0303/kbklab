import {useMemo} from 'react';
import {Option} from 'shared/constants';
import {useUser} from 'shared/hooks';

/**
 * Only use this hook in authenticated route because it will return the option based on the signed-in user information
 */
export const useDefaultLecturerOption = () => {
	const {name, id} = useUser();

	return useMemo((): Option => ({
		label: name,
		value: id
	}), [name, id])
}
