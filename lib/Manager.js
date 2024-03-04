const Employee = require("./Employee"); // import the generic employee class
class Manager extends Employee { // create Manager class, this class is an extension of Employee class
    constructor(name, id, email, officeNumber) { // keys associated with this class
    
        super(name, id, email); // name, email, id inherited from the Employee class

        this.officeNumber = officeNumber; // unique variable for the Manager class only
    };

    getOfficeNumber() {
        return this.officeNumber;   // return user-input office number 
    };
    getRole() {
        return "Manager"; // return string value "Manager" 
    };
};

module.exports = Manager; // allow this Manager class to be inmported by other files
