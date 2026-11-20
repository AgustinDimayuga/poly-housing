// Part II: Unit Testing
// Unit tests verify a small unit of code in isolation, such as a function, class, service method, or validation rule.

// Your team must create at least four unit tests covering at least two different units of code.

// Good unit-test targets include:

// Price or cost calculations.
// Input-validation functions.
// Permission checks.
// Search or filtering logic.
// State transition rules.
const backend = "http://127.0.0.1:8000";

const listingdata = {
  posterId: 1,
  campus: "calpoly",
  city: "San Luis Obispo",
  type: "RENT",
  bedroom: 2,
  bathroom: 1,
  square_ft: 950,
  monthly_price: 2400,
  available_from: "2026-12-01",
  available_to: "2027-11-01",
  status: "SHOWING",
  address: "123 Example Street",
  description: "Two bedroom apartment",
  amenities: ["Laundry", "Parking"]
};

describe("Listing Validation Unit Tests", () => {
  test("Rejects listing with zero bedrooms", async () => {
    const response = await fetch(`${backend}/listings/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...listingdata,
        bedroom: 0
      })
    });

    expect(response.status).toBe(422);
  });

  test("Rejects listing with zero bathrooms", async () => {
    const response = await fetch(`${backend}/listings/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...listingdata,
        bathroom: 0
      })
    });

    expect(response.status).toBe(422);
  });

  test("Rejects negative monthly price", async () => {
    const response = await fetch(`${backend}/listings/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...listingdata,
        monthly_price: -100
      })
    });

    expect(response.status).toBe(422);
  });

  test("Rejects invalid availability dates", async () => {
    const response = await fetch(`${backend}/listings/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...listingdata,
        available_from: "2027-11-01",
        available_to: "2026-12-01"
      })
    });

    expect(response.status).toBe(422);
  });
});
