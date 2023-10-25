/// <reference types="Cypress" />

describe('test applicant details', () => {
    // find accordion component and click on it
    it('open accordion', () => {
        // for application 1 to 5
        for (let i = 1; i <= 5; i++) {
            cy.visit('/applications/' + i);
            cy.get('.accordion').click();

        }
    })
})