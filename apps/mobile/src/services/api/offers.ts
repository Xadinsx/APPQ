import type { Offer } from '../../features/offers/types';
import { apiRequest } from './client';

type ApiOffer = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  maxPoints: number;
  featured: boolean;
  badge: string | null;
};

function mapOffer(offer: ApiOffer): Offer {
  return {
    id: offer.id,
    title: offer.title,
    subtitle: offer.subtitle,
    category: offer.category,
    maxPoints: offer.maxPoints,
    featured: offer.featured,
    badge: offer.badge ?? undefined,
  };
}

export async function fetchOffers(): Promise<Offer[]> {
  const data = await apiRequest<{ offers: ApiOffer[] }>('/offers');
  return data.offers.map(mapOffer);
}

export async function fetchOfferById(id: string): Promise<Offer> {
  const data = await apiRequest<{ offer: ApiOffer }>(`/offers/${id}`);
  return mapOffer(data.offer);
}

export async function fetchFeaturedOffer(): Promise<Offer | undefined> {
  const offers = await fetchOffers();
  return offers.find(offer => offer.featured) ?? offers[0];
}
