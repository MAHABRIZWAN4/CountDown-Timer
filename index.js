#! /usr/bin/env node 
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
import chalk from "chalk";
import gradient from "gradient-string";
const gradientText = gradient([
    "red",
    "yellow",
    "green",
    "yellow",
    "red",
    "yellow",
    "red",
    "yellow",
]);
console.log(gradientText("\n\t\t********************************************"));
console.log(gradientText("\t\t\tWELCOME TO MY COUNTDOWN TIMER"));
console.log(gradientText("\t\t********************************************\n"));
let name = await inquirer.prompt([
    {
        name: "userName",
        type: "input",
        message: chalk.bgBlue.bold.italic("Enter your name"),
        validate: function (name) {
            if (name.trim() === "") {
                return "Please enter the name first...";
            }
            else if (/^[^a-zA-Z]+$/.test(name.trim())) {
                return "Please enter your name using alphabetic characters, not just numbers or special characters.";
            }
            else {
                return true;
            }
        },
    },
]);
console.log(chalk.yellow.italic.bold(name.userName));
let response = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        message: chalk.bgBlue.bold.italic("Please Enter the amount of second =====> "),
        validate: (input) => {
            if (isNaN(input)) {
                return "Please Enter a valid number";
            }
            else if (input > 60) {
                return "Second must be in 60";
            }
            else {
                return true;
            }
        },
    },
]);
let input = response.userInput;
console.log(gradientText("\n\t\t**********************************************"));
console.log(gradientText(`\t\tDear ! ${name.userName} CountDown Timer starts Now`));
console.log(gradientText("\t\t**********************************************\n"));
function startTime(val) {
    const initialTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(initialTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.bgRedBright.underline.bold.italic(`Dear ${name.userName} Timer has expired!!!!`));
            process.exit();
        }
        const minutes = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const seconds = Math.floor(timeDiff % 60);
        console.log(chalk.green.bold(`${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`));
    }, 1000);
}
startTime(input);
