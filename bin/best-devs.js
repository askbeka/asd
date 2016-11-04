#!/usr/bin/env node

// CLI config
var argv = require('yargs')
  .usage('Usage: $0 <city> [,options]')
  .command("city", 'City', {alias: 'city'})
  .required( 1, "City is required" )
  .option('u', {alias: 'username', type: 'string', describe: 'Username'})
  .option('p', {alias: 'password', type: 'string', describe: 'Password'})
  .option('l', {alias: 'language', type: 'string', describe: 'Language', default: 'javascript'})
  .option('t', {alias: 'top', type: 'number', describe: 'Top', default: 3})
  .help('h')
  .alias('h', 'help')
  .argv;

// Node version
var v = parseInt(process.versions.node.split('.').shift());

if (v < 4) {
    v = 0;
}

  // Get source for specific version
var best = require('../lib/best-devs-' + v + '.js').default;

argv.city = argv._[0];

best(argv);
