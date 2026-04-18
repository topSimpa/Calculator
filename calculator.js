let digitButtons = document.querySelectorAll(".digit");
let operatorButtons = document.querySelectorAll(".operator.arit");
const equalsButton = document.querySelector("#equals-to");
const clearButton = document.querySelector("#clear-all");
const decimalButton = document.querySelector("#decimal");
const backspaceButton = document.querySelector("#backspace");
const screen = document.querySelector("#screen");


let firstInput = "";
let secondInput = "";
let operatorInput = "";
let isResult = false;


const buttonMap = {
    "Backspace" : backspaceButton,
    "Delete": clearButton,
    "=": equalsButton,
}

const operatorMap = {
    "+" : add,
    "-" : subtract,
    "\u00D7": multiply,
    "\u00F7": divide,
}


function add(first, second) {
    const sum  = first + second;
    const to2FloatPoint = Math.round(sum * 100) / 100;
    return (to2FloatPoint);
}


function subtract(minuend, subtrahend) {
const difference = minuend - subtrahend;
    const to2FloatPoint = Math.round(difference * 100) / 100;
    return (to2FloatPoint);
}


function multiply(factorA, factorB) {
    const product = factorA * factorB;
    const to2FloatPoint = Math.round(product * 100) / 100;
    return (to2FloatPoint);
}

function divide(dividend, divisor) {
    if (divisor == 0) {
        return "error";
    }
    const quotient = dividend / divisor
    const to2FloatPoint = Math.round(quotient * 100) / 100;
    return (to2FloatPoint);
}

function display(input) {
    screen.maxlength = input.length;
    screen.value = input;
}


function operate(operatorInput, firstInput, secondInput) {
    const operation = operatorMap[operatorInput];

    const  first = Number(firstInput);
    const  second = Number(secondInput);

    return operation(first, second);

}

function updateInput(input) {
    if (firstInput && operatorInput) {
        secondInput += input;
        display(`${firstInput} ${operatorInput} ${secondInput}`);
    } else {
        if (isResult) {
            clear();
        }
        firstInput += input;
        display(firstInput);
    }
        
}


function clear() {
    display("");

    decimalButton.disabled = false;

    isResult = false;
    firstInput = "";
    operatorInput = "";
    secondInput = "";
    
}

function backspace() {
    if (isResult) {
        clear();
    } else if (secondInput) {
        let newInput = secondInput.split("");
        const digit = newInput.pop();
    
        if (digit == ".") {
            decimalButton.disabled = false;
        }
        newInput = newInput.join("");
        secondInput = "";

        updateInput(newInput);

    } else if (firstInput && !operatorInput) {
        let newInput = firstInput.split("");
        const digit =  newInput.pop();

        if (digit == ".") {
            decimalButton.disabled = false;
        }

        console.log(newInput);
        newInput = newInput.join("");
        firstInput = "";

        updateInput(newInput);
    }
}

function equals() {
    const result = operate(operatorInput, firstInput, secondInput);
    isResult = true;
    operatorInput = "";
    secondInput = "";

    decimalButton.disabled = false;
    
    if (result == "error") {
        display(result);
        firstInput = "";
        
    }  else {
        display(`${result}`);
        firstInput = `${result}`;
    }
    
    
}


digitButtons.forEach(
    (button) => {
        buttonMap[button.textContent] = button;

        button.addEventListener("click", 
            () => {
                let number = button.textContent;
        
                updateInput(number);
                if (button.id == "decimal") {
                    button.disabled = true;
                }
            }
        );
    }
);

operatorButtons.forEach(
    (button) => {
        if (button.textContent == "\u00D7") {
            buttonMap["*"] = button;
        } else if (button.textContent == "\u00F7") {
            buttonMap["/"] = button;
        } else {
            buttonMap[button.textContent] = button;
        }

        button.addEventListener("click",
            () => {
                if (operatorButtons && firstInput && secondInput) {
                    equals();
                }
                if (firstInput) {
                    operatorInput = button.textContent;
                    decimalButton.disabled = false;

                    display(`${firstInput} ${operatorInput}`);
                }
                
            }
        );
    }
)


equalsButton.addEventListener("click",
    () => {
        if (firstInput && secondInput) {
            equals();
        }
    }
);

clearButton.addEventListener("click", clear);
backspaceButton.addEventListener("click", backspace);

document.addEventListener("keydown",
    (event) => {
        const button = buttonMap[event.key];
        if (button) {
            button.click();
        }
    }
);
