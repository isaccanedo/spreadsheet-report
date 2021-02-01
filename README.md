# spreadsheet-report

>Used for logging time to Google Sheets but can be used for anything. Asks questions using [`inquirer`](https://github.com/SBoudrias/Inquirer.js) in the terminal and send those answers to a Google Sheets document using [`node-google-spreadsheet`](https://github.com/theoephraim/node-google-spreadsheet)

Personal use project so a bit of configuration and editing to get it to work for your uses, not intended to be a finished package.

<p align="center">
<img src= "https://thumbs.gfycat.com/ShamefulDazzlingKiwi-size_restricted.gif" />
</p>

## Installation

1. Clone repo to folder of your choice
2. `cd` into folder
3. Install dependencies
```bash
yarn # npm i
```
4. Install it as a global `npm`-package on your computer with `npm link`. After you have configured your credentials you can run this command in the terminal via the command `str`
```bash
npm link
```
5. If you want to change to command to run the package you can change it in `package.json`:
```json
"bin": {
  "str": "app.js"
}
```

## Configuration

This repo is missing a config-file and an ID to the spreadsheet to use. You have to fill in these yourself in `app.js`.

#### Service Account (recommended method)

This is a 2-legged oauth method and designed to be "an account that belongs to your application instead of to an individual end user". Use this for an app that needs to access a set of documents that you have full access to. ([read more](https://developers.google.com/identity/protocols/OAuth2ServiceAccount))

1. Go to the [Google Developers Console](https://console.developers.google.com/)
2. Select your project or create a new one (and then select it). Name it whatever you like.
3. Enable the __Drive API__: 
    * Click the sidebar
    * __API & Services__ > __Dashboard__ > __[+] ENABLE APIS & SERVICES__
    *  Search for __"Drive API"__ and enable it.
4. Create a __Service Account Key__:
    * In the sidebar, go to __Credentials__
    * Then click __Create Credentials__ > __Service Account Key__
    * Select your account, make sure __JSON__ is checked and then click __Create__
5. This will create and download a `json`-configuration file. Save this somewhere in your project (for example in a folder called `/config`)
6. Open the `.json`-file and copy the `"client_email"`-adress.
7. **Invite this service account to the spreadsheet that you are gonna us as editor. Share > Invite with `client_email`-adress**


#### Spreadsheet ID

The id is in the url, you will need this when connecting to the spreadsheet:

example:
```http
https://docs.google.com/spreadsheets/d/abcdefg5617/
```

In this case above the ID is : `abcdefg5617`


## Usage

1. The properties in `rowToAdd` corresponds to the column heades in the spreadsheet. And the values is gathered from `inquirer`. Add the columns you want to have in both the spreadsheet and to this row:

```js
const rowToAdd = {
    date: moment().format("DD/MM YYYY"),
    task: answers.task,
    game: answers.game,
    hours: answers.hours
};
```
`name`-property corresponds to `answers`-property, so `name: "task` will become `answers.task` in the code above.
```js
  {
    type: "list",
    name: "task",
    message: "Which task?",
    choices: ["Work", "Sleep", "Game"]
  },
```

2. `SPREADSHEET_SHEET` is which sheet in the document you want to add to, this starts at index 1, first sheet is __1__.

3. After all this is set, run the command in the terminal.
