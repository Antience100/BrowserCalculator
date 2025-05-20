const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");

let displayValue = "0";
let numbers = [];
let operators = [];
let hasDecimal = false;

// Updates the display with whatever the current displayValue is, only displays the first 11 characters of the string
function updateDisplay() {
  display.textContent = String(displayValue).substring(0, 11);
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
  numbers = [];
  operators = [];
  hasDecimal = false;
  displayValue = "0";
  updateDisplay();
}

// Handles turning the displayValue to either a negative or positve value, updates the display to show the new displayValue
function handleSign() {
  displayValue = (parseFloat(displayValue) * -1).toString();
  updateDisplay();
}

// Handles figuring out the precentage by dividing by 100
function handlePercent() {
  displayValue = (parseFloat(displayValue) / 100).toString();
  updateDisplay();
}

// Returns an integer that was two strings added with each other
function add(...numbers) {
  return numbers.reduce((sum, num) => sum + Number(num), 0);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function multiply(a, b) {
  return Number(a) * Number(b);
}

function divide(a, b) {
  if (Number(b) === 0) {
    return "Error";
  } else {
    return Number(a) / Number(b);
  }
}

// Handles click -- finished?
// Runs through the click options when clicked
function handleClick(click) {
  // clears all the calculation data saved for operations
  if (click === "clear") {
    clearCalculations();
  // Calculates and returns the result to the display using whichever operater and numbers has been inputted
  } else if (click === "=") {
    if (numbers.length > 0 && operators.length > 0) {
      numbers.push(displayValue);
      displayValue = operate();
      numbers = [];
      operators = [];
      hasDecimal = false;
      updateDisplay();
    }
  // uses handleSign function to change the displayValue from either negative or positive
  } else if (click === "sign") {
    handleSign();
  // uses handlePercent function to simply divide by 100 and give the percentage of the displayValue
  } else if (click === "percent") {
    handlePercent();
  // Whatever number between 0 - 9 that has been clicked will be added to the displayValue
  } else if (click >= "0" && click <= "9") {
    appendToDisplay(click);
  // Will add a decimal to the displayValue as long as there isn't one already
  } else if (click === ".") {
    if (!hasDecimal) {
      hasDecimal = true;
      appendToDisplay(click);
    }
  // Goes through the click options for operators and adds the correct operator to be used in the operate function, 
  // adds the current displayValue to numbers, 
  // and clears the display for the next value to be started
  } else if (["+", "-", "*", "/"].includes(click)) {
    if (displayValue !== "0" || numbers.length > 0) {
      numbers.push(displayValue);
      operators.push(click);
      clearDisplay(0);
    }
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

// Operation function to use a sign to determine which calculation to complete and returns the answer
function operate() {
  if (numbers.length < 1 || operators.length < 1) return displayValue;

  let result = Number(numbers[0]);
  for (let i = 0; i < operators.length; i++) {
    const nextNum = Number(numbers[i + 1] || displayValue);
    if (operators[i] === "+") {
      result = add(result, nextNum);
    } else if (operators[i] === "-") {
      result = subtract(result, nextNum);
    } else if (operators[i] === "*") {
      result = multiply(result, nextNum);
    } else if (operators[i] === "/") {
      result = divide(result, nextNum);
      if (result === "Error") return result;
    }
  }
  console.log("result: " + result.toString());
  return result.toString();
}
