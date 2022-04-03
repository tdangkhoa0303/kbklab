import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import {styled} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {useDebounce} from 'shared/hooks';

export interface SearchBarProps {
  value?: string;
  onSearchTextChange: (searchText: string | undefined) => void;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: theme.spacing(35),
  margin: theme.spacing(0, 1),

  '& input': {
    padding: theme.spacing(1),
  },

  '& .MuiInputBase-root': {
    borderRadius: theme.spacing(1),

    '&:before, &:after': {
      display: 'none',
    },
  },
}));

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { value, onSearchTextChange } = props;
  const [searchText, setSearchText] = useState(value);
  const debounceSearchText = useDebounce(searchText, 200);

  const handleSearchTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    [setSearchText]
  );

  useEffect(() => {
    onSearchTextChange(debounceSearchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearchText]);

  return (
    <StyledTextField
      variant="filled"
      value={searchText}
      placeholder="Search..."
      onChange={handleSearchTextChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ marginTop: '0 !important' }}>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default React.memo(SearchBar);
