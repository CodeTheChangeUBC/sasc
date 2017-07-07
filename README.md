# sasc
Development repo for the SASC project. 

How to get the project running:

To install dependencies, inside the sasc folder run
``` 
npm install
```

When working on a major functionality for the project that has a chance of breaking everyone else's work, please create your own branch and work on your part there.

To create a branch use
```
git branch your-branch-name
```

To switch to the branch you have just created use
```
git checkout your-branch-name
```

To check which branch you are working on use
```
git branch
```

To push changes to your branch use
```
git push origin your-branch-name
```

When you are ready to merge your branch with master, please create a pull request so someone can review your code before it gets merged with master.

#### (Local) DB Setup ####

Ensure you have postgres installed locally. (`brew install postgresql` with homebrew). Create the development table sasc_dev_db with 
```
createdb sasc_dev_db
```
_Note_: Postgres should be running for this to work. 

Now create a user sasc which will be in control of this table. Enter the postgres CLI with `psql postgres` (you may need `sudo psql postgres`). From here, run
```
CREATE ROLE sasc WITH LOGIN;
```
```
ALTER ROLE sasc CREATEDB;
``` 
Type `\du` to see a list of users if you'd like, then quit with `\q`. You can try skipping the whole process of interfacing with postgres by running `createuser sasc --createdb`. I haven't tried this. 

Make sure you've run an `npm install` so that sequelize is installed, and then run a migration:
```
sequelize db:migrate
```
You should be good to go!

