#!/usr/bin/env node
var program = require('commander');
var chalk = require('chalk');

program
  .version('1.0.0')
  .description('A command-line tool for generating API easily')
  .option('-f, --framework <framework>', 'the web framework name')
  .option('-e, --endpoints <endpoints>', 'list of API endpoints (separated by comma)')
  .option('-F, --inputfile [filepath]', 'path to input file contain endpoints and methods')
  .option('-m, --methods <methods>', 'list of methods accordingly to endpoints')
  .parse(process.argv)

if (program.framework) {
  if (program.framework === 'laravel') {
    // Insert your code in here Yogi
  } else if (program.framework === 'ruby on rails') {
    // This is Wanda's part
  } else {
    // Insert your code in here Ivan
  }
} else {
  console.error(chalk.red('Framework name is required'));
}