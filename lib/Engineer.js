const Employee = require("./Employee");  // import the generic employee class
class Engineer extends Employee {  // create Engineer class, this class is an extension of Employee class
    constructor(name, id, email, github) {  // keys associated with this class
        
        super(name, id, email); // name, email, id inherited from the Employee class

        this.github = github; // unique variable for the Engineer class only
    };

    getGithub() {
        return this.github; // return unique value user-input GitHub ID
    };
    getRole() {
        return "Engineer";  // return string value "Manager"
    };
};

module.exports = Engineer;  // allow this Engineer class to be inmported by other files
