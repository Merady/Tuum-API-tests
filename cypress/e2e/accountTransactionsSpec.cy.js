describe('Transaction Tests', () => {
  const personId = crypto.randomUUID(); // Generate an ID to use as the personId
  const tokenUrl = 'https://auth-api.sandbox.tuumplatform.com/api/v1/employees/authorise'; // URL to get the authentication token 
  const createAccountUrl = `api/v4/persons/${personId}/accounts`; 
  const transactionDate = "2024-08-07";
  const authRequestBody = {
    "username": "modular.system",
    "password": "pass"
  };

  let accountId;

  beforeEach(() => {
    cy.postAndExtractToken(tokenUrl, authRequestBody);
    cy.fixture('createAccount.json').as('requestBody');
    cy.fixture('createTransaction.json').as('transactionRequestBody');
    cy.get('@requestBody').then((requestBody) => {
      cy.get('@token').then((auth) => {
        cy.postRequest(createAccountUrl, requestBody, {
          'x-channel-code': 'SYSTEM',
          'x-tenant-code': 'MB',
          'x-auth-token': auth
        }).then((response) => {
          expect(response.status).to.eq(200);
          accountId = response.body.data.accountId;
        });
      });
    });
  });


  it('Create transaction with all required fields', function() {
    cy.get('@transactionRequestBody').then((transactionRequestBody) => {
      cy.get('@token').then((auth) => {
        const createTransactionUrl = `/api/v4/accounts/${accountId}/transactions`
        cy.postRequest(createTransactionUrl, transactionRequestBody, {
          'x-channel-code': 'SYSTEM',
          'x-tenant-code': 'MB',
          'x-auth-token': auth
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });

  it('Create transaction with different transactionTypeCode', function() {
    cy.get('@transactionRequestBody').then((transactionRequestBody) => {
      transactionRequestBody.transactionTypeCode = 'CARD_CREDIT';

      cy.get('@token').then((auth) => {
        const createTransactionUrl = `/api/v4/accounts/${accountId}/transactions`
        cy.postRequest(createTransactionUrl, transactionRequestBody, {
          'x-channel-code': 'SYSTEM',
          'x-tenant-code': 'MB',
          'x-auth-token': auth
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });

  it('Create transaction with different money amount', function() {
    cy.get('@transactionRequestBody').then((transactionRequestBody) => {
      transactionRequestBody.money.amount = 100.00;

      cy.get('@token').then((auth) => {
        const createTransactionUrl = `/api/v4/accounts/${accountId}/transactions`
        cy.postRequest(createTransactionUrl, transactionRequestBody, {
          'x-channel-code': 'SYSTEM',
          'x-tenant-code': 'MB',
          'x-auth-token': auth
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });

  it('Create transaction with different currencyCode', function() {
    cy.get('@transactionRequestBody').then((transactionRequestBody) => {
      transactionRequestBody.money.currencyCode = 'USD';

      cy.get('@token').then((auth) => {
        const createTransactionUrl = `/api/v4/accounts/${accountId}/transactions`
        cy.postRequest(createTransactionUrl, transactionRequestBody, {
          'x-channel-code': 'SYSTEM',
          'x-tenant-code': 'MB',
          'x-auth-token': auth
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });

  it('Create transaction with different details', function() {
    cy.get('@transactionRequestBody').then((transactionRequestBody) => {
      transactionRequestBody.details = 'Card purchase - New phone purchase';

      cy.get('@token').then((auth) => {
        const createTransactionUrl = `/api/v4/accounts/${accountId}/transactions`
        cy.postRequest(createTransactionUrl, transactionRequestBody, {
          'x-channel-code': 'SYSTEM',
          'x-tenant-code': 'MB',
          'x-auth-token': auth
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });

  it('Create transaction with different referenceNumber', function() {
    cy.get('@transactionRequestBody').then((transactionRequestBody) => {
      transactionRequestBody.referenceNumber = 'CT20230607';

      cy.get('@token').then((auth) => {
        const createTransactionUrl = `/api/v4/accounts/${accountId}/transactions`
        cy.postRequest(createTransactionUrl, transactionRequestBody, {
          'x-channel-code': 'SYSTEM',
          'x-tenant-code': 'MB',
          'x-auth-token': auth
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });

  // Negative Test Cases
  it('Fail when transactionTypeCode is missing', function() {
    cy.get('@transactionRequestBody').then((transactionRequestBody) => {
      delete transactionRequestBody.transactionTypeCode;

      cy.get('@token').then((auth) => {
        const createTransactionUrl = `/api/v4/accounts/${accountId}/transactions`
        cy.postRequest(createTransactionUrl, transactionRequestBody, {
          'x-channel-code': 'SYSTEM',
          'x-tenant-code': 'MB',
          'x-auth-token': auth,
          
        }, false).then((response) => {
          expect(response.status).to.eq(400);
        });
      });
    });
  });

  it('Fail when money object is missing', function() {
    cy.get('@transactionRequestBody').then((transactionRequestBody) => {
      delete transactionRequestBody.money;

      cy.get('@token').then((auth) => {
        const createTransactionUrl = `/api/v4/accounts/${accountId}/transactions`
        cy.postRequest(createTransactionUrl, transactionRequestBody, {
          'x-channel-code': 'SYSTEM',
          'x-tenant-code': 'MB',
          'x-auth-token': auth
        }, false).then((response) => {
          expect(response.status).to.eq(400);
        });
      });
    });
  });

  it('Fail when amount in money is missing', function() {
    cy.get('@transactionRequestBody').then((transactionRequestBody) => {
      delete transactionRequestBody.money.amount;

      cy.get('@token').then((auth) => {
        const createTransactionUrl = `/api/v4/accounts/${accountId}/transactions`
        cy.postRequest(createTransactionUrl, transactionRequestBody, {
          'x-channel-code': 'SYSTEM',
          'x-tenant-code': 'MB',
          'x-auth-token': auth
        }, false).then((response) => {
          expect(response.status).to.eq(400);
        });
      });
    });
  });

  it('Fail when currencyCode in money is missing', function() {
    cy.get('@transactionRequestBody').then((transactionRequestBody) => {
      delete transactionRequestBody.money.currencyCode;

      cy.get('@token').then((auth) => {
        const createTransactionUrl = `/api/v4/accounts/${accountId}/transactions`
        cy.postRequest(createTransactionUrl, transactionRequestBody, {
          'x-channel-code': 'SYSTEM',
          'x-tenant-code': 'MB',
          'x-auth-token': auth
        }, false).then((response) => {
          expect(response.status).to.eq(400);
        });
      });
    });
  });

  it('Fail when transactionTypeCode is invalid', function() {
    cy.get('@transactionRequestBody').then((transactionRequestBody) => {
      transactionRequestBody.transactionTypeCode = '';

      cy.get('@token').then((auth) => {
        const createTransactionUrl = `/api/v4/accounts/${accountId}/transactions`
        cy.postRequest(createTransactionUrl, transactionRequestBody, {
          'x-channel-code': 'SYSTEM',
          'x-tenant-code': 'MB',
          'x-auth-token': auth
        }, false).then((response) => {
          expect(response.status).to.eq(400);
        });
      });
    });
  });

  it('Fail when amount is invalid', function() {
    cy.get('@transactionRequestBody').then((transactionRequestBody) => {
      transactionRequestBody.money.amount = -1;

      cy.get('@token').then((auth) => {
        const createTransactionUrl = `/api/v4/accounts/${accountId}/transactions`
        cy.postRequest(createTransactionUrl, transactionRequestBody, {
          'x-channel-code': 'SYSTEM',
          'x-tenant-code': 'MB',
          'x-auth-token': auth
        }, false).then((response) => {
          expect(response.status).to.eq(400);
        });
      });
    });
  });

  it('Fail when currencyCode is invalid', function() {
    cy.get('@transactionRequestBody').then((transactionRequestBody) => {
      transactionRequestBody.money.currencyCode = 'INVALID';

      cy.get('@token').then((auth) => {
        const createTransactionUrl = `/api/v4/accounts/${accountId}/transactions`
        cy.postRequest(createTransactionUrl, transactionRequestBody, {
          'x-channel-code': 'SYSTEM',
          'x-tenant-code': 'MB',
          'x-auth-token': auth
        }, false).then((response) => {
          expect(response.status).to.eq(400);
        });
      });
    });
  });

  it('Fail when valueDate is invalid', function() {
    cy.get('@transactionRequestBody').then((transactionRequestBody) => {
      transactionRequestBody.valueDate = 'invalid-date';

      cy.get('@token').then((auth) => {
        const createTransactionUrl = `/api/v4/accounts/${accountId}/transactions`
        cy.postRequest(createTransactionUrl, transactionRequestBody, {
          'x-channel-code': 'SYSTEM',
          'x-tenant-code': 'MB',
          'x-auth-token': auth
        }, false).then((response) => {
          expect(response.status).to.eq(400);
        });
      });
    });
  });


});
