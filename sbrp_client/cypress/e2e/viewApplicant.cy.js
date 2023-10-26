/// <reference types="Cypress" />

// Copilot-assisted

describe('test applicant details', () => {
    // get the applicant details
    // before test spec
    beforeEach(() => {
        cy.login();
    })

    const application = require('../fixtures/applications_detail.json')

    it('should see applicant details', () => {
        // visit the applicant page
        cy
        .visit('/applications/3')
        .contains(application.staff_name)
        
        cy
        .contains(application.staff_id)

    })
    // find accordion component and click on it
    it('should see accordion component with correct listing details', () => {
        cy.visit('/applications/3')
        // get first accordion item bootstrap
        cy
        .get('.accordion-item').first().click({force: true})
        
        cy.contains(application.role_listing.role_name)
        cy.contains(application.role_listing.country)
        cy.contains(application.role_listing.manager_name)
        cy.contains(application.role_listing.role_desc)

    })

    
    it('should show self-description', () => {
        cy.visit('/applications/3')
        cy
        .contains(application.app_desc.slice(0, 100))
    })

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