import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { OfferDetailScreen } from '../src/features/offers/screens/OfferDetailScreen';
import { getOfferById, formatPoints } from '../src/features/offers/offersData';
import { linking } from '../src/navigation/linking';
import { themes } from '../src/theme/theme';

describe('getOfferById', () => {
  it('resolves fixture offers and misses unknown ids', () => {
    expect(getOfferById('offer-1')?.title).toBe('Example Game');
    expect(getOfferById('missing')).toBeUndefined();
  });
});

describe('OfferDetailScreen', () => {
  it('renders fixture offer details for a known id', async () => {
    const offer = getOfferById('offer-1');
    expect(offer).toBeDefined();

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

    expect(screen.getByText('Example Game')).toBeTruthy();
    expect(
      screen.getByText(`Earn up to ${formatPoints(offer!.maxPoints)} pts`),
    ).toBeTruthy();
  });

  it('shows empty state when the offer id is unknown', async () => {
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

    expect(screen.getByText('Offer not found')).toBeTruthy();
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
