/// <reference types="Cypress" />

describe("test manager select", () => {
    beforeEach(() => {
        cy.login();
    })

    it("should open and see list of managers", () => {
        cy.visit("/listings/new");
        cy.get(".select__control").click();
        
    })