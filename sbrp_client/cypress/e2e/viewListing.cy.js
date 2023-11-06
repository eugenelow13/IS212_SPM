/// <reference types="Cypress" />

describe('template spec', () => {
    beforeEach(() => {
        cy.login();
    })
    // it('open select', () => {
    //   cy.visit('/listings/new');

    //   const roles = require('../fixtures/example')
    //   cy.get('input').type('cypress select input box');
    //   cy.get('.card-text').should("have.text", "Admin Role");

    // })
    //   const roles = require('../fixtures/role_skills');

    // AI-assisted test case
    const arr = ["Call Centre",
        "Consultancy Director",
        "Consultant"]

    it("Tests that search feature filters the text by keyword", () => {
        cy.visit('/listings');
        arr.forEach(role => {
            cy.get('input[placeholder*="Search"]').clear().type(role);
            cy.get('table tbody tr').should('have.length', arr.filter(r => r === role).length);
        });
    })

    it("Tests that sorting by role-skill match works", () => {
        cy.visit("/listings")
        // get 6th td element of each row
        cy.contains("Skill Match").click()

        const sortedArr = ["14%", "18%", "25%"];
        cy.get('table tbody tr td:nth-child(6)').each((td, i) => {
            // get text of td
            cy.wrap(td).should('have.text', sortedArr[i])
        })

        cy.contains("Skill Match").click()

        cy.get('table tbody tr td:nth-child(6)').each((td, i) => {
            // get text of td
            // check if text is in array
            cy.wrap(td).should('have.text', sortedArr.reverse()[i])
        })


    })
})
