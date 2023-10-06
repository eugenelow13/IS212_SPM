import React from 'react'
import { useState } from 'react';
import ManagerSelect from './ManagerSelect'
import repManagerData from '../../../../cypress/fixtures/staffs'
import selector from '../../../../cypress/fixtures/selectors'

describe('<ManagerSelect />', () => {
  
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ManagerSelect repManagerData={repManagerData.staffs}/>)

  })  

  it(`Should expand the menu when expand icon is clicked in view`, () => {
    cy
      .mount(<ManagerSelect repManagerData={repManagerData.staffs}/>)
      // Menu is not yet open
      .get(selector.singleClearableSelect)
      .find(selector.menu)
      .should('not.exist')
      // A dropdown icon is shown
      .get(selector.singleBasicSelect)
      .find(selector.indicatorDropdown)
      .should('be.visible')
      // Click the icon to open the menu
      .click()
      .get(selector.singleBasicSelect)
      .find(selector.menu)
      .should('exist')
      .should('be.visible')
      .contains('jane doe');
  });

})