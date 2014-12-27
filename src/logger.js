let chalk = require('chalk');
let getDateTime = require('./utils').getDateTime;

// Helpers.
let br = str => `[${str}]`;                        // Wrap in brackets.
let prepend = (arg, arr) => [arg].concat(arr);     // Prepend.
let date = arr => prepend(br(getDateTime()), arr); // Prepend date.
let flag = (name, arr) => prepend(br(name), arr);  // Prepend flag.
let log = arr => date(arr).join(' ');              // Log.
let flog = (name, arr) => log(flag(name, arr));    // Log with flag.

export default class Logger {
  constructor(verbose = false) {
    this.verbose = verbose;
  }

  // Log arguments into the console if the verbose mode is enabled.
  log(...args) {
    if (this.verbose) {
      console.log(log(args));
    }
  }

  // Always log arguments as warning into the console.
  warn(...args) {
    console.warn(chalk.yellow(flog('WARNING', args)));
  }

  // Always log arguments as error into the error console.
  error(...args) {
    console.error(chalk.red(flog('ERROR', args)));
  }
}

export var empty = {
  log: () => {},
  warn: () => {},
  error: () => {},
};