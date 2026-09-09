import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { OfferCard } from '../src/features/offers/components/OfferCard';
import { RewardAmount } from '../src/features/offers/components/RewardAmount';
import { formatPoints } from '../src/features/offers/offersData';
import { themes } from '../src/theme/theme';
import type { Offer } from '../src/features/offers/types';

const sampleOffer: Offer = {
  id: 'offer-test',
  title: 'Example Game',
  subtitle: 'Play to earn',
  category: 'Game',
  maxPoints: 5000,
  badge: 'New',
};

async function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={themes.dark}>{ui}</ThemeProvider>);
}

describe('RewardAmount', () => {
  it('formats points with prefix for the reward label', async () => {
    await renderWithTheme(<RewardAmount points={2500} />);
    expect(
      screen.getByText(`Earn up to ${formatPoints(2500)} pts`),
    ).toBeTruthy();
  });
});

describe('OfferCard', () => {
  it('renders offer essentials and forwards view actions', async () => {
    const onPress = jest.fn();
    await renderWithTheme(<OfferCard offer={sampleOffer} onPress={onPress} />);

    expect(screen.getByText('Example Game')).toBeTruthy();
    expect(screen.getByText('Game')).toBeTruthy();
    expect(screen.getByText('New')).toBeTruthy();
    expect(
      screen.getByText(`Earn up to ${formatPoints(5000)} pts`),
    ).toBeTruthy();

    fireEvent.press(screen.getByText('View offer'));
    expect(onPress).toHaveBeenCalledWith(sampleOffer);
  });
});
