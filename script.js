const addButton = document.querySelector('#add');

const oneButton = document.querySelector('#one');
const twoButton = document.querySelector('#two');

const display = document.querySelector('#display');

const numberButtons = document.querySelector('#numberbuttons');
const operatorButtons = document.querySelector('#operatorbuttons');

let currentNumber = '0';
let runningTotal = '';
let currentOperator = '';
let currentButton = '';

let operatorButton = document.querySelector('.operatorbutton');

numberButtons.addEventListener("click", event => {
    let btnid = event.target.textContent;

    if (event.target.id === 'equals') {
        if (currentOperator.textContent === '+') {
            currentOperator.classList.toggle("activeButton");
            return Number(currentNumber) + Number(display.textContent);
        };
    }; 

    storeNumber(btnid);
});

operatorButtons.addEventListener("click", event => {
    // if (display.textContent != '0') {

    // }

    if (event.target.id === 'equals') {
        if (currentOperator.textContent === '+') {
            currentOperator.classList.toggle("activeButton");
            return Number(currentNumber) + Number(display.textContent);
        };
    } else if (currentOperator === '') {
        let operatorId = document.querySelector(`#${event.target.id}`);
        storeOperator(operatorId);
        currentButton = document.querySelector(`#${event.target.id}`);
    } else  if (currentOperator === document.querySelector(`#${event.target.id}`)) {
        currentOperator = '';
        currentButton = '';
    } else {
        let operatorId = document.querySelector(`#${event.target.id}`);;
        currentOperator.classList.toggle("activeButton");
        storeOperator(operatorId);
        currentButton = document.querySelector(`#${event.target.id}`);
    };
    
    if (event.target.id === 'operatorbuttons') {
        return;
    } else {
    event.target.classList.toggle("activeButton");
    };
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
            currentNumber = display.textContent;
            //currentOperator.classList.toggle("activeButton");
            operate(currentOperator, currentNumber, `${Number(display.textContent)}`);

        } else {
            display.textContent = (`${currentNumber.toString()}${number}`); 
            currentNumber = display.textContent;
        }
    };
};

function storeNumber(btnid) {
    number = Number(btnid);
    displayNumber(btnid);
};

function storeOperator(operatorId) {
    currentOperator = operatorId;
    
};


function add(num1, num2) {
    return num1 + num2;
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
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === '*') {
        return multiply(num1, num2);
    } else if (operator === '/') {
        return divide(num1, num2);
    } else {
        return "OOPS";
    }
};