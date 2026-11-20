Documentation Requirements
Add a TESTING.md file or a Testing section in your project README. Include:

The testing tools your team selected for each type of test.
Instructions for installing dependencies and running tests.
A short description of each required testing level.
The feature, rule, or bug fix developed using TDD.
Any external services, environment variables, seed data, or test databases required.
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
 - pnpm exec playwright test
    Runs the end-to-end tests.
 - pnpm exec playwright test --ui
    Starts the interactive UI mode.

### To run both Jest and PLaywright 
- pnpm test:all

## TDD Testing 



## Unit Testing 


## System Testing



## UI Testing 


## Limitations/Future Additions 
