const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");

let displayValue = "0";
let firstNumber = null;
let operator = null;
let secondNumber = null;
let result = null;

let hasDecimal = false;

// Updates the display with whatever the current displayValue is, only displays the first 11 characters of the string
function updateDisplay() {
  display.textContent = displayValue.substring(0, 11);
}

// Appends a value given to it to the displayValue and updates the display to match the new displayValue, will not append if length is already 11 characters long
function appendToDisplay(value) {
  if (displayValue === "0" && value !== ".") {
    displayValue = value;
  } else if (displayValue.length >= 11) {
    return;
  } else {
    displayValue += value;
  }
  updateDisplay();
}

// Clears the display to view 0 and resets decimal to be used again, updates the display to get it done
function clearDisplay() {
  displayValue = "0";
  hasDecimal = false;
  updateDisplay();
}

// Clears the calculations of the calculater to be used fresh if needed
function clearCalculations() {
  result = null;
  firstNumber = null;
  secondNumber = null;
  operator = null;
}

// Handles turning the displayValue to either a negative or positve value, updates the display to show the new displayValue
function handleSign() {
  displayValue = displayValue * -1;
  updateDisplay();
}

// Handles click -- work in progress --
function handleClick(click) {
  console.log(click);
  if (click === "clear") {
    clearDisplay();
  } else if (click === "=") {
    if (firstNumber !== null && secondNumber !== null && operator !== null) {
      displayValue = operate(firstNumber, secondNumber, operator);
      updateDisplay();
    } else {
        if (firstNumber !== null && secondNumber === null && operator !== null) {
            secondNumber = displayValue;
            operate(firstNumber, secondNumber, operator);
            console.log(firstNumber, operator, secondNumber);
            clearCalculations();
        }
    }
  } else if (click === "sign") {
    handleSign();
    return result;
  } else if (click >= 0 && click <= 9) {
    appendToDisplay(click);
  } else if (click === ".") {
    if (!hasDecimal) {
      hasDecimal = true;
      appendToDisplay(click);
    }
  } else if (click === "percent") {
    // ? **********************************************************************************************************************************
  } else if (click === "+") {
    operator = click;
    if(firstNumber === null) {
        firstNumber = displayValue;
    } else {
        
    }
    console.log("Operator: " + operator);
    clearDisplay();
  } else if (click === "-") {
    operator = click;
    console.log("Operator: " + operator);
    clearDisplay();
  } else if (click === "*") {
    operator = click;
    console.log("Operator: " + operator);
    clearDisplay();
  } else if (click === "/") {
    operator = click;
    console.log("Operator: " + operator);
    clearDisplay();
  }
}

// Sets up eventListeners on ever button on the document with a click event, using the event handler handleClick to use the value of the button clicked to decide what to do from there
function setUpEventListeners() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      handleClick(button.value);
    });
  });
}

// Updates the display and sets up the buttons event listeners nice and fresh
updateDisplay();
setUpEventListeners();

// Operation function to use a sign to determine which calculation to complete
function operate(firstNum, secondNum, op) {
  if (op === "+") {
    return add(firstNum, secondNum);
  } else if (op === "-") {
    return subtract(firstNum, secondNum);
  } else if (op === "*") {
    return multiply(firstNum, secondNum);
  } else {
    return divide(firstNum, secondNum);
  }
}

// console.log(operate(12, 0, "/"));

// Returns an integer that was two strings added with each other
function add(a, b) {
  result = parseInt(a) + parseInt(b);
  return result;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b <= 0) {
    return "Error";
  } else {
    return a / b;
  }
}
