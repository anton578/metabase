describe('UI Test', () => {
  it('Ask Simple Question - From Sample Database', () => {
    // Login - would be nice to a common function
    cy.visit('/') 
    cy.get('[name=username]').type('test@me.com')
    cy.get('[name=password]').type('T3st1ng!')
    cy.get('button[type=submit]').click() 
    cy.contains('Home', { timeout: 10000 }).should('be.visible')
 
    cy.contains('New').should('be.visible').click()
    cy.contains('Question').click()

    //verify database
    cy.get('body').then((body) => {
      if (body.find('.Icon-search',{ timeout: 10000 }).length == 0) {
        cy.contains('Sample Database').click();
      }
    })
    cy.get('.List-section-title')
      .should('be.visible')
      .should('have.text', 'Sample Database')

    cy.get('.List-item-title').contains('Orders').click()
    cy.contains('Pick the metric you want to see').click()
    cy.contains('Count of rows').click()
    cy.contains('Visualize').click();

    //validate total orders count
    cy.get('h1.ScalarValue').should('have.text','18,760')

    cy.contains('Save').click()
    cy.get('.ModalHeader').should('have.text','Save question')
    cy.get('input[name=name]').clear().type('Total Orders')

    cy.get('.ModalBody button[type=submit]').should('have.text','Save').click()
    cy.contains('Yes please!').click()

    cy.contains('Create a new dashboard').click()
    cy.get('input[name=name]').clear().type('An awesome dashboard');
    cy.get('.ModalBody button[type=submit]').should('have.text','Create').click()
    
    cy.get('h2.mr1').should('have.text','An awesome dashboard')
   
    cy.get('h1.ScalarValue',{ timeout: 10000 }).should('be.visible').should('have.text','18,760')//has the results of "18,760" 
    cy.get('h3.Scalar-title', {timeout: 1000 }).should('be.visible').should('have.text','Total Orders')//be titled "Total Orders"
    cy.contains('Save').click() 


    cy.get('button[data-testid=sidebar-toggle-button]').click()
    cy.contains('Home').click()
    cy.contains('Our analytics').click()// I dont not see Click on "Browse all items", so decided to click analytics
    cy.contains('An awesome dashboard').click()
  })
})