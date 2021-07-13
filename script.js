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


window.addEventListener("keydown", event => {
    //if backspace, remove last character from textContent.display
    if (event.key === "Backspace") {
        if (equals === true) {
            return;
        } else if (display.textContent.length === 1) {
            display.textContent = 0;
            currentNumber = 0;
        } else {
            display.textContent = display.textContent.substring(0, display.textContent.length - 1);
            currentNumber = display.textContent;
        };
    };

    
    if (display.textContent.length > 7) {
        return;
    } else if ( isNaN(event.key) === true ) {
        if (event.key === 'Clear') {
            clearAll();
            return;
        };

        if (event.key == '.') {
            if (currentOperator) {
                if (currentOperator.classList.contains("activeButton")) {
                    currentOperator.classList.remove("activeButton");
                    };
                
                //resetDisplayText(); 
            };

            if (display.textContent.length > 7) {
                return;
            };
            
            if (display.textContent.includes('.') && currentNumber) {
                return;
            } else {
                let decimal = '.';
                displayNumber(decimal);
                currentNumber = currentNumber + decimal;
            };
            return;
        };

        if(event.key === "Enter" || event.key === "=") {
            if (equals === true) { //if equals is clicked twice in a row, return
                return;
            } else if (!lastNumber) {
                return;
            } else {
            runningTotal = operate(currentOperator.id, currentNumber, lastNumber);
            resetDisplayText();
            displayNumber(runningTotal);
            currentNumber = runningTotal;
            lastNumber = '';
            equals = true;
            };
        };

        if (currentOperator.id === "divide" && currentNumber === "0") { //if dividing by 0, prevent operator from being stored/highlighted
            operate(currentOperator.id, currentNumber, lastNumber);
            return;
        } 
        // else {
        //     resolveAndDisplayOperation();
        //     };

        clearActiveOperators();
    
        getKeyedOperator(event);

        lastNumber = display.textContent;
        currentNumber = ''; 
    } else {
        if (currentOperator) {
            if (currentOperator.classList.contains("activeButton")) {
                resetDisplayText();
                currentOperator.classList.remove("activeButton"); 
            }; 
        };

        let num = Number(event.key);
            displayNumber(num);
            currentNumber = currentNumber + num;
            equals = false;
    };
});

numberButtons.addEventListener("click", event => {
    if (event.target.classList.contains("${(numberbuttons || equalsbutton || decimalbutton)}") || event.target.nodeName === "P") { //ignore equals & surrounding div
        return;
    } else {
        if (currentOperator) {
            if (currentOperator.classList.contains("activeButton")) {
                resetDisplayText();
                currentOperator.classList.remove("activeButton");
                };
        };
    };

    if (event.target.placeholder == '.') {
        if (display.textContent.length > 7) {
            return;
        };

        if (display.textContent.includes('.') && currentNumber) {
            return;
        } else {
            let decimal = '.';
            displayNumber(decimal);
            currentNumber = currentNumber + decimal;
        };
    };
    
    if ( isNaN(event.target.placeholder) === false ) { //display Number (but disclude NaN buttons)
        if (display.textContent.length > 7) {
            return;
        } else if ( (Number(event.target.placeholder)) === NaN) {
            return;
        } else {
            let num = Number(event.target.placeholder);
            displayNumber(num);
            currentNumber = currentNumber + num;
            equals = false;
        };
    };
});

operatorButtons.addEventListener("click", event => {
    if (event.target.id === 'operatorbuttons') { //ignore containing div
        return;
    };

    if (event.target.id === 'backspace') {
        if (equals === true) {
            return;
        } else if (display.textContent.length === 1) {
            display.textContent = 0;
            currentNumber = 0;
        } else {
            display.textContent = display.textContent.substring(0, display.textContent.length - 1);
            currentNumber = display.textContent;
        };
        return;
    };

    if (event.target.id === 'clear') {
        clearAll();
        return;
    };

    if (event.target.id === 'squareroot') {
        computeSquareroot();
        return;
    };
    
    if (currentOperator.id === "divide" && currentNumber === "0") { //if dividing by 0, prevent operator from being stored/highlighted
        operate(currentOperator.id, currentNumber, lastNumber);
        return;
    } else {
        resolveAndDisplayOperation();
        };

    clearActiveOperators();
    
    storeOperator(document.querySelector(`#${event.target.id}`)); 

    currentOperator.classList.add("activeButton");

    lastNumber = display.textContent;
    currentNumber = ''; 
    equals = false;
});

equalsButton.addEventListener("click", event => {
        if (equals === true) { //if equals is clicked twice in a row, return
            return;
        } else if (!lastNumber) {
            return;
        } else {
        runningTotal = operate(currentOperator.id, currentNumber, lastNumber);
        resetDisplayText();
        displayNumber(runningTotal);
        currentNumber = '';
        lastNumber = display.textContent;
        equals = true;
        };
});

function storeOperator(operatorId) {
    currentOperator = operatorId;
};

function resetCurrentOperator() {
    if (currentOperator.classList.contains("activeButton")) {
        currentOperator.classList.remove("activeButton");
        };
    currentOperator = '';
};

function displayNumber(num) {
    if (isNaN(num)) {
        if (num === '.') {
            if (!currentNumber || equals === true) {
                display.textContent = '0';
                currentNumber = 0;
                display.textContent = display.textContent + num;
            } else if (currentNumber && equals === true) {
                display.textContent = display.textContent + num;
            } else {
                display.textContent = display.textContent + num;
            };
        } else {
            return;
        };        
    } else {
        if (display.textContent === '0') {
            resetDisplayText();
            display.textContent = display.textContent + num;
        } else if (equals == true && (currentNumber.toString()[currentNumber.length - 1] === '.')) {
            // display.textContent = '0.';
            // currentNumber = '0.';
            display.textContent = display.textContent + num;
        } else { 
            if (equals == true) { // **BUG - Does not allow for display of decimal number after operation has just been equaled out
                display.textContent = num;
                return;
            };

            if (display.textContent === '0') {  //check if it's the beginning/Cleared 0
            resetDisplayText();
            };
            
            display.textContent = display.textContent + num;
        };
    };
};

function operate(operator, num1, num2) {
    if (operator === 'add') {
        currentOperator = '';
        return Number(add(num1, num2).toFixed(8));
    } else if (operator === 'subtract') {
        currentOperator = '';
        return Number(subtract(num1, num2).toFixed(8));
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
};

function computeSquareroot() {
    if (currentOperator) { //if operation is in progress
        runningTotal = operate(currentOperator.id, currentNumber, lastNumber); //resolve operation in progress
        currentNumber = runningTotal; 
    };
    runningTotal = Number(squareroot(currentNumber).toFixed(8));
    resetDisplayText();
    displayNumber(runningTotal);
    currentNumber = runningTotal;
};

function resolveAndDisplayOperation() {
    if (lastNumber && currentOperator && currentNumber) {// if an operation is in progress, resolve the operation & display total
        runningTotal = operate(currentOperator.id, currentNumber, lastNumber);
        resetDisplayText();
        displayNumber(runningTotal);
        currentNumber = runningTotal;
    };
};

function getKeyedOperator(event) {
    // if (equals !== true) {
    let code = event.code.toString();
    code = code.replace("Numpad", "").toLowerCase();
    if (code === "enter" || code === "equal" || code === "backspace") {
        //storeOperator(document.querySelector(`#equals`));
        return;
    } else {
        storeOperator(document.querySelector(`#${code}`));
    }
    currentOperator.classList.add("activeButton");
    // };
};

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
        if (operators[i].classList.contains("activeButton")) {
            operators[i].classList.remove("activeButton");
        };
    };
};

function resetDisplayText() {
    display.textContent = '';
};