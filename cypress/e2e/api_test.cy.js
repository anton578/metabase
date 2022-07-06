import {v4 as uuidv4} from 'uuid';


describe('API Test', () => {
  it('First Time Setup', () => {
    cy.request('GET','/api/session/properties')//gets session
      .then( (resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.body).to.have.property('setup-token')
        let sampleReq = {
          "token":resp.body['setup-token'],
          "user":{
              "first_name":"test",
              "last_name":"me",
              "email":`test@me.com`,
              "site_name":"test",
              "password":"T3st1ng!",
              "password_confirm":"T3st1ng!"
          },
          "database":null,
          "invite":null,
          "prefs":{
              "site_name":
              "test",
              "site_locale":"en",
              "allow_tracking":"false" 
          }
        }
        cy.request({method:'POST', url:'/api/setup',body:sampleReq, failOnStatusCode:false})
         .then( (resp) => {
            if(resp.status === 403){
              expect(resp.body).to.contain("a user currently exists")
            }else{
              expect(resp.status).to.equal(200);//first userr created
            }
        })
      });
  })

  it('Manage User', () => {

    cy.request('POST','/api/session/',{"username":"test@me.com","password":"T3st1ng!"})//all a static for now
    .its('status').should('equal',200)//to verify session, no need to get the session id

    let numberOfUsers = 2;//can be set as env, or testdata for now static
    for (let i = 1; i <= numberOfUsers; i++) {
      let uuid = uuidv4();
      let sampleReq = { "first_name":`test${uuid}`, "last_name":"me", "email":`test${uuid}@me.com` }
      cy.request('POST','/api/user',sampleReq)
      .then( (user) => {
        expect(user.status).to.equal(200); // Expects user created, otherwise will fail the run.
        cy.log(user)
        cy.request('POST','/api/permissions/group',{name:`group_${uuidv4()}`})
        .then((group) => {
          cy.log(group)
          //if status 400 already exist
          expect(group.status).to.equal(200); // Expects user created, otherwise will fail the run.
          cy.request({method:'PUT',url:`/api/permissions/membership/${user.body.id}`,body:{id: group.body.id,is_group_manager:false}, failOnStatusCode:false})
           .then((membership) => {
            // returned 402 - Payment Required
            // expected 402 error: The group manager permissions functionality is only enabled if you have a premium token with the advanced-permissions feature.
            expect(membership.status).to.equal(402); // acccout is not premium user
            
           })
        });
      })
    }
    
  })
})
