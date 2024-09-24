let display = document.getElementById('display');
let currentInput = '0';
let firstValue = null;
let operator = null;
let awaitingNextValue = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function handleNumber(num) {
    if (awaitingNextValue) {
        currentInput = num;
        awaitingNextValue = false;
    } else {
        currentInput = currentInput === '0' ? num : currentInput + num;
    }
    updateDisplay();
}

function handleOperator(op) {
    if (firstValue === null) {
        firstValue = parseFloat(currentInput);
    } else if (operator) {
        const result = calculate(firstValue, parseFloat(currentInput), operator);
        currentInput = String(result);
        firstValue = result;
        updateDisplay();
    }
    operator = op;
    awaitingNextValue = true;
}

function calculate(first, second, op) {
    if (op === '+') return first + second;
    if (op === '-') return first - second;
    if (op === '*') return first * second;
    if (op === '/') return first / second;
    return second;
}

function clearDisplay() {
    currentInput = '0';
    firstValue = null;
    operator = null;
    awaitingNextValue = false;
    updateDisplay();
}

// Event Listeners for buttons
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => handleNumber(button.textContent));
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => handleOperator(button.textContent));
});

document.getElementById('clear').addEventListener('click', clearDisplay);

document.getElementById('equals').addEventListener('click', () => {
    if (operator) {
        const result = calculate(firstValue, parseFloat(currentInput), operator);
        currentInput = String(result);
        operator = null;
        firstValue = null;
        awaitingNextValue = false;
        updateDisplay();
    }
});