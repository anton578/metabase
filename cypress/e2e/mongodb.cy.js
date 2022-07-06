describe('Database Integration', () => {

  it('Add MongoDB to metabase', () => {
    // Login - would be nice to a common function
    cy.visit('/') 
    cy.get('[name=username]').type('test@me.com')
    cy.get('[name=password]').type('T3st1ng!')
    cy.get('button[type=submit]').click() 
    cy.contains('Home', { timeout: 10000 }).should('be.visible')

    //navigate to admin settings
    cy.get('.Icon-gear').should('be.visible').click()
    cy.contains('Admin settings').should('be.visible').click()

    cy.contains('Databases').should('be.visible').click()//clicks database top menu
    cy.contains('Add database').should('be.visible').click()// click add database

    //Setting all DB Connection field.
    cy.contains('PostgreSQL').should('be.visible').click()
    cy.get('.List-section').contains('MongoDB').click()
    cy.get('input[name=name]').clear().type("MongoDB Test")
    
    let host = Cypress.env('HOST')? Cypress.env('HOST') : "localhost";
    cy.task('log', 'current host:'+host)
    cy.get('input[name="details.host"]').clear().type(host)
    cy.get('input[name="details.port"]').clear().type("27017")
    cy.get('input[name="details.dbname"]').clear().type("sample")
    cy.get('input[name="details.user"]').clear().type("metabase")
    cy.get('input[name="details.pass"]').clear().type("metasample123")
    cy.get('input[name="details.authdb"]').clear().type("admin")
    
    cy.contains('Save').should('be.enabled').click()

    cy.contains('Explore sample data',{timeout:50000}).should('be.visible')
    cy.get('.Icon-close').click();
    
    cy.contains('Done!',{timeout:50000}).should('be.visible')
    cy.contains('Done!',{timeout:50000}).should('not.exist')
    cy.contains('MongoDB Test').should('be.visible')

    cy.contains('Exit admin').click()

  // })
  // **** multiple it seemed to break the session.**
  // it('Creates a native query', () => { 
    cy.contains('Home', { timeout: 10000 }).should('be.visible').click()

    cy.contains('New').should('be.visible').click()
    cy.contains('Native query').click()
    cy.contains('MongoDB Test').should('be.visible').click()
    cy.contains('Select a table').should('be.visible').click()
    cy.contains('Products').should('be.visible').click()

    cy.get('.ace_text-input').type("[{ $match: {{created_at}} }]",{force:true, parseSpecialCharSequences:false})
    cy.contains('Text').should('be.visible').click()
    cy.contains('Field Filter').should('be.visible').click()
    cy.get('h4.List-item-title').eq(2).click()
    cy.contains('Created At').should('be.visible').click()
    
    cy.get('input[type=checkbox]').click()
    cy.contains('Select a default value…').click();
    cy.get('button[data-testid="select-button"]').eq(2).click()
    cy.contains('2019').should('be.visible').click()
    cy.contains('January').should('be.visible').click()

    cy.contains('Save').click();

    cy.get('input[name=name]').clear().type("Date Filters")
    cy.get('.ModalBody button[type=submit]').should('have.text','Save').click()
    cy.contains('Yes please!').click()

    cy.contains('Create a new dashboard').click()
    cy.get('input[name=name]').clear().type('An awesome Date Filters');
    cy.get('.ModalBody button[type=submit]').should('have.text','Create').click()
    
    cy.get('h2.mr1').should('have.text','An awesome Date Filters')

    cy.get('.Icon-filter').click()
    cy.get('.Icon-calendar').should('be.visible').click()
    cy.contains('Month and Year').should('be.visible').click()
    cy.contains('Select…').should('be.visible').click()
    cy.contains('Created at').should('be.visible').click()
    cy.contains('Done').should('be.visible').click()
   
    cy.contains('Save').should('be.visible').click();

    cy.get('.Icon-calendar').should('be.visible').click()
    cy.get('button[data-testid="select-button"]').click()
    cy.contains('2017').should('be.visible').click()
    cy.contains('February').should('be.visible').click()
    
    cy.contains('February, 2017').should('be.visible').click()
    cy.contains('January').should('be.visible').click()
    
    cy.contains('75').should('be.visible')//75 records
  })
})