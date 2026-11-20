import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
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

describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})
