let display = document.getElementById('display');
let currentInput = '0';
let firstValue = null;
let operator = null;
let awaitingNextValue = false;

// Opdatering af display
function updateDisplay() {
    display.textContent = currentInput;
}

// Modtagelse af tal
function handleNumber(num) {
    if (awaitingNextValue) {
        currentInput = num;
        awaitingNextValue = false;
    } else {
        currentInput = currentInput === '0' ? num : currentInput + num;
    }
    updateDisplay();
}

// Operatører
function handleOperator(op) {
    if (op === '%') {
        currentInput = parseFloat(currentInput) / 100 * firstValue;
        awaitingNextValue = true;
    } else if (op === '.') {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
        }
    } else {
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
}

// Selve regning af tal
function calculate(first, second, op) {
    if (op === '+') return first + second;
    if (op === '-') return first - second;
    if (op === '*') return first * second;
    if (op === '/') return first / second;
    if (op === '.') return first + '.' + second;
    return second;
}

// Clear mit display
function clearDisplay() {
    currentInput = '0';
    firstValue = null;
    operator = null;
    awaitingNextValue = false;
    updateDisplay();
}

// Event Listeners for alle knapper
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => handleNumber(button.textContent));
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => handleOperator(button.textContent));
});

document.getElementsByClassName('clear')[0].addEventListener('click', clearDisplay);

document.getElementsByClassName('equals')[0].addEventListener('click', () => {
    if (operator) {
        const result = calculate(firstValue, parseFloat(currentInput), operator);
        currentInput = String(result);
        operator = null;
        firstValue = null;
        awaitingNextValue = false;
        updateDisplay();
    }
});