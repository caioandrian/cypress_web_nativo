import '../../../support/auth_cognito';

describe('teste de sessão cognito', () => {
    before(() => {
        cy.setupAmbienteBefore();
    });

    beforeEach(() => {
        cy.setupAmbienteTeste();
    });

    it('exemplo de teste com cognito', () => {
        cy.loginByCognitoPreProd(
            Cypress.env("users").ead.aluno_teste_faap.email,
            Cypress.env("users").ead.aluno_teste_faap.senha
        );

        //sua ação e testes aqui
    })

    it('reutilizar sessão cognito', () => {
        //continuar usando a sessão do cognito anterior

        //sua ação e testes aqui
    })
})