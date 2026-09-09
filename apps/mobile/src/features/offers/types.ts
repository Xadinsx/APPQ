export type Offer = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  maxPoints: number;
  featured?: boolean;
  badge?: string;
};

export type OffersFixture = {
  offers: Offer[];
};
