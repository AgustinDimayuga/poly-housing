Documentation Requirements Add a TESTING.md file or a Testing
section in your project README. Include:

The testing tools your team selected for each type of test.
Instructions for installing dependencies and running tests. A
short description of each required testing level. The feature,
rule, or bug fix developed using TDD. Any external services,
environment variables, seed data, or test databases required.
Known testing limitations or future tests your team would add.

## Testing tools used

- Playwright
- Jest

### Downloading / Using Testing Tools

#### Jest

- Docs : https://jestjs.io/docs/next/getting-started

  - How to download : pnpm add --save-dev jest

  - to use run : pnpm test to run any Jest tests

#### Playwright

- Downloading Playwright: pnpm create playwright
- Link : https://playwright.dev/docs/intro

Helpful for visualization (for playwright)

- pnpm exec playwright test Runs the end-to-end tests.
- pnpm exec playwright test --ui Starts the interactive UI mode.

### To run both Jest and PLaywright

- pnpm test:all

## TDD Testing

The feature being tested is being able to log in to the website.

The initial test was to see if the user is able to log in using
the right credentials.

The code that was added to make the test pass was added in the
backend where we queried the database and checked if the
credentials match.

There wasn't any refactoring needed.

## Unit Testing

Unit tests verify individual pieces of code in isolation to
ensure they behave as expected. These tests focus on specific
validation rules and functions without testing the entire
application.

What is being tested:

Listing validation, including bedroom and bathroom requirements.

Monthly price validation to prevent negative prices.

Availability date validation to ensure the start date is before
the end date.

## System Testing

System tests verify that multiple parts of the application work
together to complete a feature. These tests send requests to the
FastAPI backend and verify that API endpoints, application
logic, and database operations work together correctly.

What is tested:

Creating a listing and retrieving it from the database.

Rejecting listings with invalid input.

Rejecting listings associated with nonexistent users.

Updating a listing and verifying that the changes are saved and
retrieved correctly.

## UI Testing

UI tests verify that the Poly Housing frontend works correctly
from the user's perspective. These tests interact with the
application through a browser and check that pages and interface
elements behave as expected.

What is tested:

Frontend pages load successfully.

Page titles and visible elements display correctly.

User interface functionality works as expected.

## Limitations/Future Additions
