#!/usr/bin/env node
var program = require('commander');
var chalk = require('chalk');
var fs = require('fs');

program
  .version('1.0.0')
  .description('A command-line tool for generating API boilerplate easily')
  .option('-f, --framework <framework>', 'the web framework name')
  .option('-e, --endpoints <endpoints>', 'list of API endpoints (separated by comma)')
  .option('-m, --methods <methods>', 'list of methods accordingly to endpoints')
  .parse(process.argv);

if (process.argv.length < 8 || process.argv.length > 8) {
  console.error(chalk.red('All arguments are required'));
  process.exit();
}

if (program.framework) {
  if (program.framework !== 'laravel' && program.framework !== 'flask' && program.framework !== 'rails') {
    console.error(chalk.red('That framework currently not supported'));
    process.exit();
  }

  var endpoints = program.endpoints.replace(/ /g,'').split(',');
  var methods = program.methods.replace(/ /g,'').split(',');

  if (program.framework.toLowerCase() === 'laravel') {
    endpoints.forEach(function(endpoint, index) {
      console.log(chalk.green(`API route for ${endpoint} generated`));

      if (methods[index] === undefined) {
        fs.appendFileSync('routes/api.php', `\nRoute::get('/${endpoint}', function () {\n});\n`);
      } else {
        fs.appendFileSync('routes/api.php', `\nRoute::${methods[index].toLowerCase()}('/${endpoint}', function () {\n});\n`);
      }
    })
  } else if (program.framework.toLowerCase() === 'rails') {
    var data = fs.readFileSync('config/routes.rb').toString().split("\n");

    var text = '';

    endpoints.forEach(function(endpoint, index) {
      console.log(chalk.green(`API route for ${endpoint} generated`));

      if (methods[index] === undefined) {
        data.splice(data.length-2, 0, `  get '/${endpoint}', to: ''`);
      } else {
        data.splice(data.length-2, 0, `  ${methods[index].toLowerCase()} '/${endpoint}', to: ''`);
      }

      text = data.join("\n");
    })

    fs.writeFile('config/routes.rb', text, function (err) {
      if (err) return console.log(err);
    });
  } else if (program.framework.toLowerCase() === 'flask') {
    endpoints.forEach(function(endpoint, index) {
      console.log(chalk.green(`API route for ${endpoint} generated`));

      if (methods[index] === undefined) {
        fs.appendFileSync('app/routes/api.py', `\n@api.route('/${endpoint}', methods=['GET'])\ndef def_name():\n    return 'something'\n`);
      } else {
        fs.appendFileSync('app/routes/api.py', `\n@api.route('/${endpoint}', methods=['${methods[index]}'])\ndef def_name():\n    return 'something'\n`);
      }
    })
  }

  console.log(chalk.green('\nAll API boilerplate succesfully generated'));
} else {
  console.error(chalk.red('Framework name is required'));
}
