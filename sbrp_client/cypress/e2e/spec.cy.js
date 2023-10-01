/// <reference types="Cypress" />

describe('template spec', () => {
  it('open select', () => {
    cy.visit('/listings/new');
    cy.get('.select__indicator').click();

    cy.contains("Admin").click();
    expect(cy.get('.card-text'))
    cy.get('.select__indicator').click();

    cy.contains(".option", "Admin").click();
    cy.get('.card-text').should("have.text", "Admin Role");

  })
})