import {ColorDot} from 'components/index';
import React from 'react';
import {LabStatus} from 'shared/constants';
import {LAB_STATUS_DOT_SIZE, LabStatusColor} from '../LabCard.constants';

export interface LabCardStatusProps {
  status: LabStatus;
}

const LabCardStatus: React.FC<LabCardStatusProps> = (props) => {
  const { status } = props;

  switch (status) {
    case LabStatus.Future:
    case LabStatus.Closed:
      return (
        <ColorDot color={LabStatusColor[status]} size={LAB_STATUS_DOT_SIZE} />
      );
    case LabStatus.Open:
    case LabStatus.InProgress:
      return (
        <ColorDot
          animated
          color={LabStatusColor[status]}
          size={LAB_STATUS_DOT_SIZE}
        />
      );
    default:
      return null;
  }
};

export default React.memo(LabCardStatus);
