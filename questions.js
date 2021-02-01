/**
 * Used like an if statement, shows different questions based on the 
 * question you asked before, used for the `when` property
 * 
 */
const taskSelected = task => {
  return answers => answers.task === task;
}

const questions = [
  {
    type: "list",
    name: "task",
    message: "Which task?",
    choices: ["Work", "Sleep", "Game"]
  },
  {
    type: "list",
    name: "game",
    message: "Which game?",
    choices: ["Binding of Isaac","Fallout: New Vegas","Some other game"],
    when: taskSelected("Game")
  },
  {
    type: 'input',
    name: 'hours',
    default: 2,
    message: 'How many hours?'
  }
];

module.exports = questions;