/// <reference types="Cypress" />

const managers = require("../fixtures/managers.json").staffs

describe("test manager select", () => {
    beforeEach(() => {
        cy.login();
    })

    it("should open and see list of managers", () => {
        cy.visit("/listings/new");
        cy.get(".select__control")
            .contains("name or staff")
            .click({force: true});
            
        cy.get(".select__menu-list").as("manager-list")
            .children()
            .should("have.length", managers.length)

        managers.forEach((manager) => {
            cy.get("@manager-list")
            .should("contain", manager.staff_id)
        })
    })
})