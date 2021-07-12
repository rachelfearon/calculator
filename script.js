const display = document.querySelector('#display');
const numberButtons = document.querySelector('#numberbuttons');
const operatorButtons = document.querySelector('#operatorbuttons');
const operators = document.getElementsByClassName("operatorbutton");
const equalsButton = document.querySelector('#equals');

let currentNumber = '';
let lastNumber = '';
let runningTotal = '';
let currentOperator = '';
let equals = false;

numberButtons.addEventListener("click", event => {
    console.log(event.target);

    if (event.target.classList.contains("${(numberbuttons || equalsbutton || decimalbutton)}") || event.target.nodeName === "P") { //ignore equals & surrounding div
        return;
    } else {  //Deactivate any highlighted Operator buttons
        if (currentOperator) {
            if (currentOperator.classList.contains("activeButton")) {
            display.textContent = ''; //if an operator is currently selected, clear out the display to put new numbers
            currentOperator.classList.remove("activeButton"); //then remove the active status
            };
        };
    };

    if (event.target.placeholder == '.') {
        if (display.textContent.length > 7) {
            return;
        };

        if (display.textContent.includes('.')) {
            return;
        } else {
            let decimal = '.';
            displayNumber(decimal);
            currentNumber = currentNumber + decimal;
        };
    };
    
    if (event.target.placeholder !== '=' && event.target.placeholder !== '.') {//display Number (but disclude NaN)
        if (display.textContent.length > 7) {
            return;
        } else if ( (Number(event.target.placeholder)) === NaN) {
            return;
        } else {
            let num = Number(event.target.placeholder);
            displayNumber(num);
            currentNumber = currentNumber + num; //set clicked number as currentNumber plus previously displayed number
            equals = false;
        };
    };
});

operatorButtons.addEventListener("click", event => {
    console.log(event.target);
    if (event.target.id === 'operatorbuttons') { //ignore containing div
        return;
    };

    if (event.target.id === 'clear') {
        clearAll();
        return;
    };

    if (event.target.id === 'squareroot') {
        if (currentOperator) { //if operation is in progress
            runningTotal = operate(currentOperator.id, currentNumber, lastNumber); //resolve operation in progress
            currentNumber = runningTotal; //store result of in progress operation into currentNumber
        };
        runningTotal = Number(squareroot(currentNumber).toFixed(8));
        display.textContent = '';
        displayNumber(runningTotal);
        currentNumber = runningTotal;
        return;
    };
    
    if (currentOperator.id === "divide" && currentNumber === "0") { //if dividing by 0, prevent operator from being stored/highlighted
        operate(currentOperator.id, currentNumber, lastNumber);
        return;
    } else {
        if (lastNumber && currentOperator && currentNumber) {// if an operation is in progress, resolve the operation & display total
        runningTotal = operate(currentOperator.id, currentNumber, lastNumber);
        display.textContent = '';
        displayNumber(runningTotal);
        currentNumber = runningTotal;
        };

        clearActiveOperators();
        
        storeOperator(document.querySelector(`#${event.target.id}`)); //store this button as currentOperator

        currentOperator.classList.add("activeButton"); //highlight button as active

        lastNumber = display.textContent; //store DISPLAYED number as lastNumber

        currentNumber = ''; //clear out currentNumber

        equals = false;
    };
});

equalsButton.addEventListener("click", event => {
    // if (event.target.placeholder !== '=') { //prevent highlighting of surrounding div
        if (equals === true) { //if equals is clicked twice in a row, return
            return;
        } else if (!lastNumber) {
            return;
        } else {
        runningTotal = operate(currentOperator.id, currentNumber, lastNumber);
        display.textContent = '';
        displayNumber(runningTotal);
        currentNumber = runningTotal;
        lastNumber = '';
        equals = true;
        }
    // };
});

function storeOperator(operatorId) {
    currentOperator = operatorId;
};

function displayNumber(num) {
    if (isNaN(num)) {
        if (num === '.') {
            if (!currentNumber || equals === true) {
                display.textContent = '0';
                currentNumber = 0;
                display.textContent = display.textContent + num;
            } else {
                display.textContent = display.textContent + num;
            };
        } else {
            return;
        };        
    } else {
        if (display.textContent === '0') {
            display.textContent = '';
            display.textContent = display.textContent + num;
        } else { 
            if (equals == true) {
                //display.textContent = display.textContent + num;
                display.textContent = num;
                return;
            };

            if (display.textContent === '0') {  //check if it's the beginning/Clear 0
            display.textContent = '';
            };
            
            display.textContent = display.textContent + num; //display multi digit numbers
        };
    };
};

function operate(operator, num1, num2) {
    if (operator === 'add') {
        currentOperator = '';
        return add(num1, num2);
    } else if (operator === 'subtract') {
        currentOperator = '';
        return subtract(num1, num2);
    } else if (operator === 'multiply') {
        currentOperator = '';
        return Number(multiply(num1, num2).toFixed(8));
    } else if (operator === 'divide') {
        currentOperator = '';
        return Number(divide(num1, num2).toFixed(8));
    } else {
        console.log("OOPS");
    };
};

function add(currentNum, lastNum) {
    return Number(currentNum) + Number(lastNum);
};

function subtract(currentNum, lastNum) {
    return (Number(lastNum) - Number(currentNum));
};

function multiply(currentNum, lastNum) {
    return (Number(currentNum) * Number(lastNum));
};

function divide(currentNum, lastNum) {
    if (currentNum == 0) {
        alert("You can't do that, Dave.");
        clearAll();
        return runningTotal = 0;
    } else {
        return (Number(lastNum) / Number(currentNum));
    };
};

function squareroot(currentNum) {
    if (currentNum == 0) {
        return 0;
    } else {
        return (Math.sqrt(Number(currentNum)));
    }
}

function clearAll() {
    
    display.textContent = '0';
    currentNumber = '';
    lastNumber = '';
    runningTotal = '';
    
    clearActiveOperators();
};

function clearActiveOperators() {
    currentOperator = '';

    for (i = 0; i < operators.length; i++) {
        if (operators[i].classList.contains("activeButton")){
            operators[i].classList.remove("activeButton");
        }
    };
};