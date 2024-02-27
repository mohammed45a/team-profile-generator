const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const team = []; 

const addEmployee = [
    {
        name: "AddEmployee",
        message: "Add employee:",
        tyoe: "input"
    },
    {
        name: "email",
        message: "email",
        type: "email"
    },
    {
        name: "id",
        message: "Employee ID:",
        type: "input"
    },
    {
        name: "role",
        message: "Role:",
        type: "list",
        choices: ["Manager", "Engineer", "Intern"]
    }
]

const managerQuestion = [ // unqiue question for a new manager
    { 
        name: "officeNumber",
        message: "Office number:",
        type: "input"
    }
];

const engineerQuestion = [ // unqiue question for a new engineer
    {
        name: "github",
        message: "GitHub ID:",
        type: "input"
    }
];

const internQuestion = [ // // unqiue question for a new intern
    {
        name: "school",
        message: "School name:",
        type: "input"
    }
];

function init() {
            
    inquirer.prompt(questions).then(function(responses) {   // run inquirer on the questions array, output to responses
        
        if(responses.role === "Manager") { // if user enters 'manager' run the following code
            inquirer.prompt(managerQuestion).then(function(managerAnswer) { // ask the manager question and output to managerAnswer
            const manager = new Manager(responses.name, responses.id, responses.email, managerAnswer.officeNumber); // build the manager profile
            team.push(manager); // send the new manager profile to the team array
            addAnotherEmployee(); // run the addAnotherEmployee function to test whether to render or add more employees
            });

        } else if(responses.role === "Engineer") {  // if user enters 'engineer' run the following code
            inquirer.prompt(engineerQuestion).then(function(engineerAnswer) { // ask the engineer question and output to engineerAnswer
            const engineer = new Engineer(responses.name, responses.id, responses.email, engineerAnswer.github);    // build the engineer profile
            team.push(engineer);    // send the new engineer profile to the team array
            addAnotherEmployee();   // run the addAnotherEmployee function to test whether to render or add more employees
            });

        } else if(responses.role === "Intern") {    // if user enters 'intern' run the following code
            inquirer.prompt(internQuestion).then(function(internAnswer) {   // ask the intern question and output to internAnswer
            const intern = new Intern(responses.name, responses.id, responses.email, internAnswer.school);  // build the intern profile
            team.push(intern);   // send the new intern profile to the team array
            addAnotherEmployee();   // run the addAnotherEmployee function to test whether to render or add more employees
            });
        };
    });
};

function addAnotherEmployee() {
    inquirer.prompt(addEmployee).then(function(response) { // ask the user the add another employee question
        if(response.addEmployee) {
            init();     // if they choose to add another, run the init function again
        } else {
            fs.writeFile(outputPath, render(team), function() { // once user finished adding, send the team array to the render function
                console.log("HMTL file generated successully! at " + outputPath);
            });
        };
    });
};

init();

// TODO: Write Code to gather information about the development team members, and render the HTML file.

