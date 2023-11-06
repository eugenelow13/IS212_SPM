/// <reference types="Cypress" />

describe('template spec', () => {
    beforeEach(() => {
        cy.login();
        // cy.intercept('GET', '/api/listings', { fixture: 'role_listings.json' })
        
        // cy.intercept filtered 
        
        cy.visit('/listings');
        cy.get('#custom-switch').click();

        // cy intercept api listings?open=true
        
    })
    // it('open select', () => {
    //   cy.visit('/listings/new');

    //   const roles = require('../fixtures/example')
    //   cy.get('input').type('cypress select input box');
    //   cy.get('.card-text').should("have.text", "Admin Role");

    // })
    //   const roles = require('../fixtures/role_skills');

    // AI-assisted test case
    const role_listings = require('../fixtures/role_listings.json').role_listings
    const arr = role_listings.map(role_listing => role_listing.role_name)

    it("checks at least one skill badge exists for each role", () => {
        // cy.visit('/listings');
        cy.get('table tbody tr').each((tr, i) => {
            cy.wrap(tr).click();
            cy.get('.badge').should('exist');
            cy.get('.badge').should('have.length.gte', 1);
            cy.contains('Close').click();
        })
    })

    it("Checks that table data is not empty and description displays (SCRUM-17)", () => {
        // cy.visit('/listings');
        
        const role_listings = require('../fixtures/role_listings.json').role_listings
        
        cy.get('select').select('Show 50').then(() => {
        role_listings.forEach(role_listing => {
            cy.get('table tbody tr').should('contain.text', role_listing.role_name);
        })
        })

        // sort by role name
        cy.wrap(role_listings).then((role_listings) => {
        
            role_listings.sort((a, b) => a.role_name.localeCompare(b.role_name))
            cy.get('table thead tr th:nth-child(1)').click()

            cy.get('table tbody tr').each((tr, i) => {
                cy.wrap(tr).find('td').as('tds')
                cy.get("@tds").should('have.length', 6)
                // first td
                cy.get("@tds").eq(0).should('contain.text', role_listings[i].role_name)

                // second td should not be empty
                cy.get("@tds").eq(1).should('not.be.empty');
                cy.get("@tds").eq(2).should('not.be.empty');
                cy.get("@tds").eq(3).should('not.be.empty');
                cy.get("@tds").eq(4).should('not.be.empty');

                cy.get("@tds").eq(5).should('contain.text', "%");

                cy.wrap(tr).click();
                cy.get('.modal-body').should('contain.text', role_listings[i].role_desc);
                cy.contains('Close').click();

            })
            // same length
            cy.get('table tbody tr').should('have.length', role_listings.length);
        })
    })

    it("Tests that search feature filters the text by keyword", () => {
        // cy.visit('/listings');
        arr.forEach(role => {
            cy.get('input[placeholder*="Search"]').clear().type(role);
            cy.get('table tbody tr').should('have.length', arr.filter(r => r.includes(role)).length);
        });
    })
    
    const today = new Date().toISOString().slice(0, 10)
    const open_role_listings = role_listings.filter(role_listing => role_listing.end_date > today)
    it("Able to filter out expired role listings", () => {
        cy.log(open_role_listings)
        cy.get('select').select('Show 50')

        cy.get('table tbody tr').should('have.length', role_listings.length);

        cy.get('input[type="checkbox"]').click().then(() => {
            cy.get('table tbody tr').should('have.length', open_role_listings.length);
        })
    
    })


    it("Tests that sorting by role-skill match works", () => {
        // cy.visit("/listings")
        // click show 50 in select
        cy.get('select').select('Show 50')

        // get 6th td element of each row

        const role_listings = require('../fixtures/role_listings.json').role_listings
        const role_skills = role_listings.map(role_listing => role_listing.role_skills)
        const benjaminSkills = require('../fixtures/benjamin_teo.json').staff_skills
        // cypress log

        const sortedArr = role_skills.map(role_skill_arr => {
            // get acquired skills
            const acquiredSkills = role_skill_arr.filter(skill => benjaminSkills.includes(skill))
            // get lacking skills
            const lackingSkills = role_skill_arr.filter(skill => !benjaminSkills.includes(skill))
            // calculate score
            const score = (acquiredSkills.length / (acquiredSkills.length + lackingSkills.length)) * 100
            return score.toFixed(0) + "%"
        })

        // sort strings in array
        cy.wrap(sortedArr).then((sortedArr) => {
            sortedArr.sort((a, b) => parseFloat(a) - parseFloat(b));

            cy.contains("Skill Match").click();

            cy.get('table tbody tr td:nth-child(6)').each((td, i) => {
                // get text of td
                cy.wrap(td).should('have.text', sortedArr[i]);
            });

        }).then(() => {
        cy.wrap(sortedArr).then(sortedArr => {
            sortedArr.sort((a, b) => parseFloat(b) - parseFloat(a));
            cy.contains("Skill Match").click();
            // cy wait 1s
            // sortedArr.reverse();
            cy.get('table tbody tr td:nth-child(6)').each((td, i) => {
                cy.wrap(td).should('have.text', sortedArr[i])
            })
        })
    })
    })

    // Assisted by copilot
    it("Tests that role-skill match score is displayed for every role", () => {
        // cy.visit("/listings")
        cy.get("table tbody tr td:nth-child(6)").each((td) => {
            cy.wrap(td).should('not.have.text', 'NaN');
            cy.wrap(td).should('contain.text', '%')
            
            cy.wrap(td).invoke('text').then(parseFloat).should('be.gte', 0);
            cy.wrap(td).invoke('text').then(parseFloat).should('be.lte', 100);
        })
    })


})
