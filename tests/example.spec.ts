import { test, expect } from "@playwright/test";
import { url } from "inspector";

//const link = "https://poly-housing.vercel.app/";
const link = "http://localhost:3000";
test("has title", async ({ page }) => {
  await page.goto(link);
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Poly Housing/);
});

test("Reading Login Title", async ({ page }) => {
  await page.goto(link);

  // Click the get started link.
  await page.getByRole("link", { name: "Log in" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Login to Polyhousing" })
  ).toBeVisible();
});

// {
//   "name": "test_user",
//   "email": "test@gmail.com",
//   "password": "test",
//   "role": "STUDENT",
//   "grad_year": 2030,
//   "campus_id": 1
//}

test("Logging in ", async ({ page }) => {
  await page.goto(link);
  await page.getByRole("link", { name: "Log in" }).click();
  await expect(page).toHaveURL(/\/login/); // wait until we're actually on the login page
  await page.getByLabel("Email Address").fill("test@gmail.com");
  await page
    .getByLabel("Password", { exact: true })
    .fill("test");
  await page.getByRole("button", { name: "Log in" }).click();

  await expect(page).toHaveURL(link + "/listings");
});

test("Filtering-Houses-Via Search bar", async ({ page }) => {
  await page.goto(link); //go to home page
  await page.getByRole("link", { name: "Log in" }).click();
  await expect(page).toHaveURL(/\/login/);
  await page.getByLabel("Email Address").fill("test@gmail.com");
  await page
    .getByLabel("Password", { exact: true })
    .fill("test");
  await page.getByRole("button", { name: "Log in" }).click();
  await expect(page).toHaveURL(link + "/listings");

  await page
    .getByRole("textbox", { name: "SearchBar" })
    .fill("Fresno");

  await page
    .getByRole("button", { name: "SubmitSearch" })
    .click();

  await expect(page).toHaveURL(/search=Fresno/);
});
