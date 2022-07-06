# Metabase Take Home Cypress test with Github Actions

Implemented the following:
- Task 1 
- Task 2 - Completed except:  /api/permissions/membership endpoint as it gave me the 402 Error. 
    and the Documentation seems off for https://github.com/metabase/metabase/blob/master/docs/api/setup.md.
    I just tracked down the network logs and used the parameters there.
- Task 3(Local run only-that need to set proper ENV by default it is Localhost but not working on my end)
- Bonus:
    * Using GitHub Actions setup in your repository to run Cypress tests on every commit and at midnight.

Requirement:

- To run locally: 
    - Need to have a fresh metabase container running
    - Need to have a sample mongodb running
    - due to some issue I cannot add MongoDB database directly to localhost
        * I was able to add the mongoDB with localhost via MongoDB Compass(UI Client) but not in metabase with the same creds given, tried inputing both via fields and directly putting on the connection strings.
        * I thought that maybe its a machine issue i have, so used a different machine and still did not work, although diogo showed me it is working on his end, so I am not sure. also used 4.0 and 5.0 sample image but they both act the same.
        # WORKAROUND
        * workaround on my end was to get directly the containers IP address instead of localhost and add them as the HOST when adding the DB, and it worked and created the script. 
        
    - make sure you pass in the correct host in the cypress ENV to run the integration part properly(LOCALLY).
     

NOTE: 
- unfortunately when running in the github actions, MongoDB Container Host localhost dont seem to work either, I tried adding the db to service, or a separatedocker image running along side metabase, but it still failed, only API and the UI test passed. but DB Itegration test will fail.
- didnt have the time to tidy up the scripts since was debugging more on the issue, and already pass the 3hours expected work required for this, so I will be sending out the script that is fully working locally.
