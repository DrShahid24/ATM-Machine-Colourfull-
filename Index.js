#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// User Balance and Pin.
let myBalance = 10000;
let myPin = 1212;
// Welcome Note/ message.
console.log(chalk.blue.bold("\n\tWelcome to Code with Dr.Shahid --- ATM Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your pin code")
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\nPin is correct, login Successfully!\n"));
    // console.log(`Current Account Balance is ${myBalance}`);
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation:",
            choices: ["Withdraw Amount", "Balance Check"]
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let withdraAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "select a withdrawa method:",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdraAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: ["500", "1000", "2000", "30000", "50000"]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red.bold("Insufficient Balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash} withdraw Successfully.`);
                console.log(chalk.green.bold(`Your Remaining Balance is : ${myBalance}`));
            }
        }
        else if (withdraAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:"
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red.bold("Insufficient Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw Successfully`);
                console.log(`Your Remaining Balance is ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "Balance Check") {
        console.log(chalk.greenBright.bold(`Your Current Balance is ${myBalance}`));
    }
}
else {
    console.log(chalk.red.bold("The Pin is incorrect, Try Again"));
}
