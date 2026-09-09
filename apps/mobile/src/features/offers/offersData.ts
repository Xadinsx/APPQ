import offersFixture from './fixtures/offers.json';
import type { Offer, OffersFixture } from './types';

const fixture = offersFixture as OffersFixture;

export function getOffers(): Offer[] {
  return fixture.offers;
}

export function getFeaturedOffer(): Offer | undefined {
  return (
    fixture.offers.find((offer: Offer) => offer.featured) ?? fixture.offers[0]
  );
}

export function getOfferById(id: string): Offer | undefined {
  return fixture.offers.find((offer: Offer) => offer.id === id);
}

export function formatPoints(points: number): string {
  return points.toLocaleString('en-US');
}
