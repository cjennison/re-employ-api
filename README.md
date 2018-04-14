
# Setup
1. Install node. (https://nodejs.org/en/)
2. Install Redis (`brew install redis` or http://redis.io/download)
3. Create a database for the application (ie. `re-employ_db`)
4. Run `npm install`
5. Add your database url to your environment variable  
`export DATABASE_URL=mysql://root:password@127.0.0.1:3306/re-employ_db`
6. Run `cp .env-default .env` and fill out gmail application credentials and 
database credentials.
7. Run `node_modules/.bin/sequelize db:migrate`
8. Run `npm start` to start the web server.

# Redis
Run `redis-server` in another tab.

# Jobs APIs
### Github Jobs (Tech Jobs) https://jobs.github.com/api
### USA Jobs (Government Jobs) https://search.gov/developer/jobs.html
Get a key at https://developer.usajobs.gov/APIRequest/Index
# Auth
For Auth we are using OKTA. Sign up at https://www.okta.com/.
In the developer dashboard select API and create a new token. Use this token in the `.env`.

# Developer Help
**I'm bad at CRON what do I do?**  
https://crontab.guru/

**How do I debug jobs?**  
Temporarily, uncomment the `DEBUG TEST JOB` under index.js.  
Alternatively set the CRON config to be a shorter time interval.