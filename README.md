# Tuum API Tests

Welcome to the `Tuum-API-tests` repository! This project contains a suite of tests designed to ensure the stability and reliability of the Tuum API.

## Overview

The `Tuum-API-tests` repository is aimed at providing a comprehensive testing framework for the Tuum API. This includes various types of tests to validate endpoints, request and response formats, error handling, and overall functionality.

## Features

- **Endpoint Testing:** Verify that each API endpoint performs as expected.
- **Response Validation:** Ensure responses are correctly formatted and contain expected data.
- **Error Handling:** Test how the API handles incorrect inputs and edge cases.
- **Automated Testing:** Run tests automatically to catch issues early.

## Getting Started

To get started with the Tuum API tests, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Postman](https://www.postman.com/) (for manually running API tests)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Merady/Tuum-API-tests.git
   cd Tuum-API-tests
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Running Tests

To run the test suite, use the following command:

```bash
npx cypress run
```

This will execute all the tests and display the results in your terminal.





# Test Plan for Create Account, Account Balance, and Account Transactions

#### Overview
This test plan outlines the strategy, objectives, scope, resources, and schedule for testing the functionalities related to account creation, account balances, and account transactions in the Tuum API. These tests will be performed using Cypress, focusing on end-to-end (E2E) testing.

#### Objectives
- Verify the correctness of account creation.
- Ensure accurate retrieval of account balances.
- Validate the functionality of account transactions.
- Identify and address any bugs or issues.

#### Scope
- Positive and negative test cases for account creation.
- Positive and negative test cases for account balances.
- Positive and negative test cases for account transactions.

#### Resources
- Cypress for end-to-end testing.
- Fixtures for mock data.
- A dedicated test environment with access to real API endpoints.
- Access to the application’s authentication mechanism.

### Test Strategy
1. **Account Creation:**
   - Test creating an account with all required fields.
   - Test creating an account with various valid and invalid field values.
   - Test behavior when required fields are missing.

2. **Account Balances:**
   - Test retrieving the balance for a newly created account.
   - Test retrieving the balance for a random existing account.
   - Test response when trying to retrieve the balance for a non-existent account.

3. **Account Transactions:**
   - Test creating a transaction with all required fields.
   - Test creating transactions with various valid and invalid field values.
   - Test behavior when required fields are missing in the transaction request.
   - Validate balance update after creating a transaction.

### Test Cases

#### 1. Account Creation

**Positive Test Cases:**
- Create an account with all required fields.
- Create an account with optional fields.
- Create an account with different valid `accountTypeCode`, `currencyCode`, and `customerGroupCode`.

**Negative Test Cases:**
- Create an account with missing required fields.
- Create an account with invalid `accountTypeCode`, `currencyCode`, or `customerGroupCode`.
- Create an account with an existing account ID.

**Sample Test:**
- Test creating an account with valid data.
  - Precondition: Authentication token obtained.
  - Action: Send POST request to the account creation endpoint.
  - Expected Result: Account is created successfully and the response status is 200.

#### 2. Account Balances

**Positive Test Cases:**
- Retrieve balance for a newly created account.
- Retrieve balance for an existing account.

**Negative Test Cases:**
- Retrieve balance for a non-existent account.
- Retrieve balance without authentication.

**Sample Test:**
- Test retrieving the balance for a valid account.
  - Precondition: An account exists and the balance is known.
  - Action: Send GET request to retrieve balance.
  - Expected Result: Balance is retrieved successfully and matches the expected value.

#### 3. Account Transactions

**Positive Test Cases:**
- Create a transaction with all required fields.
- Create transactions with different valid `transactionTypeCode`, `money` amounts, `currencyCode`, `details`, and `referenceNumber`.

**Negative Test Cases:**
- Test cases for missing required fields.
- Test cases for invalid values in required fields.

**Sample Test:**
- Test creating a transaction with valid data.
  - Precondition: An account exists and has a balance.
  - Action: Send POST request to create a transaction.
  - Expected Result: Transaction is created successfully and the response status is 200.
