const addButton = document.querySelector('#add');

const oneButton = document.querySelector('#one');
const twoButton = document.querySelector('#two');

const display = document.querySelector('#display');

const numberButtons = document.querySelector('#numberbuttons');

let currentNumber = '';
let secondNumber = undefined;
let runningTotal = undefined;
let currentOperator = '';

numberButtons.addEventListener("click", event => {
    let btnid = event.target.textContent;
    storeNumber(btnid);
});

function displayNumber(btnid) {
    let number = Number(btnid);
    if (isNaN(number)) {
        return;
    } else {
        let newNumber = (`${number}`);
        let newDisplay = newNumber + currentNumber;

        display.textContent = (`${currentNumber.toString()}${number}`); 

        currentNumber = display.textContent;
    };
};

function storeNumber(btnid) {
    number = Number(btnid);
    displayNumber(btnid);
};

function storeOperator(btnid) {
    currentOperator = btnid.textContent;
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
    if (operator === '+') {
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