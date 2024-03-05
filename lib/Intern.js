const Employee = require("./Employee"); // import the generic employee class
class Intern extends Employee { // create Intern class, this class is an extension of Employee class
    constructor(name, id, email, school) {  // keys associated with this class
    
        super(name, id, email); // name, email, id inherited from the Employee class

        this.school = school;   // unique variable for the Intern class only
    };

    getSchool() {
        return this.school; // return unique value user-input school
    };
    getRole() {
        return "Intern";    // return string value "Intern"
    };
};

module.exports = Intern;    // allow this Intern class to be inmported by other files
