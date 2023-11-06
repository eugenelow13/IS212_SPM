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
Cypress.Commands.add('login', () => {
    cy.visit('/')
    cy.get('.select__control')
    .type('Benjamin Teo');
    
    cy.get('.select__menu').contains('Benjamin Teo').click();
})

Cypress.Commands.add('getAcquiredSkills', (staffSkills, roleSkills) => {
    return staffSkills.filter(skill => skill in roleSkills)
})

Cypress.Commands.add('getLackingSkills', (staffSkills, roleSkills) => {
    return roleSkills.filter(skill => !(skill in staffSkills))
})
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