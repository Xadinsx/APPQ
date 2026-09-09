import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { OfferDetailScreen } from '../src/features/offers/screens/OfferDetailScreen';
import { formatPoints } from '../src/features/offers/offersData';
import { linking } from '../src/navigation/linking';
import { themes } from '../src/theme/theme';
import type { Offer } from '../src/features/offers/types';
import * as offersApi from '../src/services/api/offers';

const sampleOffer: Offer = {
  id: 'offer-1',
  title: 'Example Game',
  subtitle: 'Play to earn',
  category: 'Game',
  maxPoints: 5000,
  badge: 'New',
};

jest.mock('../src/services/api/offers', () => ({
  fetchOfferById: jest.fn(),
  fetchOffers: jest.fn(),
  fetchFeaturedOffer: jest.fn(),
}));

describe('OfferDetailScreen', () => {
  it('renders API offer details for a known id', async () => {
    jest.mocked(offersApi.fetchOfferById).mockResolvedValue(sampleOffer);

    await render(
      <ThemeProvider theme={themes.dark}>
        <OfferDetailScreen
          navigation={
            {} as unknown as React.ComponentProps<
              typeof OfferDetailScreen
            >['navigation']
          }
          route={
            {
              key: 'OfferDetail',
              name: 'OfferDetail',
              params: { id: 'offer-1' },
            } as unknown as React.ComponentProps<
              typeof OfferDetailScreen
            >['route']
          }
        />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Example Game')).toBeTruthy();
    });
    expect(
      screen.getByText(`Earn up to ${formatPoints(sampleOffer.maxPoints)} pts`),
    ).toBeTruthy();
  });

  it('shows empty state when the offer id is unknown', async () => {
    jest
      .mocked(offersApi.fetchOfferById)
      .mockRejectedValue(new Error('Offer not found'));

    await render(
      <ThemeProvider theme={themes.dark}>
        <OfferDetailScreen
          navigation={
            {} as unknown as React.ComponentProps<
              typeof OfferDetailScreen
            >['navigation']
          }
          route={
            {
              key: 'OfferDetail',
              name: 'OfferDetail',
              params: { id: 'does-not-exist' },
            } as unknown as React.ComponentProps<
              typeof OfferDetailScreen
            >['route']
          }
        />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Offer not found')).toBeTruthy();
    });
  });
});

describe('linking config', () => {
  it('maps appquest offer paths to Discover OfferDetail', () => {
    expect(linking.prefixes).toContain('appquest://');
    expect(linking.config?.screens).toMatchObject({
      Discover: {
        screens: {
          OfferDetail: 'offer/:id',
        },
      },
    });
  });
});
