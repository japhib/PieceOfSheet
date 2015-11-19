## Installation

### prerequisites
- install [node](https://nodejs.org/) 
    + If you use an older version of node than the releases on their site, no guarantees on whether anything will work.
- install [mongodb](https://www.mongodb.org/) 
    - you can start it (on Linux) using `sudo service mongod start` (*without a b on the end of `mongod`*)
    - I think if you installed it using brew on a mac, you can run `brew services start mongodb`.

- clone the repo
- from inside express-react-demo, run `sudo npm install`
- `sudo npm install -g webpack`
- `sudo npm install -g supervisor`
- `npm start` from the project root to run your server. This works because I've defined a start script in the `package.json` file.
- `cd public/js && webpack -w` to start webpack
- Access it at [localhost:3000](http://localhost:3000)

## Troubleshooting
- `module not found` errors mean you need to `npm install` that module
- EACCESS errors mean you need to use sudo
- ECONNREFUSED might mean you don't have mongo installed and running.
