const display = document.querySelector('#display');
const numberButtons = document.querySelector('#numberbuttons');
const operatorButtons = document.querySelector('#operatorbuttons');
const equalsButton = document.querySelector('#equals');

let currentNumber = '';
let lastNumber = '';
let runningTotal = '';
let currentOperator = '';
let lastOperator = '';
let equals = false;

numberButtons.addEventListener("click", event => {
    console.log(event.target);
    if (event.target.classList.contains("numberbuttons")) { //ignore equals & surrounding div
        return;
    } else {  //Deactivate any highlighted Operator buttons
        if (currentOperator) {
            if (currentOperator.classList.contains("activeButton")) {
            display.textContent = ''; //if an operator is currently selected, clear out the display to put new numbers
            currentOperator.classList.remove("activeButton"); //then remove the active status
            };
        };
    };

    if (event.target.id == 'decimal') {
        if (display.textContent.length > 19) {
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
    
    if (event.target.textContent !== '=' && event.target.textContent !== '.') {//display Number (but disclude NaN)
        if (display.textContent.length > 19) {
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
    consolelog();
});

operatorButtons.addEventListener("click", event => {
    if (event.target.id === 'operatorbuttons') { //ignore containing div
        return;
    };

    if (event.target.id === 'clear') {
        clearAll();
        return;
    };

    if (event.target.id === 'squareroot') {
        runningTotal = squareroot(currentNumber);
        display.textContent = '';
        displayNumber(runningTotal);
        currentNumber = runningTotal;
    };
    
    if (currentOperator.id === "divide" && currentNumber === "0") { //if dividing by 0, prevent operator from being stored/highlighted
        operate(currentOperator.id, currentNumber, lastNumber);
        return;
    } else {
        if (lastNumber && currentOperator) {// if an operation is in progress, resolve the operation & display total
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
            if (!currentNumber) {
                display.textContent = '0';
                display.textContent = display.textContent + num;
            } else {
                display.textContent = display.textContent + num;
            };
        } else {
            return;
        };        
    } else if (!lastOperator) {
        if (display.textContent === '0') {
            display.textContent = '';
            display.textContent = display.textContent + num;
        } else { 
            if (equals == true) {
                display.textContent = '';
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
        return multiply(num1, num2);
    } else if (operator === 'divide') {
        currentOperator = '';
        return divide(num1, num2);
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

    consolelog();
};

function consolelog() {
    console.log(`currentOperator = ${currentOperator.id}`);
    console.log(`lastOperator = ${lastOperator.id}`);
    console.log(`currentNumber = ${currentNumber}`);
    console.log(`lastNumber = ${lastNumber}`);
    console.log(`runningTotal = ${runningTotal}`);
    console.log(`equals = ${equals}`);
    console.log(`------------`);
};

function clearActiveOperators() {
    currentOperator = '';
    lastOperator = '';
    
    //let opBtns = operatorButtons.childNodes;
    for (i = 0; i < operatorButtons.children.length; i++) {
        if (operatorButtons.children[i].classList.contains("activeButton")){
            operatorButtons.children[i].classList.remove("activeButton");
        }
    };
};