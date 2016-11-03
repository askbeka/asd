#!/usr/bin/env node

// CLI config
var argv = require('yargs')
    .usage('Usage $0 [options]')
    .alias('c', 'city')
    .describe('c', 'Set city')
    .alias('h', 'help')
    .describe('h', 'Show help')
    .help('h')
    .default('c', 'Krakow')
    .argv;

// Node version
var v = process.version;

// Get source for specific version
if (v >= '6.0.0') {
    var best = require('../lib/best-devs-6.js');
} else if (v >= '5.0.0') {
    best = require('../lib/best-devs-5.js');
} else if (v >= '4.0.0') {
    best = require('../lib/best-devs-4.js');
} else {
    best = require('../lib/best-devs.js');
}

best.get({city: argv.city});
