import React from 'react';
import {useParams} from 'react-router-dom';
import {OverlayLoader} from 'shared/components';
import {useMounting} from 'shared/hooks';
import {useClassLabById, useFetchClassLab, useIsFetchingClassLab} from '../LabDashboard/LabsGrid.hooks';
import {ClassLabDetailRouteParams} from './ClassLabDetail.types';
import ClassLabDetailContent from './ClassLabDetailContent.container';

const ClassLabDetail: React.FC = () => {
  const {classLabId = ''} = useParams<ClassLabDetailRouteParams>();
  const fetchClassLab = useFetchClassLab();
  const isLoading = useIsFetchingClassLab();
  const classLab = useClassLabById(classLabId);

  useMounting(() => {
    if (classLabId) {
      fetchClassLab(classLabId);
    }
  })

  return (
    <OverlayLoader loading={isLoading || !classLab} sx={{borderRadius: theme => theme.spacing(2)}}>
      {classLab && <ClassLabDetailContent classLab={classLab}/>}
    </OverlayLoader>
  )
}

export default React.memo(ClassLabDetail);
