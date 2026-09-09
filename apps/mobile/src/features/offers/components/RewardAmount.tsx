import React from 'react';
import { AppText } from '../../../components';
import { formatPoints } from '../offersData';

export type RewardAmountProps = {
  points: number;
  large?: boolean;
  prefix?: string;
};

export function RewardAmount({
  points,
  large = false,
  prefix = 'Earn up to',
}: RewardAmountProps): React.JSX.Element {
  return (
    <AppText variant={large ? 'pointsLarge' : 'points'}>
      {prefix} {formatPoints(points)} pts
    </AppText>
  );
}
