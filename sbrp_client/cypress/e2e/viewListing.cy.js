/// <reference types="Cypress" />

describe('template spec', () => {
    // it('open select', () => {
    //   cy.visit('/listings/new');

    //   const roles = require('../fixtures/example')
    //   cy.get('input').type('cypress select input box');
    //   cy.get('.card-text').should("have.text", "Admin Role");

    // })
    //   const roles = require('../fixtures/role_skills');

    // AI-assisted test case
    const arr = ["Call Centre",
        "Call Centre",
        "Call Centre",
        "Call Centre",
        "Consultancy Director",
        "Consultant",
        "Consultant",
        "Consultant",
        "Developer",
        "Engineering Director",
        "Engineering Director",
        "Solutioning Director",]

    it("Tests that search feature filters the text by keyword", () => {
        cy.visit('/listings');
        arr.forEach(role => {
            cy.get('input[placeholder*="Search"]').clear().type(role);
            cy.get('table tbody tr').should('have.length', arr.filter(r => r === role).length);
        });
    })
})
