const display = document.querySelector('#display');

const numberButtons = document.querySelector('#numberbuttons');
const operatorButtons = document.querySelector('#operatorbuttons');
const equalsButton = document.querySelector('#equalsbutton');
const decimalButton = document.querySelector('#decimalbutton');

let currentNumber = '0';
let lastNumber = '';
let runningTotal = '';
let currentOperator = '';


let operatorButton = document.querySelector('.operatorbutton');

numberButtons.addEventListener("click", event => {
    if (event.target.id == 'equalsbutton' || event.target.id == 'numberButtons') {
        return;
    } else {
        if (currentOperator) {
            if (currentOperator.classList.contains("activeButton")) {
                currentOperator.classList.remove("activeButton");
            };
        };
    };
    let btnid = event.target.textContent;
    displayNumber(btnid);
    consolelog();
});

equalsButton.addEventListener("click", event => {
    if (event.target.id !== 'equalsbutton') { //prevent highlighting div instead of button only
        //check currentOp & send to correct Operator function with currentNum & lastNum
        if (currentOperator.id === "add") {
            runningTotal = add(currentNumber, lastNumber);
            displayNumber(runningTotal);
            return runningTotal;
        };
        //receive total from Operator function & display it
        

        //set total as currentNum AND runningTotal

        //reset currentOp to '';
        
        consolelog();
    };
});

operatorButtons.addEventListener("click", event => {
    if (event.target.id === 'operatorbuttons') { //ignore containing div
        return;
    };

    if (lastNumber) {
        if (currentOperator.id === "add") {
            runningTotal = add(currentNumber, lastNumber);
            displayNumber(runningTotal);
            return runningTotal;
        };
    };

    if (currentOperator === '') { //if beginning of a new operation (no existing operator)
        //lastNumber = currentNumber;
        let operatorId = document.querySelector(`#${event.target.id}`);
        storeOperator(operatorId);
        currentOperator.classList.add("activeButton");
    } /*else  if (currentOperator === document.querySelector(`#${event.target.id}`)) { //if clicking same operator twice in a row, deselect it
        currentOperator.classList.remove("activeButton");
        currentOperator = '';

    }*/ else {
        currentOperator.classList.remove("activeButton");
        currentOperator = '';
        let operatorId = document.querySelector(`#${event.target.id}`);
        storeOperator(operatorId);
        currentOperator.classList.add("activeButton");
    };
    
    consolelog();
});

function displayNumber(btnid) {
    let number = Number(btnid);
    if (isNaN(number)) {
        return;
    } else {
        if (currentNumber.toString() === '0') {
            display.textContent = (`${number}`); 
            currentNumber = display.textContent;
        } else if (currentOperator != '') {
            display.textContent = (`${number}`);
            lastNumber = currentNumber;
            currentNumber = display.textContent;
            //currentOperator.classList.toggle("activeButton");
            

        } else {
            display.textContent = (`${currentNumber.toString()}${number}`); 
            currentNumber = display.textContent;
        }
    };
    //consolelog();
};

function storeNumber(btnid) {
    number = Number(btnid);
};

function storeOperator(operatorId) {
    currentOperator = operatorId;
    
};


function add(currentNum, lastNum) {
    return Number(currentNum) + Number(lastNum);
    //display.textContent = (`${currentNumber.toString()}`);
};

function subtract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    return num1 / num2;
};

function operate(operator, num1, num2) {
    if (operator.id === 'add') {
        currentOperator = '';
        add(num1, num2);
    } else if (operator.id === 'subtract') {
        currentOperator = '';
        return subtract(num1, num2);
        
    } else if (operator.id === '*') {
        currentOperator = '';
        return multiply(num1, num2);
        
    } else if (operator.id === '/') {
        currentOperator = '';
        return divide(num1, num2);
        
    } else {
        console.log("OOPS");
    }
};

function consolelog() {
    console.log(`currentOperator = ${currentOperator.id}`);
console.log(`currentNumber = ${currentNumber}`);
console.log(`lastNumber = ${lastNumber}`);
console.log(`runningTotal = ${runningTotal}`);
console.log(`------------`);
}
