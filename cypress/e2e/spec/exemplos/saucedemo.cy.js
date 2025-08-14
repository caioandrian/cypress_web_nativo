/// <reference types="cypress" />

describe('SauceDemo - Ecommerce', () => {
  var array_carrinho = []

  beforeEach(() => {
    array_carrinho = []
    cy.visit(Cypress.env("saucedemo"))
    cy.get("[data-test='username']").type(Cypress.env('users').saucedemo.username)
    cy.get("[data-test='password']").type(Cypress.env('users').saucedemo.senha)
    cy.get("[data-test='login-button']").click()
  })

  it('Adicionar 2 produtos no carrinho pela home', () => {
    let dados_produto = {}

    // adiciona o primeiro produto
    cy.get(".pricebar button").eq(2).click()
    cy.get('.pricebar button').eq(2).should('have.text', 'Remove');

    cy.get('.inventory_item_name').eq(2).should('be.visible').invoke('text')
      .then((titulo) =>{
        dados_produto.titulo = titulo
      })
    cy.get('.inventory_item_description .pricebar .inventory_item_price').invoke('text')
      .then((preco) =>{
        dados_produto.preco = preco
      })

    array_carrinho.push(dados_produto)

    // adiciona o segundo produto
    cy.get(".pricebar button").eq(3).click()
    cy.get('.pricebar button').eq(3).should('have.text', 'Remove');

    cy.get('.inventory_item_name').eq(3).should('be.visible').invoke('text')
      .then((titulo) =>{
        dados_produto.titulo = titulo
      })

    cy.get('.inventory_item_description .pricebar .inventory_item_price').eq(3).invoke('text')
      .then((preco) =>{
        dados_produto.preco = preco
      })

    array_carrinho.push(dados_produto)
    
    // valida quantidade de produtos no ícone do carrinho
    if(array_carrinho.length >= 1)
      cy.get('.shopping_cart_badge').should('have.text', array_carrinho.length)
    else
      cy.get('.shopping_cart_badge').should('not.exist')
  })

  it('Remover produto do carrinho pela home', () => {
    cy.get(".pricebar button").eq(2).click()
    cy.get('.pricebar button').eq(2).should('have.text', 'Remove');
    cy.get(".pricebar button").eq(2).click()
    cy.get('.shopping_cart_badge').should('not.exist')
  })

  it('Finalizar pedido com sucesso', () => {
    let dados_produto = {}

    // adiciona produto
    cy.get(".pricebar button").eq(3).click()
    cy.get('.inventory_item_name').eq(3).should('be.visible').invoke('text')
      .then((titulo) =>{
        dados_produto.titulo = titulo
      })

    cy.get('.inventory_item_description .pricebar .inventory_item_price').eq(3).invoke('text')
      .then((preco) =>{
        dados_produto.preco = preco
      })

    array_carrinho.push(dados_produto)
    console.log(array_carrinho)

    //ir para carrinho
    cy.get("[data-test='shopping-cart-link']").click()
      .then(() => {
        //valida produtos no carrinho
        array_carrinho.forEach( (obj, index) => {
          console.log(obj.titulo)
          cy.get(".inventory_item_name").eq(index).should('have.text', obj.titulo)
          cy.get('[data-test="inventory-item-price"]').eq(index).should('have.text', obj.preco)
        });
      })

    //ir para checkout
    cy.get("[data-test='checkout']").click()

    //preencher dados pessoais
    cy.get('[data-test="firstName"]').type('Caio')
    cy.get('[data-test="lastName"]').type('QA')
    cy.get('[data-test="postalCode"]').type('1234567')
    
    //ir para resumo da compra
    cy.get('[data-test="continue"]').click().then(() => {
      //valida produtos no resumo da compra
      array_carrinho.forEach( (obj, index) => {
        cy.get('.cart_item_label').should('have.length', array_carrinho.length)
        cy.get(".inventory_item_name").eq(index).should('have.text', obj.titulo)
        cy.get('[data-test="inventory-item-price"]').eq(index).should('have.text', obj.preco)
        cy.get('.cart_item_label').should('not.be.empty')
        cy.get('.summary_subtotal_label').should('not.be.empty')
        cy.get('.summary_tax_label').should('not.be.empty')
        cy.get('.summary_total_label').should('not.be.empty')
      });
    })

    //finaliza a compra
    cy.get('[data-test="finish"]').click()

    //valida tela de pedido finalizado
    cy.contains("Thank you for your order!").should('be.visible',);
    cy.get("[data-test='back-to-products']").should('be.visible')
  })
})
