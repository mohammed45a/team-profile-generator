const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const teamArray = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

function generateManager() {
    inquirer.prompt([
        nameQuestion,
        IDQuestion,
        emailQuestion,
        officeQuestion,
    ]).then((answer) => {
        let manager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber);
        teamArray.push(manager);
        menuQuestion();
    });
};
function generateIntern() {
    const newInt1 = new Intern;
    inquirer.prompt([
        nameQuestion,
        IDQuestion,
        emailQuestion,
        schoolQuestion,
    ]).then((answer) => {
        let intern = new Intern(answer.name, answer.id, answer.email, answer.school);
        teamArray.push(intern);
        menuQuestion();
    });
};
function generateEngineer() {
    const newEngin1 = new Engineer;
    inquirer.prompt([
        nameQuestion,
        IDQuestion,
        emailQuestion,
        gitQuestion,
    ]).then((answer) => {
        let engineer = new Engineer(answer.name, answer.id, answer.email, answer.github);
        teamArray.push(engineer);
        menuQuestion();
    });
};

// Questions
const choices = [
    {
        type: "list",
        name: "menu",
        message: "Enter another team member or generate team?",
        choices: [Engineer, Intern, Finish]
    }];

const nameQuestion = {
    type: "input",
    name: "name",
    message: "Please enter your name"
};
const IDQuestion = {
    type: "input",
    name: "id",
    message: "Please enter your employee ID"
};
const emailQuestion = {
    type: "input",
    name: "email",
    message: "Please enter email address",
    validate: function (email) {
        // Regex mail check (return true if valid mail)
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
    }
};
const officeQuestion = {
    type: "input",
    name: "officeNumber",
    message: "Please enter your office number"
};
const schoolQuestion = {
    type: "input",
    name: "school",
    message: "Please enter the name of your school"
};
const gitQuestion = {
    type: "input",
    name: "github",
    message: "Please enter your github username"
};

function menuQuestion() {
    inquirer.prompt(choices).then((menuAnswers) => {
        const answers = displayMenuAnswers(menuAnswers);
    });
}

function displayMenuAnswers(data) {
    if (data.menu === "Engineer") {
        generateEngineer();
    } else if (data.menu === "Intern") {
        generateIntern();
    } else {
        Finish();
    }
}

function Finish() {
    buildPage();
}
const buildPage = () => {
    fs.writeFile("./output/team.html", render(teamArray), (err) =>
        err ? console.log(err) : console.log('Success!')
    );
};

generateManager();