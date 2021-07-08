const display = document.querySelector('#display');

const numberButtons = document.querySelector('#numberbuttons');
const operatorButtons = document.querySelector('#operatorbuttons');
const equalsButton = document.querySelector('#equalsbutton');
const decimalButton = document.querySelector('#decimalbutton');

let currentNumber = '';
let lastNumber = '';
let runningTotal = '';
let currentOperator = '';
let lastOperator = '';

numberButtons.addEventListener("click", event => {
    if (event.target.id == 'equalsbutton' || event.target.id == 'numberButtons') {
        return;
    } else {  //Deactivate any highlighted Operator buttons
        if (currentOperator) {
            if (currentOperator.classList.contains("activeButton")) {
            //if an operator is currently selected, clear out the display to put new numbers
            display.textContent = '';
            //then remove the active status
            currentOperator.classList.remove("activeButton");
            }
        };
    };
    //display Number (but disclude NaN)
    if (event.target.textContent !== '=') {
        let num = event.target.textContent;
    displayNumber(num);
    
    //set clicked number as currentNumber plus previously displayed number
    currentNumber = currentNumber + num;
    }
    

    consolelog();
});

operatorButtons.addEventListener("click", event => {
    if (event.target.id === 'operatorbuttons') { //ignore containing div
        return;
    };

    // if an operation is in progress, resolve the operation & display total
    if (lastNumber && currentOperator) {
        runningTotal = operate(currentOperator.id, currentNumber, lastNumber);
        display.textContent = '';
        displayNumber(runningTotal);
        currentNumber = runningTotal;
    };


    //store this button as currentOperator
    storeOperator(document.querySelector(`#${event.target.id}`));

    //highlight button as active
    currentOperator.classList.add("activeButton");

    //store DISPLAYED number as lastNumber?
    lastNumber = display.textContent;

    //clear out currentNumber?
    currentNumber = '';

consolelog();
});

equalsButton.addEventListener("click", event => {
    if (event.target.id !== 'equalsbutton') { //prevent highlighting of surrounding div
        runningTotal = operate(currentOperator.id, currentNumber, lastNumber);
        display.textContent = '';
        displayNumber(runningTotal);
        currentNumber = runningTotal;
    };
});

function storeOperator(operatorId) {
    currentOperator = operatorId;
};



function displayNumber(num) {
    if (isNaN(num)) {
        return;
    } else { 
        if (display.textContent === '0') {  //check if it's the beginning/Clear 0
            display.textContent = '';
        };
        display.textContent = display.textContent + num; //display multi digit numbers
    };
    console.log('****')
    consolelog();
};



function operate(operator, num1, num2) {
    if (operator === 'add') {
        currentOperator = '';
        total = add(num1, num2);
        return total;
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
    }
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
        return;
    } else {
        return (Number(lastNum) / Number(currentNum));
    };
};

function consolelog() {
    console.log(`currentOperator = ${currentOperator.id}`);
    console.log(`lastOperator = ${lastOperator.id}`);
    console.log(`currentNumber = ${currentNumber}`);
    console.log(`lastNumber = ${lastNumber}`);
    console.log(`runningTotal = ${runningTotal}`);
    console.log(`------------`);
}