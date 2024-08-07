const personId = crypto.randomUUID(); // Generate an ID to use as the personId
const tokenUrl = 'https://auth-api.sandbox.tuumplatform.com/api/v1/employees/authorise'; // URL to get the authentication token
const createAccountUrl = `/api/v4/persons/${personId}/accounts`; 
const authRequestBody = {
      "username": "modular.system",
      "password": "pass"
    };

    describe('Creat Account tests with minimal required request body', () => {
    
      beforeEach(() => {
        cy.postAndExtractToken(tokenUrl, authRequestBody); // Get token for requests
        cy.fixture('createAccount.json').as('requestBody'); // Load request body for requests
      });
    
      it('Validate account type code', function() {
        cy.get('@requestBody').then((requestBody) => {
          cy.get('@token').then((auth) => {
            cy.request({
              method: 'POST',
              url: createAccountUrl,
              body: requestBody,
              headers: {
                'Content-Type': 'application/json',
                'x-channel-code': 'SYSTEM',
                'x-tenant-code': 'MB',
                'x-auth-token': auth
              }
            }).then((response) => {
              expect(response.status).to.eq(200);
              expect(response.body.data.accountTypeCode).to.equal('CURRENCY');
            });
          });
        });
      });

      it('Validate account type code with an invalid value', function() {
        cy.get('@requestBody').then((requestBody) => {
          requestBody.accountTypeCode = 'NEW_CURRENCY'; // Update the accountTypeCode to an invalid value
          cy.get('@token').then((auth) => {
            cy.request({
              method: 'POST',
              url: createAccountUrl,
              body: requestBody,
              headers: {
                'Content-Type': 'application/json',
                'x-channel-code': 'SYSTEM',
                'x-tenant-code': 'MB',
                'x-auth-token': auth
              },
              failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status codes
            }).then((response) => {
              expect(response.status).to.eq(400);
              expect(response.body.errors).to.include('err.validationErrors');
            });
          });
        });
      });

      it('Validate person name', function() {
        cy.get('@requestBody').then((requestBody) => {
          requestBody.personName = 'Updated Name'; 
          cy.get('@token').then((auth) => {
            cy.request({
              method: 'POST',
              url: createAccountUrl,
              body: requestBody,
              headers: {
                'Content-Type': 'application/json',
                'x-channel-code': 'SYSTEM',
                'x-tenant-code': 'MB',
                'x-auth-token': auth
              }
            }).then((response) => {
              expect(response.status).to.eq(200);
              expect(response.body.data.personName).to.equal('Updated Name');
            });
          });
        });
      });

      it('Validate with missing person name', function() {
        cy.get('@requestBody').then((requestBody) => {
          delete requestBody.personName; 
          cy.get('@token').then((auth) => {
            cy.request({
              method: 'POST',
              url: createAccountUrl,
              body: requestBody,
              headers: {
                'Content-Type': 'application/json',
                'x-channel-code': 'SYSTEM',
                'x-tenant-code': 'MB',
                'x-auth-token': auth
              },
              failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status codes
            }).then((response) => {
              expect(response.status).to.eq(400);
              expect(response.body.errors).to.include('err.validationErrors');
            });
          });
        });
      });
    
    
    
      it('Fail when customerGroupCode is missing', function() {
        cy.get('@requestBody').then((requestBody) => {
          delete requestBody.customerGroupCode;
          cy.get('@token').then((auth) => {
            cy.request({
              method: 'POST',
              url: createAccountUrl,
              body: requestBody,
              headers: {
                'Content-Type': 'application/json',
                'x-channel-code': 'SYSTEM',
                'x-tenant-code': 'MB',
                'x-auth-token': auth
              },
              failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status codes
            }).then((response) => {
              expect(response.status).to.eq(400);
              expect(response.body.errors).to.include('err.accountCustomerGroupInvalid');
            });
          });
        });
      });

      it('Fail when customerGroupCode is invalid', function() {
        cy.get('@requestBody').then((requestBody) => {
          requestBody.customerGroupCode = 'GOLD';
          cy.get('@token').then((auth) => {
            cy.request({
              method: 'POST',
              url: createAccountUrl,
              body: requestBody,
              headers: {
                'Content-Type': 'application/json',
                'x-channel-code': 'SYSTEM',
                'x-tenant-code': 'MB',
                'x-auth-token': auth
              },
              failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status codes
            }).then((response) => {
              expect(response.status).to.eq(400);
              expect(response.body.errors).to.include('err.accountCustomerGroupInvalid');
            });
          });
        });
      });
    
      it('Fail when authentication token is missing', function() {
        cy.get('@requestBody').then((requestBody) => {
          cy.request({
            method: 'POST',
            url: createAccountUrl,
            body: requestBody,
            headers: {
              'Content-Type': 'application/json',
              'x-channel-code': 'SYSTEM',
              'x-tenant-code': 'MB'
            },
            failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status codes
          }).then((response) => {
            expect(response.status).to.eq(401); 
          });
        });
      });
    });
    