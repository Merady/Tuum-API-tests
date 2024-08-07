// ***********************************************

// ***********************************************
//
//
const personId = crypto.randomUUID(); // Generate an ID to use as the personId
const tokenUrl = 'https://auth-api.sandbox.tuumplatform.com/api/v1/employees/authorise'; // URL to get the authentication token
const createAccountUrl = `/api/v4/persons/${personId}/accounts`; 
const authRequestBody = {
      "username": "modular.system",
      "password": "pass"
    };

Cypress.Commands.add('postAndExtractToken', (url, requestBody) => {
  cy.request({
    method: 'POST',
    url: url,
    body: requestBody,
    headers: {
      'Content-Type': 'application/json',
      'x-channel-code': 'SYSTEM',
      'x-tenant-code': 'MB'
    }
  }).then((response) => {
    expect(response.status).to.eq(200); // Ensure the response is successful
    const token = response.body.data.token;
    cy.wrap(token).as('token'); // Wrap the token to use it later
  });
});

Cypress.Commands.add('getRequest', (url, headers = {}) => {
  cy.request({
    method: 'GET',
    url: url,
    headers: headers
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add('postRequest', (url, requestBody, headers = {}) => {
  cy.request({
    method: 'POST',
    url: url,
    body: requestBody,
    headers: headers,
    failOnStatusCode: false
  }).then((response) => {
    return response;
  });
});

