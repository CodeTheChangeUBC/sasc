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

### (Local) DB Setup 
From the sasc project root directory, change your working directory to the commons folder:
```
cd commons
```
Ensure you have mysql installed locally. Create the development table sasc_dev_db by logging into mysql - `mysql -uroot` (`mysql -uroot -p` with password) - and then running
```
create database sasc_dev_db;
```
From here, create a user sasc which will have access to this db:
```
CREATE USER 'sasc'@'localhost';
```
And then give it the desired privileges: 
```
GRANT ALL PRIVILEGES
	-> ON sasc_dev_db.*
	-> TO 'sasc'@'localhost';
``` 
Now use the database:
```
use sasc_dev_db
```
Now pull the tables from scripts.sql into the application:
```
source scripts.sql
```
You should be good to go!

### Testing 

To run all tests: 
```
npm test
```

To test a specific feature (where tests for this feature are under `./test/<feature-name>/*`):
```
npm run-script test-<feature-name>
```
To run the specific test file `./test/<feature-name>/<test-name>.js`: 
``` 
mocha ./test/<feature-name>/<test-name>.js
```
