
const personId = crypto.randomUUID(); // Generate an ID to use as the personId
const tokenUrl = 'https://auth-api.sandbox.tuumplatform.com/api/v1/employees/authorise'; // URL to get the authentication token
const createAccountUrl = `/api/v4/persons/${personId}/accounts`; // the URL to create account
const authRequestBody = {
      "username": "modular.system",
      "password": "pass"
    };

describe('Check and update account balances', () => {

  beforeEach(() => {
    cy.postAndExtractToken(tokenUrl, authRequestBody); // Get token for requests
    cy.fixture('createAccount.json').as('requestBody'); // Load body for create account requests
    cy.fixture('createTransaction.json').as('transactionRequestBody'); // Load body for create transaction requests 
  });

  it('Create account and check balance', function() {
    cy.get('@requestBody').then((requestBody) => {
      cy.get('@token').then((auth) => {
        cy.postRequest(createAccountUrl, requestBody, {
          'x-channel-code': 'SYSTEM',
          'x-tenant-code': 'MB',
          'x-auth-token': auth
        }).then((response) => {
          expect(response.status).to.eq(200);
          

          // Extract account ID from the response
          const accountId = response.body.data.accountId; 

          // The URL for checking account balance
          const checkBalanceUrl = `/api/v1/accounts/${accountId}/balances`;

          // Send a GET request to check the account balance
        
          cy.getRequest(checkBalanceUrl, {
            'x-channel-code': 'SYSTEM',
            'x-tenant-code': 'MB',
            'x-auth-token': auth
          }).then((balanceResponse) => {
            expect(balanceResponse.status).to.eq(200);
            expect(balanceResponse.body).to.have.property('data');
            expect(balanceResponse.body.data[0]).to.have.property('balanceAmount');
            expect(balanceResponse.body.data[0].balanceAmount).to.equal(0);
          });
        });
      });
    });
  });

  it('Check balance for a random account ID', function() {
    const randomAccountId = 'aaaa-aaaa-aa'; // Use an ID that wouldn't exist
    const checkBalanceUrl = `/api/v1/accounts/${randomAccountId}/balances`;

    cy.get('@token').then((auth) => {
      cy.getRequest(checkBalanceUrl, {
        'x-channel-code': 'SYSTEM',
        'x-tenant-code': 'MB',
        'x-auth-token': auth
      }).then((balanceResponse) => {
        expect(balanceResponse.status).to.eq(200);
        expect(balanceResponse.body).to.have.property('data');
        expect(balanceResponse.body.data[0]).to.be.undefined;
      });
    });
  });

  it('Create account, create transaction, and check balance', function() {
    cy.get('@requestBody').then((requestBody) => {
      cy.get('@token').then((auth) => {
        cy.postRequest(createAccountUrl, requestBody, {
          'x-channel-code': 'SYSTEM',
          'x-tenant-code': 'MB',
          'x-auth-token': auth
        }).then((response) => {
          expect(response.status).to.eq(200);

          // Extract account ID from the response
          const accountId = response.body.data.accountId; 
          // The URL for creating a transaction
          const createTransactionUrl = `/api/v5/accounts/${accountId}/transactions`;

          // Load the transaction request body from the fixture
          cy.get('@transactionRequestBody').then((transactionRequestBody) => {
            // Create the transaction
            cy.postRequest(createTransactionUrl, transactionRequestBody, {
              'x-channel-code': 'SYSTEM',
              'x-tenant-code': 'MB',
              'x-auth-token': auth
            }).then((transactionResponse) => {
              expect(transactionResponse.status).to.eq(200);

              // The URL for checking account balance
              const checkBalanceUrl = `/api/v1/accounts/${accountId}/balances`;

              // Send a GET request to check the account balance
              cy.getRequest(checkBalanceUrl, {
                'x-channel-code': 'SYSTEM',
                'x-tenant-code': 'MB',
                'x-auth-token': auth
              }).then((balanceResponse) => {
                expect(balanceResponse.status).to.eq(200);
                expect(balanceResponse.body).to.have.property('data');
                expect(balanceResponse.body.data[0]).to.have.property('balanceAmount');
                // Confirm the balance updated
                expect(balanceResponse.body.data[0].balanceAmount).to.not.equal(0);
              });
            });
          });
        });
      });
    });
  });

  
})