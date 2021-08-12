"use strict"
const result = document.querySelector('#result');
const numbersContainer = document.querySelector('.numbers_container');
const operators_1 = document.querySelector('.operators_1');
const operators_2 = document.querySelector('.operators_2');
const resetButton = document.querySelector('.reset_buttons');
const dot = document.querySelector('#dot');
const changeSign = document.querySelector('#change_sign');
const percent = document.querySelector('#percent');
const container = document.querySelector('.container');
const smallDisplay = document.querySelector('.small_display');
const sound = document.querySelector('#sound1');


numbersContainer.addEventListener('click', enterNumbers);
operators_1.addEventListener('click', extraFunctions);
operators_2.addEventListener('click', function (event) {
    enterOperators(event.target.value);
});
resetButton.addEventListener('click', resetResult);
dot.addEventListener('click', addDot);
changeSign.addEventListener('click', plusOrMinus);
percent.addEventListener('click', function (event) {
    countPercent(event.target.value);
});
container.addEventListener('mousedown', () => {
    container.style.boxShadow = '0 0 20px #01F706';
    setTimeout(() => {
        container.style.boxShadow = '0 0 3px #01F706';
    }, 200);
})

container.addEventListener('mousedown', (event) => {
    if (event.target.tagName !== 'BUTTON') {
        return;
    } else {
        sound.play();
        event.target.style.boxShadow = '0 0 20px #01F706';
        setTimeout(() => {
            event.target.style.boxShadow = '0 0 0px #01F706';
        }, 200);
    }
})


let firstNum = '0';
let isNextNum = false;
let saveOperator = '';
let smallDisplayValue = '';


function enterNumbers(event) {
    // debugger;
    if (event.target.tagName !== 'BUTTON') {
        return;
    }
    if (isNextNum) {
        result.value = event.target.innerHTML;
        isNextNum = false;
        smallDisplay.innerHTML = `${smallDisplayValue} ${result.value}`;
    } else {
        if (result.value === '0') {
            result.value = event.target.innerHTML;
            smallDisplay.innerHTML = result.value;
        } else {
            result.value += event.target.innerHTML;
            smallDisplay.innerHTML = `${smallDisplayValue} ${result.value}`;
        }
    }
}

function enterOperators(operator) {
    // debugger;
    if (isNextNum && saveOperator !== '=') {
        result.value = firstNum;
    } else {
        isNextNum = true;
        switch (saveOperator) {
            case '+':
                firstNum += parseFloat(result.value);
                break;
            case '-':
                firstNum -= parseFloat(result.value);
                break;
            case '/':
                firstNum /= parseFloat(result.value);
                break;
            case '*':
                firstNum *= parseFloat(result.value);
                break;
            default:
                firstNum = parseFloat(result.value);
                smallDisplay.innerHTML = `${firstNum}`;
        }
        result.value = firstNum;
        saveOperator = operator;
        smallDisplayValue = `${smallDisplay.innerHTML} ${operator}`;
        smallDisplay.innerHTML = smallDisplayValue;
    }
}

function addDot() {
    if (isNextNum) {
        result.value = '0.';
        isNextNum = false;
    } else {
        if (result.value.indexOf('.') === -1) {
            result.value += '.';
            smallDisplay.innerHTML = `${smallDisplayValue}${result.value}`;
        }
    }
}

function resetResult(event) {
    if (event.target.id === 'reset_memory') {
        result.value = '0';
        isNextNum = true;
        smallDisplay.innerHTML = '';
        smallDisplayValue = '';
    } else if (event.target.id === 'reset') {
        result.value = '0';
        isNextNum = true;
        firstNum = '0';
        saveOperator = '';
        smallDisplay.innerHTML = '';
        smallDisplayValue = '';
    }
}

function extraFunctions(event) {
    // debugger;
    switch (event.target.id) {
        case 'square':
            result.value = (Math.round((Math.sqrt(result.value)) * 1e12) / 1e12);
            if (result.value === '0') {
                smallDisplay.innerHTML = '';
            } else {
                smallDisplay.innerHTML = `&#8730;${smallDisplay.innerHTML}`;
            }
            break;
        case 'squaring':
            result.value = (Math.round((Math.pow(result.value, 2)) * 1e12) / 1e12);
            if (result.value === '0') {
                smallDisplay.innerHTML = '';
            } else {
                smallDisplay.innerHTML += `<sup>2</sup`;
            }
            break;
    }
}

function plusOrMinus() {
    result.value *= -1;
    smallDisplay.innerHTML = `${result.value}${smallDisplayValue}`;
}

function countPercent(operator) {
    switch (saveOperator) {
        case '+':
            firstNum += ((firstNum * parseFloat(result.value)) / 100);
            break;
        case '-':
            firstNum -= ((firstNum * parseFloat(result.value)) / 100);
            break;
        case '/':
            firstNum /= ((firstNum * parseFloat(result.value)) / 100);
            break;
        case '*':
            firstNum *= ((firstNum * parseFloat(result.value)) / 100);
            break;
    }
    result.value = firstNum;
    saveOperator = operator;
}