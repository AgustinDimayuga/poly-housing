import { Listing } from "./listings";

export type ListingFilters = {
  maxPrice?: number;
  bedrooms?: number;
};

export async function filterListingsfilters(
  filters: ListingFilters = {}
): Promise<Listing[]> {
  const params = new URLSearchParams();

  if (filters.maxPrice !== undefined) {
    params.set("max_price", String(filters.maxPrice));
  }
  if (filters.bedrooms !== undefined) {
    params.set("bedrooms", String(filters.bedrooms));
  }
  const response = await fetch(
    `${process.env.API_URL}/listings/filter?${params}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load listings (${response.status})`
    );
  }
  return response.json();
}
