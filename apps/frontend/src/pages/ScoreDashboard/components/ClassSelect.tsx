import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Option} from 'shared/constants';
import {useOptions} from 'shared/hooks';
import {Class} from 'shared/models';
import {useAllClasses} from '../../ClassManagement/ClassesGrid.hooks';

export interface ClassSelectProps {
  classCode: string;
}

const ClassSelect: React.FC<ClassSelectProps> = ({ classCode }) => {
  const navigate = useNavigate();
  const allClasses = useAllClasses();
  const classOptions = useOptions<Class, 'code'>({
    data: allClasses,
    labelKey: 'code',
    valueKey: 'code',
  });

  const initialClassOption = useMemo(
    () => classOptions.find((option) => option.value === classCode) || null,
    [classOptions, classCode]
  );
  const [currentClassOption, setCurrentClassOption] = useState<Option | null>(
    initialClassOption
  );

  const handleSelectClass = useCallback(
    (_, option) => {
      setCurrentClassOption(option);
      if (option) {
        navigate(`/score-dashboard/${option.value}`);
      }
    },
    [navigate]
  );

  useEffect(() => {
    console.log('a')
    if (!currentClassOption && classOptions[0]) {
      handleSelectClass({}, classOptions[0]);
    }
  }, [currentClassOption, classOptions, handleSelectClass]);

  return (
    <Autocomplete
      value={currentClassOption}
      options={classOptions}
      onChange={handleSelectClass}
      renderInput={(params) => <TextField {...params} label="Class" />}
      sx={{ width: (theme) => theme.spacing(30) }}
    />
  );
};

export default React.memo(ClassSelect);
