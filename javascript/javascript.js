let firstNum = 0;
let operator = null;
let secondNum = 0;

function operate(a, b, op) {
    if(op === "+") {
        return add(a, b);
    } else if (op === "-") {
        return subtract(a, b);
    } else if (op === "*") {
        return multiply(a, b);
    } else if (op === "/") {
        if(b === 0) {
            return "undefined";
        }
        return divide(a, b);
    }
}

function add(a, b){
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};