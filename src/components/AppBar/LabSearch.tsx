import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {useDebounce} from 'shared/hooks';
import TextField from '@mui/material/TextField';
import {styled} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment';
import {useSetSearchText} from './AppBar.hooks';

export interface LabSearchProps {
	value?: string
}

const StyledTextField = styled(TextField)(({theme}) => ({
	width: theme.spacing(35),
	margin: theme.spacing(0, 1),

	'& input': {
		padding: theme.spacing(1),
	},

	'& .MuiInputBase-root': {
		borderRadius: theme.spacing(1),

		'&:before, &:after': {
			display: 'none'
		}
	}
}))

const LabSearch: React.FC<LabSearchProps> = () => {
	const [searchText, setSearchText] = useState('');
	const debounceSearchText = useDebounce(searchText, 200);
	const setDebounceSearchText = useSetSearchText();

	const handleSearchTextChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setSearchText(event.target.value)
	}, [setSearchText]);

	useEffect(() => {
		setDebounceSearchText(debounceSearchText)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debounceSearchText]);

	return (
		<StyledTextField
			variant="filled"
			value={searchText}
			placeholder="Search your lab..."
			onChange={handleSearchTextChange}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start" sx={{marginTop: '0 !important'}}>
						<SearchIcon />
					</InputAdornment>
				),
			}}
		/>
	)
}

export default React.memo(LabSearch)