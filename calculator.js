//Fixed-Program Application

let firstInput;
let secondInput;
let operatorInput;

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


function operate(operatorInput, firstInput, secondInput) {
    let operation;

    for (let operator of operators) {
        if (operator.symbol ===  operatorInput) {
            operation = operator.operation;
        }
    }
    return (operation(firstInput, secondInput));

}

function updateInput(input) {
    firstInput = input;
}