/// <reference types="Cypress" />

import RoleSelect from '../../src/pages/createListing/components/RoleSelect';

describe('template spec', () => {
  // it('open select', () => {
  //   cy.visit('/listings/new');

  //   const roles = require('../fixtures/example')
  //   cy.get('input').type('cypress select input box');
  //   cy.get('.card-text').should("have.text", "Admin Role");

  // })
  const roles = require('../fixtures/role_skills');

  cy.mount(<RoleSelect roles={roles} />);

  it("opens select manager id and sees ", () => {
    cy.get('input').type('manager');
    cy.get('.card-text').should("have.text", "Manager Role");

  })
})