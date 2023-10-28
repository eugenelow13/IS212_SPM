/// <reference types="Cypress" />

// Copilot-assisted

describe('test applicant details', () => {
    // get the applicant details
    // before test spec
    beforeEach(() => {
        cy.login();
    })

    const application = require('../fixtures/applications_detail.json')

    it('should see applicant details (SCRUM 73-1)', () => {
        // visit the applicant page
        cy
            .visit('/applications/3')
            .contains(application.staff_name)

        cy
            .contains(application.staff_id)

        cy
            .contains(application.applicant.dept)

        cy
            .contains(application.applicant.country)

    })
    // find accordion component and click on it
    it('should see accordion component with correct listing details', () => {
        cy.visit('/applications/3')
        // get first accordion item bootstrap
        cy
            .get('.accordion-item').first().click({ force: true })

        cy.contains(application.role_listing.role_name)
        cy.contains(application.role_listing.country)
        cy.contains(application.role_listing.manager_name)
        cy.contains(application.role_listing.role_desc)

    })


    it('should show self-description (SCRUM-75)', () => {
        cy.visit('/applications/3')
        cy.get('.border.rounded-2.p-2')
            .should("contain.text", application.app_desc)
    })

    // it('should show be able to scroll when description is long', () => {
    //     cy.visit('/applications/3')
    //     cy.get('.modal-body > .border').last()
    //         // scroll to bottom of overflow text content in div
    //         .scrollTo('bottom')

    //         .should("contain.text", application.app_desc)

    // })

    const roleSkills = application.role_listing.role_skills
    const staffSkills = application.applicant.staff_skills

    const acquiredSkills = roleSkills.filter(skill => skill in staffSkills)
    const lackingSkills = roleSkills.filter(skill => !(skill in staffSkills))

    it('should have correct skills', () => {
        cy.visit("/applications/3")
        acquiredSkills.forEach(skill => {
            // contains skill and class is success badge
            cy.contains(skill).should('have.class', 'bg-success')
        })
        lackingSkills.forEach(skill => {
            cy.contains(skill).should('have.class', 'bg-secondary')
        })
    })


})