#!/usr/bin/env node
const moment = require("moment");
const inquirer = require("inquirer");
const chalk = require('chalk');
const Promise = require("bluebird");
const Spreadsheet = require("google-spreadsheet");
const { SPREADSHEET_ID, SPREADSHEET_SHEET } = require("./config");
const credentials = require("./config/service_account_config.json");
const doc = Promise.promisifyAll(new Spreadsheet(SPREADSHEET_ID));
const questions = require("./questions.js");
moment.locale("sv");

main();

/**
 * Waits for inquirer answers, connects to spreadsheet, gets info,
 * adds row, removes properties from inserted row, prints the inserted
 * row.
 */
async function main() {
  try {
    const answers = await inquirer.prompt(questions);
    await connectToSpreadSheet();
    const info = await getInfoAboutSpreadSheet();
    console.log(chalk.blue(`Document loaded: ${chalk.magenta(info.title)}`));
    const row = reduceObject(await addRow(answers));
    console.log(chalk.blue(`Added following row:`))
    prettyPrintObject(row);
  } catch (e) {
    console.log("Everything error :D", e);
  }
}

/**
 * Connects with credentials from `.json`
 */
async function connectToSpreadSheet() {
  try {
    return doc.useServiceAccountAuthAsync(credentials);
  } catch (e) {
    console.log("Connection error", e);
  }
}

/**
 * Gets information about sheet, getting the title for example
 */
async function getInfoAboutSpreadSheet() {
  try {
    return doc.getInfoAsync();
  } catch (e) {
    console.log("Get information error", e);
  }
}

/**
 * Creates an object with the answers to insert into the document,
 * then it calls the API and tells the API which sheet and which row to add
 * the object corresponds to a row. Returns the inserted row
 */
async function addRow(answers) {
  const rowToAdd = {
    date: moment().format("DD/MM YYYY"),
    task: answers.task,
    game: answers.game,
    hours: answers.hours
  };
  try {
    return doc.addRowAsync(SPREADSHEET_SHEET, rowToAdd);
  } catch (e) {
    console.log("Add row error", e);
  }
}

/** Removes certain properties in the object returned by the API.
 * I only wanted the columns that are created to print to the console
 * so I filtered out everything else
 */
function reduceObject(row) {
  const notAllowed = ["_xml", "_links", "id", "app:edited", "save", "del"];
  return Object.keys(row)
    .filter(key => !notAllowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = row[key];
      return obj;
    }, {});
}

/** Just prints the object with nice formatting and colors  */
function prettyPrintObject(obj){
  console.log(chalk.gray('----------------------'));
  for(let prop in obj){
    console.log(` |> ${chalk.magenta(prop)}: ${chalk.cyan(obj[prop])}`);
  }
  console.log(chalk.gray('----------------------'));
}
