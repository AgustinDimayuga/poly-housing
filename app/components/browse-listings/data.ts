export type Home = {
  id: number;
  name: string;
  rent: number;
  address: string;
  neighborhood: string;
  beds: number;
  baths: number;
  area: number;
  date: string;
  type: "House" | "Apartment" | "Studio";
  lease: "Academic year" | "12 months";
  image: string;
  alt: string;
  note: string;
  amenities: string[];
};

const samples: Omit<Home, "id" | "lease">[] = [
  {
    name: "Cedar House",
    rent: 3600,
    address: "1248 Cedar St",
    neighborhood: "Anholm",
    beds: 3,
    baths: 2,
    area: 1420,
    date: "2027-09-01",
    type: "House",
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=900&q=85",
    alt: "A welcoming cottage surrounded by a leafy garden",
    note: "$1,200 / person · split 3 ways",
    amenities: [
      "In-unit laundry",
      "Parking included",
      "Pets allowed"
    ]
  },
  {
    name: "Foothill Courtyard",
    rent: 2450,
    address: "680 Foothill Blvd",
    neighborhood: "Foothill",
    beds: 2,
    baths: 1,
    area: 920,
    date: "2027-08-20",
    type: "Apartment",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=85",
    alt: "A sunlit apartment community with landscaped grounds",
    note: "Water & trash included",
    amenities: ["Parking included"]
  },
  {
    name: "Hathway Cottage",
    rent: 3150,
    address: "312 Hathway Ave",
    neighborhood: "Lower campus",
    beds: 3,
    baths: 1,
    area: 1180,
    date: "2027-09-05",
    type: "House",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=85",
    alt: "A traditional home with a green lawn and mature trees",
    note: "$1,050 / person · split 3 ways",
    amenities: ["In-unit laundry", "Pets allowed"]
  },
  {
    name: "Olive Street Studio",
    rent: 1650,
    address: "845 Olive St",
    neighborhood: "Downtown",
    beds: 0,
    baths: 1,
    area: 480,
    date: "2027-08-15",
    type: "Studio",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=85",
    alt: "A bright studio bedroom with a comfortable bed",
    note: "Water & internet included",
    amenities: ["In-unit laundry"]
  },
  {
    name: "Garden Walk Apartments",
    rent: 2800,
    address: "1020 Highland Dr",
    neighborhood: "Foothill",
    beds: 2,
    baths: 2,
    area: 1050,
    date: "2027-09-01",
    type: "Apartment",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=85",
    alt: "Garden apartments under a clear blue sky",
    note: "Water, trash & parking included",
    amenities: ["Parking included", "Pets allowed"]
  },
  {
    name: "Palm Street Home",
    rent: 4200,
    address: "560 Palm St",
    neighborhood: "Downtown",
    beds: 4,
    baths: 2,
    area: 1680,
    date: "2027-08-25",
    type: "House",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=85",
    alt: "A spacious home with a landscaped front yard",
    note: "$1,050 / person · split 4 ways",
    amenities: ["In-unit laundry", "Parking included"]
  }
];

const moreNames = [
  "Chorro Creek House",
  "Monterey Place",
  "Peach Street Cottage",
  "Mission Studio",
  "Vista Apartments",
  "Cerro San Luis Home",
  "Walnut House",
  "College Garden",
  "Santa Rosa Cottage",
  "Marsh Street Studio",
  "Creekside Apartments",
  "Mill Street Home",
  "Bishop House",
  "Valencia Court",
  "Islay Cottage",
  "Pacific Studio",
  "Highland Apartments",
  "Pismo Street Home"
];

// Frontend demo inventory; no backend requests are made.
export const homes: Home[] = Array.from(
  { length: 24 },
  (_, index) => ({
    ...samples[index % samples.length],
    id: index + 1,
    lease: index % 2 === 0 ? "Academic year" : "12 months",
    ...(index > 5
      ? {
          name: moreNames[index - 6],
          address: `${700 + index * 13} ${moreNames[index - 6].split(" ")[0]} St`
        }
      : {})
  })
);

export const number = (value: number) =>
  value.toLocaleString("en-US");
export const dateLabel = (value: string) =>
  new Date(`${value}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  });
