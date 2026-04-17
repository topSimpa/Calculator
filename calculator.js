let digitButtons = document.querySelectorAll(".digit");
let operatorButtons = document.querySelectorAll(".operator.arit")
let equalsButton = document.querySelector("#equals-to")
const screen = document.querySelector("#screen");


let firstInput = null;
let secondInput = null;
let operatorInput = null;

let operators = [
    {
        symbol: "+",
        operation: add,
    },
    {
        symbol: "-",
        operation: subtract,
    },
    {
        symbol: "&times",
        operation: multiply,
    },
    {
        symbol: "&divide",
        operation: divide,
    }
]

function add(first, second) {
    const sum  = first + second;
    return (sum);
}


function subtract(minuend, subtrahend) {
    const difference = minuend - subtrahend;
    return (difference);
}


function multiply(factorA, factorB) {
    const product = factorA * factorB;
    return (product);
}

function divide(dividend, divisor) {
    const quotient = dividend / divisor
    return (quotient);
}

function display(number) {
    screen.maxlength = number.length;
    screen.value = number;
}


function operate(operatorInput, firstInput, secondInput) {
    let operation;

    for (let operator of operators) {
        if (operator.symbol ===  operatorInput) {
            operation = operator.operation;
        }
    }
    return operation(firstInput, secondInput);

}

function updateInput(input) {
    if (!firstInput) {
        firstInput = Number(input);
    } else if (!secondInput) {
        secondInput = Number(input);
    }
}


function equals() {
    const result = operate(operatorInput, firstInput, secondInput);
    display(`${result}`);
}

digitButtons.forEach(
    (button) => {
        button.addEventListener("click", 
            () => {
                let number = button.textContent;
                console.log(number)
                updateInput(number);
                display(number)
            }
        )
    }
);

operatorButtons.forEach(
    (button) => {
        button.addEventListener("click",
            () => {
                operatorInput = button.textContent
                console.log(operatorInput);
            }
        )
    }
)


equalsButton.addEventListener("click", equals)