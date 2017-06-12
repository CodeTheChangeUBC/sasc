# sasc
Development repo for the SASC project. 

How to get the project running:

To install server dependencies, inside the sasc folder run
```    
npm install
```

To install client dependencies, from the sasc folder,
```
cd client
```
Then run
```
npm install
```

(frontend devs ignore this) If you are working on the backend and you need to set up the frontend build, inside the client folder, do
```
npm run build
```
This will create a build folder with the bundled js files so you can see the frontend.

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
