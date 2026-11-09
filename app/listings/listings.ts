// define the type for the listing object that we need to popoulate one card
export type Listing = {
  id: number;
  campus: string;
  city: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  square_ft: number;
  monthly_price: number;
  available_from: string;
  available_to: string;
  status: string;
  address: string;
  description: string;
  amenities: string[];
};

export async function getListings(): Promise<Listing[]> {
  const response = await fetch(
    `${process.env.API_URL}/listings/all`,
    {
      cache: "no-store"
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch all listings (status: ${response.status})`
    );
  }

  return response.json();
}
