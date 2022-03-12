import {useMemo} from 'react';
import {Option} from '../constants';

export interface UseOptionsParams<TObject extends object, TKey extends keyof TObject> {
	data: TObject[];
	labelKey: keyof TObject;
	valueKey: TKey;
}

export const useOptions = <TObject extends object, TKey extends keyof TObject>(
	params: UseOptionsParams<TObject, TKey>
): Option<TObject[TKey]>[] => {
	const {labelKey, valueKey, data} = params;

	return useMemo(
		() =>
			data.map((item) => ({
				label: `${item[labelKey]}`,
				value: item[valueKey],
			})),
		[data, labelKey, valueKey]
	);
};
