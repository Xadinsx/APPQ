import React from 'react';
import { Badge, type BadgeTone } from '../../../components';

export type OfferBadgeProps = {
  label: string;
};

function toneForLabel(label: string): BadgeTone {
  const normalized = label.toLowerCase();
  if (normalized === 'hot') {
    return 'danger';
  }
  if (normalized === 'easy') {
    return 'neutral';
  }
  return 'accent';
}

export function OfferBadge({ label }: OfferBadgeProps): React.JSX.Element {
  return <Badge label={label} tone={toneForLabel(label)} />;
}
