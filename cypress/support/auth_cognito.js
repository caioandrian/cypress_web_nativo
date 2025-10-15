// Amazon Cognito
const loginToCognitoPreProd = (username, password) => {
  Cypress.log({
    displayName: 'COGNITO LOGIN',
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false,
  });

  cy.url().should('include', '.auth.us-east-1.amazoncognito.com');
  cy.url().then((url) => {
    const cognitoUrl = new URL(url);
    
    cy.origin(
      cognitoUrl.origin,
      {
        args: {
          username,
          password,
        },
      },
      ({ username, password }) => {
        cy.contains('Sign in with your email and password', { timeout: 10000 });
        
        cy.get('#signInFormUsername').type(username, { force: true });
        cy.get('#signInFormPassword').type(password, {
          force: true,
          log: false,
        });
        
        cy.get('input[name="signInSubmitButton"]').eq(1).click({ force: true });
      }
    );
  });

  cy.wait(5000);
  cy.url().should('include', 'seu site aqui');
};

Cypress.Commands.add('loginByCognitoPreProd', (username, password) => {
  const args = { username, password };
  
  cy.session(
    args, 
    () => {
      const loginUrl = Cypress.env("seu site aqui");
      
      cy.log('Iniciando processo de autenticação Cognito...');
      
      cy.visit(`${loginUrl}/login`);
      
      cy.wait(2000);
      
      cy.get('body').then(($body) => {
        cy.xpath("//span[text()='Ok']//ancestor::button")
          .should('be.visible')
          .click({ force: true });
        cy.wait(500);
      });
      
      cy.get('button').contains('Entrar').should('be.visible').click();
      cy.url().should('include', '.auth.us-east-1.amazoncognito.com', { timeout: 10000 });
      loginToCognitoPreProd(username, password);

      cy.log('... clicando no botão de login com Cognito...');
      cy.wait(1000);
      cy.contains('Sign in with Cognito').should('be.visible').click({ force: true });
      cy.wait(1000);

      cy.log('🔍 Verificando cookies Cognito...');
        cy.getCookies().should('not.be.empty')
          .then((cookies) => {
            const authCookies = cookies.filter(cookie => 
              cookie.name.includes('CognitoIdentityServiceProvider') ||
              cookie.name.includes('next-auth')
            );
            expect(authCookies.length).to.be.at.least(1, 'Deve haver pelo menos um cookie de autenticação');
          });
      });
    },
    {
      validate() {
        cy.origin('https://seu site aqui', () => {
          cy.getCookies().should('not.be.empty')
            .then((cookies) => {
              const authCookies = cookies.filter(cookie => 
                cookie.name.includes('CognitoIdentityServiceProvider') ||
                cookie.name.includes('next-auth')
              );
              expect(authCookies.length).to.be.at.least(1, 'Deve haver pelo menos um cookie de autenticação');
            });
        });
      },
      cacheAcrossSpecs: true
    }
  );
