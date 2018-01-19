import { Router } from 'express';
import fs from 'fs';

const router = new Router();
const routeFiles = fs.readdirSync(__dirname).filter(filename => filename !== 'index.js');

routeFiles.forEach(routeFile => {
  const route = require(`./${routeFile}`);
  route(router);
});

module.exports = router;
