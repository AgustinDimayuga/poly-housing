// Part III: System Testing
// For this assignment, a system test verifies that multiple parts of your application work together to complete a feature.
// For example, a system test may exercise an API endpoint, its service logic, and its data-access layer.
// At a minimum, it tests two functions/methods that make up one feature.

// Your team must create at least two system tests.

// Examples:

// A request to create a new book loan returns the correct response and stores the loan.
// A user can create a study group and retrieve it through the application API.
// An invalid request returns the expected error status and message.
// A user that doesn't have permissions can not make changes.

// const API_URL = "http://localhost:8000";

const API_URL = "http://127.0.0.1:8000";

const listingData = {
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

describe("Housing Listings System Tests", () => {
  let listingId: number;

  test("Create a listing and retrieve it", async () => {
    // Step 1: Create a listing
    const createResponse = await fetch(`${API_URL}/listings/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(listingData)
    });
    //console.log("Status:", createResponse.status);
    // console.log(
    //   "Response:",
    //   await createResponse.clone().json()
    // );

    expect(createResponse.status).toBe(200);

    const createdListing = await createResponse.json();

    // // Step 2: Verify the returned listing
    expect(createdListing.city).toBe("San Luis Obispo");
    expect(createdListing.monthly_price).toBe(2400);

    listingId = createdListing.id;

    // // Step 3: Retrieve listings
    const getResponse = await fetch(`${API_URL}/listings/all`);

    expect(getResponse.status).toBe(200);

    const listings = await getResponse.json();

    // Step 4: Verify the listing exists in the database
    const retrievedListing = listings.find(
      (listing: { id: number }) => listing.id === listingId
    );

    expect(retrievedListing).toBeDefined();
    expect(retrievedListing.monthly_price).toBe(2400);
  });

  test("Invalid listing returns an error", async () => {
    // Step 1: Submit an invalid listing
    const response = await fetch(`${API_URL}/listings/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        city: "San Luis Obispo",
        monthly_price: -100
      })
    });

    //   // Step 2: Verify the API rejects the request
    expect(response.status).toBe(422);
  });

  test("Reject listing when poster ID does not exist", async () => {
    const invalidListing = {
      ...listingData,
      posterId: 999999
    };

    const response = await fetch(`${API_URL}/listings/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(invalidListing)
    });

    expect(response.status).toBe(404);

    const result = await response.json();
    expect(result.detail).toBe(
      "Poster ID not found in database"
    );
  });
});

describe("Update Listings", () => {
  test("Update a listing and verify the changes", async () => {
    // Create a listing first
    const createResponse = await fetch(`${API_URL}/listings/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(listingData)
    });

    //should be 201
    expect(createResponse.status).toBe(200);

    const createdListing = await createResponse.json();
    const listingId = createdListing.id;

    const update_listing = {
      id: listingId,
      type: "RENT",
      monthly_price: 2600,
      available_from: "2026-12-01",
      available_to: "2027-11-01",
      status: "SHOWING",
      description: "Updated apartment description",
      amenities: ["Laundry", "Parking"]
    };

    // Update the listing
    const updateResponse = await fetch(
      `${API_URL}/listings/${listingId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update_listing)
      }
    );
    //console.log("Status:", updateResponse.status);
    console.log(
      "Response:",
      await updateResponse.clone().json()
    );
    expect(updateResponse.status).toBe(200);

    // Retrieve all listings
    const getResponse = await fetch(`${API_URL}/listings/all`);
    expect(getResponse.status).toBe(200);

    const listings = await getResponse.json();

    const updatedListing = listings.find(
      (listing: { id: number }) => listing.id === listingId
    );

    expect(updatedListing.monthly_price).toBe(2600);
    expect(updatedListing.description).toBe(
      "Updated apartment description"
    );
  });
});
