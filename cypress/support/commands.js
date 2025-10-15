// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('stepNotImplemented', () => { 
  console.log('O step não foi implementado!');
  cy.log('O step não foi implementado!');
});

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

Cypress.Commands.add('acessar_dominio_externo', (site, sent_args = {}) => {
  return cy.origin(site, { args: sent_args }, ({ sent_args }) => {
    cy.visit('/');
  });
});

Cypress.Commands.add('setupAmbienteTeste', () => {
  cy.window().then((win) => {
    win.performance?.setResourceTimingBufferSize?.(0);
    win.gc && win.gc();

    Cypress.automation('remote:debugger:protocol', {
      command: 'Network.clearBrowserCache',
      params: {}
    });
  });
});

Cypress.Commands.add('setupAmbienteBefore', () => {
  Cypress.session.clearAllSavedSessions();
  cy.clearAllSessionStorage();
  cy.clearCookies();
  cy.clearLocalStorage();
});